import { CONTEXT } from '../../constants/menu';
import { SetContext } from '../../actions/flow';

export const Context = (tmp) => {
    return (type, event, file) => {
        SharedContext(type, event, file, tmp);
    }
};

export const TypedContext = (type, file, tmp) => {
    return event => SharedContext(type, event, file, tmp);
};

const SharedContext = (type, event, file, tmp) => {
    if (!event.ctrlKey) return;

    SetContext({
        actions: CONTEXT[type],
        data: { file, tmp },
        pos: {
            left: event.clientX,
            top: event.clientY
        }
    });
};