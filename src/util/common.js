import Path from 'path';

export const getParentPath = file => {
    const segments = file.path.split(Path.sep);
    segments.pop();
    return segments.join(Path.sep);
};

export const sort = res => {
    const _sort = type => {
        return res.filter(r => r.type == type)
            .sort((a, b) => a.name > b.name);
    };

    return _sort('file').concat(_sort('dir'))
};

export const HOME_PATH = 'E:\\Programming\\workspace_node' || process.env.HOME || process.env.USERPROFILE;