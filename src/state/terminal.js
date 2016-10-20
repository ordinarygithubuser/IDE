import { IdProvider } from 'mva';
import * as Command from '../util/cmd';
import * as Actions from '../actions/terminal';

const SID = IdProvider();

export const Session = (id, dir) => ({
    dir, id, input: '', history: []
});

export default ({ init, on }) => {
    const DEFAULT_SESSION = Session(SID.next(), 'ws');

    init('terminal', {
        session: DEFAULT_SESSION,
        sessions: [ DEFAULT_SESSION ]
    }, terminal => {
        SID.init(terminal.sessions);
    });

    on(Actions.CreateSession, (dir, state, update) => {
        state.terminal.session = Session(SID.next(), 'ws');
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

    on(Actions.Execute, (_, { terminal }, update) => {
        const result = Command.execute(terminal.session);

        result.dir = terminal.session.dir;
        result.input = terminal.session.input;
        terminal.session.input = '';
        terminal.session.history.push(result);
        update({ terminal });
    });

    on(Actions.Previous, (_, state, update) => {

    });

    on(Actions.Next, (_, state, update) => {

    });
};