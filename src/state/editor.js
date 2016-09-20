import * as Actions from '../actions/editor';
import * as File from '../util/file';

import { EditorState } from '../constants/state';

const make = (...objs) => {
    return objs.reduce((memo, obj) => {
        return Object.assign(memo, obj);
    }, {});
};

const updateFiles = editor => {
    return editor.files.map(file => {
        return editor.file.path == file.path? editor.file: file;
    });
};

export default ({ load, on, persist }) => {
    load('editor', EditorState());

    const push = (editor, file) => {
        if (editor.file) {
            editor.prev = File.filter(editor.prev, file);
            editor.prev.push(editor.file);
        }
        return editor.prev;
    };

    const pop = (editor, file) => {
        editor.prev = File.filter(editor.prev, file);
        return editor;
    };

    on(Actions.OpenFile, (file, state) => {
        const editor = make(state.editor);

        if (!File.contains(editor.files, file)) {
            if (!file.content) {
                file.content = File.readFile(file.path);
            }
            editor.files.push(file);
            editor.prev = push(editor, file);
            editor.file = file;
            editor.file.changed = false;
            persist({ editor });
        } else {
            const selected = File.getFile(editor.files, file.path);
            Actions.SelectFile(selected);
        }
    });

    on(Actions.CloseFile, (file, { editor }) => {
        // TODO: check save
        editor.prev = File.filter(editor.prev, file);
        editor.files = File.filter(editor.files, file);
        persist({ editor });

        if (file.path == editor.file.path) {
            editor.file = editor.prev.pop();
            persist({ editor });
        }
    });

    on(Actions.SelectFile, (file, { editor }) => {
        if (editor.file.path != file.path) {
            push(editor, file);
            editor.file = file;
            persist({ editor });
        }
    });

    on(Actions.SetText, (text, { editor }) => {
        editor.file.content = text;
        editor.file.changed = true;
        editor.files = updateFiles(editor);
        persist({ editor });
    });

    on(Actions.Save, (_, { editor }) => {
        File.write(editor.file, err => {
            if (err) {
                console.log('Error writing file: ', err);
            } else {
                editor.file.changed = false;
                editor.files  = updateFiles(editor);
                persist({ editor });
            }
        });
    });

};