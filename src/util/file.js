import FS from 'fs';
import Path from 'path';
import ChildProcess from 'child_process';

export const readFile = path => {
    return FS.readFileSync(path, 'utf-8');
};

export const readDirectory = path => {
    const qualify = suffix => Path.join(path, suffix);

    const files = FS.readdirSync(path).filter(file => {
        return !file.startsWith('.');
    }).map(name => {
        const path = qualify(name);
        const type = getFileType(path);
        return { name, path, type };
    });

    return sort(files);
};

export const readAsObject = path => {
    const obj = {
        path: path,
        type: getFileType(path),
        name: path.split(Path.sep).pop()
    };

    if (obj.type == 'dir') {
        obj.open = true;
        obj.children = readDirectory(path);
    }
    return obj;
};

export const readHierarchy = (path, child) => {
    const segments = path.split(Path.sep);

    const node = {
        open: true,
        path: path,
        type: getFileType(path),
        name: segments.pop(),
        children: readDirectory(path)
    };

    if (child) {
        node.children = node.children.map(c => {
            return c.name == child.name ? child : c;
        });
    }

    if (segments.length > 0) {
        const restPath = segments.join(Path.sep);
        return readHierarchy(restPath, node);
    }
    return node;
};

export const updateTree = (node, child) => {
    if (node.path == child.path) {
        return child;
    }

    if (!child.path.startsWith(node.path) || !node.open || !node.children) {
        return node;
    }

    node.children = node.children.map(current => {
        if (current.path == child.path) {
            return child;
        }
        if (current.children && current.open) {
            current.children = current.children.map(cChild => {
                return updateTree(cChild, child);
            });
        }
        return current;
    });

    return node;
};

export const insertNode = (current, node) => {
    const parentPath = getParentPath(node);

    if (node.path.startsWith(current.path) && current.type != 'file') {
        if (current.path == parentPath) {
            if (!current.children) current.children = [];
            if (!current.open) current.open = true;
            current.children.push(node);
            current.children = sort(current.children);
        } else if (current.children) {
            current.children = current.children.map(child => {
                return insertNode(child, node);
            });
        }
    }

    return current;
};

export const removeNode = (parent, node) => {
    if (node.path.startsWith(parent.path)) {
        const parentPath = getParentPath(node);

        if (parent.path == parentPath) {
            parent.children = parent.children.filter(child => {
                return child.path != node.path;
            });
        } else {
            parent.children = parent.children.map(child => {
                return removeNode(child, node);
            });
        }
    }
    return parent;
};

export const createTree = (root, files) => {
    FS.mkdirSync(root);
    createResources(root, files);
    return readAsObject(root);
};

export const createResource = (file, parent) => {
    const path = Path.join(parent, file.name);

    if (file.type == 'dir') {
        FS.mkdirSync(path);
        createResources(path, file.children || []);
    } else {
        const stream = FS.createWriteStream(path);
        stream.write(file.content, () => {
            stream.close();
        });
    }
    return Object.assign(file, { path });
};

export const createResources = (parent, children) => {
    children.map(child => createResource(child, parent));
};

export const rename = (name, file) => {
    const segments = file.path.split(Path.sep);
    segments.pop();
    segments.push(name);
    const newPath = segments.join(Path.sep);
    FS.renameSync(file.path, newPath);
    const newFile = readAsObject(newPath);

    if (newFile.type == 'file') {
        newFile.content = readFile(newPath);
    }
    return newFile;
};

export const remove = file => {
    if (file.type == 'dir') {
        FS.readdirSync(file.path).map(current => {
            const path = Path.join(file.path, current);

            if (getFileType(path) == 'dir') {
                remove({ path, type: 'dir' });
            } else {
                FS.unlinkSync(path);
            }
        });
        FS.rmdirSync(file.path);
    } else {
        FS.unlinkSync(file.path);
    }
};

export const getDrives = done => {
    const list = ChildProcess.spawn('cmd');
    let stdout = '';

    list.stdout.on('data', data => stdout += data);

    list.on('exit', code => {
        var data = stdout.split('\r\n');
        data = data.splice(4, data.length - 7);
        data = data.map(Function.prototype.call, String.prototype.trim);
        done(data);
    });

    list.stdin.write('wmic logicaldisk get caption\n');
    list.stdin.end();
};

/**
 * Util
 */

const sort = res => {
    const _sort = type => {
        return res.filter(r => r.type == type)
           .sort((a, b) => a.name > b.name);
    };

    return _sort('file').concat(_sort('dir'))
};

const getFileType = path => {
    try {
        const stats = FS.statSync(path);
        return stats.isDirectory() ? 'dir' : 'file';
    } catch (e) {
        return null;
    }
};

export const getParentPath = file => {
    const segments = file.path.split(Path.sep);
    segments.pop();
    return segments.join(Path.sep);
};

export const filter = (files, file) => {
    if (!file) return files;

    return files.filter(current => {
        return current.path != file.path;
    });
};

export const contains = (files, file) => {
    return files.filter(current => {
        return file.path == current.path;
    }).length > 0;
};

export const HOME_PATH = 'E:\\Programming\\workspace_node' || process.env.HOME || process.env.USERPROFILE;