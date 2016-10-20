import { React } from 'mva';
const remote = require('electron').remote;

const Window = () => {
    const max = () => remote.getCurrentWindow().maximize();
    const min = () => remote.getCurrentWindow().minimize();
    const close = () => remote.getCurrentWindow().close();

    return <div className="window-options">
        <i
            className="fa fa-caret-down minimize"
            onClick={min}
            title="Minimize Window"
        />
        <i
            className="fa fa-clone maximize"
            onClick={max}
            title="Maximize Window"
        />
        <i
            className="fa fa-times close"
            onClick={close}
            title="Close Application"
        />
    </div>;
};

export default ({ project }) => {
    const path = '- ' + (project ? project.name : '');

    return <header>
        {`Code Editor v1.0 ${path}`}
        <Window />
    </header>;
};