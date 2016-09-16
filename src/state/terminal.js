import { IdProvider } from 'mva';
import * as Command from '../util/cmd';
import * as Actions from '../actions/terminal';
import { HOME_PATH } from '../util/common';

const SID = IdProvider();

export default ({ init, on }) => {
    const DEFAULT_SESSION = Command.createSession(SID.next(), HOME_PATH);

    init('terminal', {
        session: DEFAULT_SESSION,
        sessions: [ DEFAULT_SESSION ]
    }, terminal => {
        SID.init(terminal.sessions);
    });

    on(Actions.CreateSession, (dir, state, update) => {
        if (!dir && state.project) dir = state.project.root.path;
        else dir = HOME_PATH;

        state.terminal.session = Command.createSession(SID.next(), dir);
        state.terminal.sessions.push(state.terminal.session);
        update(state);
    });

    on(Actions.CloseSession, (_, state, update) => {
        const sessions = state.terminal.sessions.filter(s => {
            return s.id != state.terminal.session.id;
        });

        state.terminal = { sessions, session: sessions[0] };
        update(state);
    });

    on(Actions.SelectSession, (session, state, update) => {
        state.terminal.session = session;
        update(state);
    });

    on(Actions.SetInput, (input, state, update) => {
        state.terminal.session.input = input;
        update(state);
    });

    on(Actions.Execute, (_, state, update) => {
        const { input, dir } = state.terminal.session;

        Command.execute(input, dir, result => {
            result.dir = state.terminal.session.dir;
            result.input = state.terminal.session.input;
            state.terminal.session.input = '';
            state.terminal.session.history.push(result);
            update(state);
        });
    });

    on(Actions.Previous, (_, state, update) => {

    });

    on(Actions.Next, (_, state, update) => {

    });
};