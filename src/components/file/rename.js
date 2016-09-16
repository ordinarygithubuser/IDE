import { React, Error, Form } from 'mva';
import { RenameFile } from '../../actions/project';

export default class Rename extends Form {
    constructor (props) {
        super(props);

        this.state = {
            name: props.data.file.name,
            error: ''
        };
    }

    render () {
        const { file } = this.props.data;
        const { name, error } = this.state;

        const rename = () => {
            if (name.length > 0) {
                RenameFile({ name, file });
                this.props.close();
            } else {
                this.setState({
                    error: 'The name cannot be empty.'
                });
            }
        };

        return <div>
            <h2 title={file.path}>
                {`Rename file ${file.name}`}
            </h2>
            <div className="row">
                <label>New Name</label>
                <Error error={error} />
                <input value={name} onChange={this.setValue('name')} />
            </div>
            <div className="buttons">
                <button className="primary" onClick={rename}>
                    Ok
                </button>
            </div>
        </div>;
    }
};