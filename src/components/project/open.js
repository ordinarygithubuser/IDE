import { React, FileBrowser, Error } from 'mva';

import { Load } from '../../actions/project';
import { CreateSession } from '../../actions/terminal';
import * as File from '../../actions/file';

export default ({ files, close }) => {
    const { open, drives } = files;

    const toggle = file => File.Toggle({ owner: 'open', file });
    const select = file => File.Select({ owner: 'open', file });
    const change = drive => File.ChangeDrive({ owner: 'open', drive });

    const load = () => {
        Load(open.file.path);
        CreateSession(open.file.path);
        close();
    };

    return <div>
        <h2>Open Project</h2>
        <div className="row">
            <label>Location</label>
            <Error />
            <FileBrowser
                file={open.file}
                root={open.root}
                drives={drives}
                onlyDirs={true}
                toggle={toggle}
                select={select}
                setDrive={change}
            />
        </div>
        <div className="buttons">
            <button className="primary" onClick={load}>
                Load
            </button>
        </div>
    </div>;
};