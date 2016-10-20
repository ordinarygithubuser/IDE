import { React } from 'mva';
import FileBrowser from '../../util/file-browser';

import { OpenFile } from '../../actions/editor';
import { ToggleFile } from '../../actions/project';

import Header from './header';
import { Context } from './context';

const ProjectExplorer = ({ project, selected, tmp, select }) => {
    return !project ? <noscript /> : <FileBrowser
        file={project}
        selected={selected}
        read={OpenFile}
        toggle={ToggleFile}
        select={select}
        setContext={Context(tmp)}
    />;
};

export default class Explorer extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            selected: null
        };
    }

    render () {
        const { selected } = this.state;
        const { project, tmp } = this.props;

        const select = file => {
            this.setState({ selected: file });
        };

        return <div className="sideMenu">
            <div className="projectFiles">
                <Header
                    tmp={tmp}
                    project={project}
                />
                <ProjectExplorer
                    tmp={tmp}
                    select={select}
                    project={project}
                    selected={selected}
                />
            </div>
        </div>;
    }
};