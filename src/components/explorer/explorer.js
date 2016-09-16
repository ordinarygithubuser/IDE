import { React, FileBrowser } from 'mva';
import { CONTEXT } from '../../constants/menu';
import { OpenFile } from '../../actions/editor';
import * as Project from '../../actions/project';
import * as Flow from '../../actions/flow';

import Header from './header';

const ProjectExplorer = ({ project, tmp }) => {
    if (!project) return <noscript />;

    const createFileContext = (type, event, file) => {
        const pos = { left: event.clientX, top: event.clientY };
        const actions = CONTEXT[type];

        Flow.SetContext({ pos, actions, data: { file, tmp } });
    };

    return <FileBrowser
        file={project.selected}
        root={project.root}
        onlyDirs={false}
        read={OpenFile}
        readMode="doubleClick"
        toggle={Project.ToggleFile}
        select={Project.SelectFile}
        setContext={createFileContext}
    />;
};

export default ({ project, tmp }) => {
    return <div className="sideMenu">
        <div className="projectFiles">
            <Header project={project} />
            <ProjectExplorer
                project={project}
                tmp={tmp}
            />
        </div>
    </div>;
};