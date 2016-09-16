import { React } from 'mva';
import * as Actions from '../../actions/terminal';

export default ({ sessions, session, changeSession }) => {
    const elements = sessions.map((current, key) => {
        const className = session && current.id == session.id ? 'selected' : '';
        const change = () => Actions.SelectSession(current);
        const close = () => Actions.CloseSession(current);

        return <div onClick={change} className={`tab ${className}`} key={key}>
            <span>{`Session ${current.id}`}</span>
            <i className="fa fa-close" onClick={close}/>
        </div>;
    });

    return <div className="sessions">
        <div className="tabs">
            {elements}
        </div>
        <div className="menu">
            <i className="fa fa-plus-circle" onClick={() => Actions.CreateSession()} />
        </div>
    </div>
};