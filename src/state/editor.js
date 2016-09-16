import * as Actions from '../actions/editor';
import * as File from '../util/file';

import { EditorState } from '../constants/state';

const make = (...objs) => {
    return objs.reduce((memo, obj) => {
        return Object.assign(memo, obj);
    }, {});
};

export default ({ load, on, persist }) => {
    load('editor', EditorState());

    on(Actions.OpenFile, (file, state) => {
        if (!file || file.type != 'file') return;
        const editor = make(state.editor);

        if (!file.content) {
            file.content = File.readFile(file.path);
        }
        if (!File.contains(editor.files, file)) {
            editor.files.push(file);
        }

        editor.prev = File.filter(editor.prev, editor.file);
        if (editor.file) editor.prev.push(editor.file);
        editor.file = file;
        persist({ editor });
    });

    on(Actions.CloseFile, (file, { editor }) => {
        editor.prev = File.filter(editor.prev, file);
        editor.files = File.filter(editor.files, file);
        persist({ editor });

        if (file.path == editor.file.path) {
            Actions.OpenFile(editor.prev.pop());
        }
    });

    on(Actions.Save, (_, { editor }) => {

    });

    on(Actions.SetContext, (context, { editor }, update) => {

    });

};