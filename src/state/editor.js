import * as Actions from '../actions/editor';
import * as Util from '../util/common';
import * as Tree from '../model/tree';
import * as File from '../model/file';

import { EditorState } from '../constants/state';

localStorage.clear();

const make = (...objs) => {
    return objs.reduce((memo, obj) => {
        return Object.assign(memo, obj);
    }, {});
};

export default ({ load, on, persist }) => {
    load('editor', EditorState());

    on(Actions.OpenFile, (file, state) => {
        const editor = make(state.editor);

        if (!File.contains(editor.files, file)) {
            editor.files.push(file);
            editor.prev = File.pushHistory(editor, file);
            editor.file = file;
            editor.file.tmp = file.content;
            editor.file.changed = false;
            persist({ editor });
        } else {
            const selected = File.getFile(editor.files, file);
            Actions.SelectFile(selected);
        }
    });

    on(Actions.CloseFile, (file, { editor }) => {
        editor.files = File.filter(editor.files, file);

        if (Util.equalsPath(file, editor.file)) {
            editor.file = editor.prev.pop();
        } else {
            editor.prev = File.filter(editor.prev, file);
        }
        persist({ editor });
    });

    on(Actions.SelectFile, (file, { editor }) => {
        if (!Util.equalsPath(editor.file, file)) {
            File.pushHistory(editor, file);
            editor.file = file;
            persist({ editor });
        }
    });

    on(Actions.SetText, (text, { editor }) => {
        editor.file.tmp = text;
        editor.file.changed = true;
        editor.files = File.update(editor);
        persist({ editor });
    });

    on(Actions.Save, (_, { editor, project, app }) => {
        editor.file.changed = false;
        editor.file.content = editor.file.tmp;
        editor.files = File.update(editor);
        project = Tree.update(project, editor.file, editor.file);
        app.status = 'Saved ' + editor.file.name + '.';
        persist({ app, project, editor });
    });

};