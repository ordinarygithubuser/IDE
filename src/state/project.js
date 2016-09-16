import Path from 'path';
import * as File from '../util/file';
import * as Tree from '../util/tree';
import * as Actions from '../actions/project';

import { ProjectState, EditorState } from '../constants/state';

export default ({ load, on, persist }) => {
    load('project', null);

    on(Actions.Create, (props, state) => {
        const root = File.createResource({
            type: 'dir',
            name: props.name,
            children: props.files
        }, props.path);

        state.project = ProjectState(props);
        state.project.root = File.readAsObject(root.path);
        state.editor = EditorState();
        persist(state);
    });

    on(Actions.Load, (path, state) => {
        const file = File.readAsObject(path);
        const name =  path.split(Path.sep).pop();

        state.project = ProjectState({ root: file, name });
        state.editor = EditorState();
        persist(state);
    });

    on(Actions.CreateFile, (data, { project }) => {
        if (!project.selected) return;

        const file = File.createResource(data, project.selected.path);
        project.root = Tree.insertNode(project.root, file);
        persist({ project });
    });

    on(Actions.RenameFile, ({ name }, { project, editor }) => {
        const file = File.rename(name, project.selected);
        project.root = Tree.renameNode(project.root, project.selected, file);

        editor.files = editor.files.map(current => {
            if (current.path == project.selected.path) {
                if (editor.file.path == current.path) editor.file = file;
                return file;
            }
            return current;
        });
        persist({ project, editor });
    });

    on(Actions.DeleteFile, (_, { project }) => {
        File.remove(project.selected);
        project.root = Tree.removeNode(project.root, project.selected);
        project.selected = null;
        persist({ project });
    });

    on(Actions.SelectFile, (file, state) => {
        state.project.selected = file;
        persist(state);
    });

    on(Actions.ToggleFile, (file, { project }) => {
        if (file.type != 'dir') return;

        const newFile = Object.assign({}, file);

        if (newFile.open) {
            newFile.open = false;
        } else {
            newFile.open = true;
            newFile.children = File.readDirectory(file.path);
        }

        project.selected = newFile;
        project.root = Tree.updateNode(project.root, file, newFile);
        persist({ project });
    });

};