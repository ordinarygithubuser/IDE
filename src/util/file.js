import FS from 'fs';
import Path from 'path';
import * as Util from './common';
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

    return Util.sort(files);
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

export const createResource = (file, parent) => {
    const path = Path.join(parent, file.name);

    if (file.type == 'dir') {
        FS.mkdirSync(path);
        if (file.children) {
            file.children.map(child => {
                createResource(child, path)
            });
        }
    } else {
        const stream = FS.createWriteStream(path);
        if (!file.content) file.content = readFile(file.path);
        stream.write(file.content, () => {
            stream.close();
        });
    }
    return Object.assign(file, { path });
};

export const rename = (name, file) => {
    const newFile = Object.assign({}, file);
    const segments = file.path.split(Path.sep);
    segments.pop();
    segments.push(name);
    const newPath = segments.join(Path.sep);
    FS.renameSync(file.path, newPath);
    return Object.assign(newFile, { name, path: newPath })
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

const getFileType = path => {
    try {
        const stats = FS.statSync(path);
        return stats.isDirectory() ? 'dir' : 'file';
    } catch (e) {
        return null;
    }
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

