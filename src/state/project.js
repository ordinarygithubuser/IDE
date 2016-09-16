import Path from 'path';
import * as File from '../util/file';
import * as Actions from '../actions/project';

import { ProjectState, EditorState } from '../constants/state';

export default ({ load, on, persist }) => {
    load('project', null);

    on(Actions.Create, (props, state) => {
        const path = Path.join(props.path, props.name);
        state.project = ProjectState(props);
        state.project.root = File.createTree(path, props.files);
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
        project.root = File.insertNode(project.root, file);
        persist({ project });
    });

    on(Actions.RenameFile, ({ name }, { project, editor }) => {
        const file = File.rename(name, project.selected);
        const parentPath = File.getParentPath(project.selected);
        const parent = File.readAsObject(parentPath);

        project.root = File.updateTree(project.root, parent);
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
        project.root = File.removeNode(project.root, project.selected);
        project.selected = null;
        persist({ project });
    });

    on(Actions.SelectFile, (file, state) => {
        state.project.selected = File.readAsObject(file.path);
        persist(state);
    });

    on(Actions.ToggleFile, (file, state) => {
        if (file.type != 'dir') return;

        if (file.open) {
            file.open = false;
        } else {
            file.open = true;
            file.children = File.readDirectory(file.path);
        }

        state.project.root = File.updateTree(state.project.root, file);
        persist(state);
    });

};