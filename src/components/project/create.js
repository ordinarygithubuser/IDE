import { React, ComboBox, FileBrowser, Error, Form, Checkbox } from 'mva';
import { ERROR } from '../../constants/error';
import * as Preset from '../../constants/preset';
import { HOME_PATH } from '../../util/common';

import { Create } from '../../actions/project';
import * as File from '../../actions/file';

export default class CreateProject extends Form {
    constructor (props) {
        super(props);

        this.state = {
            name: '',
            desc: '',
            author: '',
            preset: Preset.Presets[0],
            license: Preset.LICENSES[0],
            modules: false,
            errors: {}
        }
    }

    render () {
        const { files } = this.props;
        const { name, preset, license, author, desc, modules, errors } = this.state;
        
        const toggle = file => File.Toggle({ owner: 'create', file });
        const select = file => File.Select({ owner: 'create', file });
        const change = drive => File.ChangeDrive(drive);

        const setModules = () => this.setState({ modules: !modules });

        const create = () => {
            if (name.length < 3) {
                errors.name = ERROR.Project.name;
                this.setState({ errors });
            } else {
                const path = files.create.file.path;
                const pFiles = preset.create(this.state);
                Create({ name, path, files: pFiles, license: license.name, author, desc });
                this.props.close();
            }
        };

        return <div className="project-create">
            <h2>New Project</h2>
            <div className="cols">
                <div className="col">
                    <h3>Configuration</h3>
                    <div className="row">
                        <label>Name</label>
                        <Error error={errors.name} />
                        <input
                            value={name}
                            tabIndex="1"
                            onChange={this.setValue('name')}
                        />
                    </div>
                    <div className="row">
                        <label>Author</label>
                        <Error error={errors.author} />
                        <input
                            value={author}
                            tabIndex="2"
                            onChange={this.setValue('author')}
                        />
                    </div>
                    <div className="row">
                        <label>Preset</label>
                        <Error error={errors.preset} />
                        <ComboBox
                            item={preset}
                            items={Preset.Presets}
                            select={this.setValue('preset')}
                            tabIndex="3"
                        />
                    </div>
                    <div className="row">
                        <label>Description</label>
                        <Error error={errors.desc} />
                        <textarea value={desc} onChange={this.setValue('desc')} />
                    </div>
                    <div className="row">
                        <label>License</label>
                        <Error error={errors.license} />
                        <ComboBox
                            item={license}
                            items={Preset.LICENSES}
                            select={this.setValue('license')}
                            tabIndex="4"
                        />
                    </div>
                    <div className="row">
                        <label>Install Modules</label>
                        <Error />
                        <Checkbox checked={modules} toggle={setModules} />
                    </div>
                </div>
                <div className="col">
                    <h3 tabIndex="5">Location</h3>
                    <FileBrowser
                        file={files.create.file}
                        root={files.create.root}
                        drives={files.drives}
                        onlyDirs={true}
                        toggle={toggle}
                        select={select}
                        setDrive={change}
                        tabIndex="5"
                        homepath={HOME_PATH}
                    />
                </div>
            </div>

            <div className="buttons">
                <button tabIndex="6" className="primary" onClick={create}>
                    Create
                </button>
            </div>
        </div>;
    }
}