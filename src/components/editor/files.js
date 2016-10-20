import { React } from 'mva';
import { equalsPath } from '../../util/common';
import * as Actions from '../../actions/editor';

export default ({ files, file }) => {
    const close = f => () => Actions.CloseFile(f);
    const select = f => () => Actions.SelectFile(f);

    const elements = files.map((current, key) => {
        const selectedClass = equalsPath(current, file) ? 'selected' : '';
        const changeClass = current.changed ? 'changed' : 'unchanged';

        return <div className={`file ${selectedClass}`} key={key}>
            <i className={`fa fa-asterisk ${changeClass}`} />
            <span onClick={select(current)}>{current.name}</span>
            <i className="fa fa-times" onClick={close(current)} />
        </div>;
    });

    return <div className="files">
        {elements}
    </div>;
};