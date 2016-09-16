import { React } from 'mva';

export default class Session extends React.Component {
    componentDidUpdate () {
        const node = this.refs.session;
        node.scrollTop = node.scrollHeight;
    }

    render () {
        const { session, onInput, onEnter } = this.props;

        const history = session.history.map((entry, key) => {
            const rows = entry.value.split('\n').length;

            return <div key={key} className="entry">
                <span className="directory">{entry.dir + '> ' + entry.input}</span>
                <textarea
                    rows={rows}
                    className="output"
                    value={entry.value}
                    disabled
                />
            </div>;
        });

        const onClick = () => {
            this.refs.input.focus();
        };

        const onKeyDown = event => {
            if (event.keyCode == 13) onEnter();
        };

        const onChange = event => {
            this.refs.input.focus();
            onInput(event.target.value);
        };

        return <div className="session" ref="session" onClick={onClick}>
            {history}
            <div className="inputRow">
                <span className="directory">
                    {session.dir + '> '}
                </span>
                <input
                    ref="input"
                    value={session.input}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                />
            </div>
        </div>;
    }
};