import * as Actions from '../actions/flow';

export default ({ load, init, on, persist }) => {
    init('dialog', null);
    init('context', null);
    init('tmp', null);

    load('app', {
        status: '',
        menu: { width: 0.25 },
        main: { height: 0.75 }
    });

    on(Actions.Resize, ({ name, key, value }, { app }) => {
        if (app[name]) {
            app[name][key] = value;
            persist({ app });
        }
    });

    on(Actions.SetTmp, (tmp, state, update) => {
        update({ tmp });
    });

    on(Actions.SetDialog, (dialog, state, update) => {
        update({ dialog });
    });

    on(Actions.SetContext, (context, state, update) => {
        update({ context });
    });
};