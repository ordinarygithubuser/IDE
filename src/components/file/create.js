import { React, ComboBox, Error, Form } from 'mva';
import { Types, Templates } from '../../constants/file';
import { CreateFile } from '../../actions/project';

import Template from './template';
import MVAAction from './mva-action';
import MVAComponent from './mva-component';

const getDetails = template => {
    switch (template.name) {
        case 'MVA Action':              return MVAAction;
        case 'MVA Component (State)':   return MVAComponent;
    }

    return () => <div>
        <label>No options available</label>
    </div>;
};

const FileDetails = ({ template, props, update }) => {
    if (!template) return <noscript />;

    const Details = getDetails(template);

    return <div className="col">
        <h3>Template Options</h3>
        <Details props={props} update={update} />
    </div>
};

export default class NewFile extends Form {
    constructor (props) {
        super(props);
        this.state = {
            name: '',
            type: Types[0],
            template: null,
            props: {},
            errors: {}
        };
    }

    render () {
        const file = this.props.project.selected;
        const { name, type, template, props, errors } = this.state;

        const setType = newType => {
            const templates = Templates[newType.name] || [];
            this.setState({ type: newType, template: templates[0] });
        };

        const create = () => {
            if (name.length > 0) {
                CreateFile({
                    name: name + type.suffix,
                    type: type.name == 'Directory' ? 'dir' : 'file',
                    content: template ? template.text(props) : ''
                });
                this.props.close();
            } else {
                errors.name = 'The name cannot be empty.';
                this.setState({ errors });
            }
        };

        return <div className="file-create">
            <h2 title={file.path}>
                {`Create new file in ${file.name}`}
            </h2>
            <div className="cols">
                <div className="col">
                    <h3>File Selection</h3>
                    <div className="row">
                        <label>Name</label>
                        <Error error={errors.name} />
                        <input value={name} onChange={this.setValue('name')} />
                    </div>
                    <div className="row">
                        <label>Type</label>
                        <Error />
                        <ComboBox
                            items={Types}
                            item={type}
                            select={setType}
                        />
                    </div>
                    <Template
                        type={type}
                        template={template}
                        setTemplate={this.setValue('template')}
                    />
                </div>
                <FileDetails
                    props={props}
                    template={template}
                    update={this.setValue('props')}
                />
            </div>

            <div className="buttons">
                <button className="primary" onClick={create}>
                    Ok
                </button>
            </div>
        </div>;
    }
};