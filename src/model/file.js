import * as Util from '../util/common';

export const sort = res => {
    const _sort = type => {
        return res.filter(r => r.type == type)
            .sort((a, b) => a.name > b.name);
    };

    return _sort('file').concat(_sort('dir'))
};

export const filter = (files, file) => {
    return files.filter(current => {
        return !Util.equalsPath(current, file);
    });
};

export const update = editor => {
    return editor.files.map(file => {
        return Util.equalsPath(editor.file, file) ? editor.file: file;
    });
};

export const getFile = (files, file) => {
    return files.filter(current => {
        return Util.equalsPath(current, file);
    })[0];
};

export const contains = (files, file) => {
    return files.filter(current => {
            return Util.equalsPath(current, file);
        }).length > 0;
};

export const pushHistory = (editor, file) => {
    if (editor.file) {
        editor.prev = filter(editor.prev, file);
        editor.prev.push(editor.file);
    }
    return editor.prev;
};