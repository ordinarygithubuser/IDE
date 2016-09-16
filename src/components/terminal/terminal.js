import { React } from 'mva';
import Session from './session';
import Sessions from './sessions';

import * as Actions from '../../actions/terminal';

export default ({ terminal, app }) => {
    const { session, sessions } = terminal;

    return <div className="terminal">
        <div className="main">
            <Sessions
                session={session}
                sessions={sessions}
            />
            <Session
                session={session}
                onEnter={Actions.Execute}
                onInput={Actions.SetInput}
            />
        </div>
    </div>;
};