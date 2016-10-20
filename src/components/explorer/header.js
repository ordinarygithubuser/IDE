import { React } from 'mva';
import { SetDialog } from '../../actions/flow';
import CreateProject from '../project/create';
//import OpenProject from '../project/open';

import { TypedContext } from './context';

const NO_PROJECT = { name: 'No project loaded.'};

export default ({ project, tmp }) => {
    if (!project) {
        project = NO_PROJECT;
    }

    const showContext = event => {
        if (project != NO_PROJECT) {
            TypedContext('dir', project, tmp)(event);
        }
    };

    return <div className="title">
        <i className="fa fa-folder" />
        <span onClick={showContext}>
            {project.name}
        </span>
        <div className="menu">
            <i
                className="fa fa-plus-circle"
                title="New"
                onClick={() => SetDialog({ Component: CreateProject })}
            />
            <i
                className="fa fa-database"
                title="Load"
                onClick={() => {}}
            />
        </div>
    </div>;
};