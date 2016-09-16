import * as Actions from '../actions/flow';

export default ({ init, on }) => {
    init('dialog', null);
    init('context', null);

    on(Actions.SetDialog, (dialog, state, update) => {
        update({ dialog });
    });

    on(Actions.SetContext, (context, state, update) => {
        update({ context });
    });
};