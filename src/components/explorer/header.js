import { React } from 'mva';
import * as Flow from '../../actions/flow';

import CreateProject from '../project/create';
import OpenProject from '../project/open';

export default ({ project }) => {
    if (!project) {
        project = { name: 'No project loaded.'};
    }

    return <div className="title">
        <i className="fa fa-folder" />
        <span>{project.name}</span>
        <div className="menu">
            <i
                className="fa fa-plus-circle"
                title="New"
                onClick={() => Flow.SetDialog({ Component: CreateProject })}
            />
            <i
                className="fa fa-database"
                title="Load"
                onClick={() => Flow.SetDialog({ Component: OpenProject })}
            />
        </div>
    </div>
};