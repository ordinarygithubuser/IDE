import { React, Error, Form, List } from 'mva';

export default class MVAAction extends Form {
    constructor (props) {
        super(props);
        this.state = {
            action: null,
            name: '',
            error: null
        };
    }

    componentDidMount () {
        this.props.update({ actions: [] })
    }

    render () {
        const { action, name, error } = this.state;
        const { actions } = this.props.props;

        const create = () => {
            if (name.length == 0) {
                this.setState({ error: 'The name cannot be empty.' });
            } else {
                actions.push(name);
                this.props.update({ actions });
                this.setState({ name: '', error: null })
            }
        };

        const remove = act => {
            if (action == act) this.setState({ action: null });
            this.props.update({ actions: actions.filter(cur => {
                return cur != act
            }) });
        };

        return <div>
            <div className="row">
                <label>Actions</label>
                <Error />
                <List
                    item={action}
                    items={actions || []}
                    select={this.setValue('action')}
                    remove={remove}
                />
            </div>
            <div className="row">
                <label>New Action</label>
                <Error error={error} />
                <input
                    value={name}
                    className="with-button"
                    onChange={this.setValue('name') }
                />
                <button onClick={create}>
                    Add
                </button>
            </div>
        </div>
    }
};