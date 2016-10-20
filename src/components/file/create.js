import { React, ComboBox, Error, Form } from 'mva';
import { Types } from '../../constants/file';
import { CreateFile } from '../../actions/project';

import MVAAction from './mva-action';
import MVAComponent from './mva-component';

const getDetails = type => {
    switch (type.alias) {
        case 'act': return MVAAction;
        case 'cmp': return MVAComponent;
    }

    return () => <div>
        <label>No options available</label>
    </div>;
};

const FileDetails = ({ type, props, update }) => {
    const Details = getDetails(type);

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
            props: {},
            errors: {}
        };
    }

    render () {
        const { file } = this.props.data;
        const { name, type, props, errors } = this.state;

        const setType = newType => {
            this.setState({ type: newType });
        };

        const create = () => {
            if (name.length > 0) {
                const data = {
                    name: name + type.suffix,
                    type: type.alias
                };

                if (data.type == 'dir') {
                    data.open = true;
                    data.children = [];
                } else {
                    data.content = type.text(props);
                }

                CreateFile({ data, file });
                this.props.close();
            } else {
                errors.name = 'The name cannot be empty.';
                this.setState({ errors });
            }
        };

        return <div className="file-create">
            <h2>
                {`Create new file`}
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
                </div>
                <FileDetails
                    props={props}
                    type={type}
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