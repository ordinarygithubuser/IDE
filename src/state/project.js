import * as Util from '../util/common';
import * as Actions from '../actions/project';
import * as Tree from '../model/tree';

import { ProjectState, EditorState } from '../constants/state';

//localStorage.clear()

export default ({ load, on, persist }) => {
    load('project', null);

    on(Actions.Create, (props) => {
        const project = ProjectState(props);
        const editor = EditorState();
        persist({ project, editor });
    });

    on(Actions.CreateFile, ({ data, file }, { project }) => {
        data.parent = file;
        project = Tree.insert(project, file, data);
        persist({ project });
    });

    on(Actions.RenameFile, ({ name, file }, { project }) => {
        project = Tree.update(project, file, { name });
        persist({ project });
    });

    on(Actions.DeleteFile, ({ file }, { project }) => {
        project = Tree.remove(project, file);
        persist({ project });
    });

    on(Actions.ToggleFile, ({ file }, { project }) => {
        const open = !file.open;
        project = Tree.update(project, file, { open });
        persist({ project });
    });

};