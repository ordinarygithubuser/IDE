import { React } from 'mva';
import * as Actions from '../../actions/editor';

export default ({ files, selected }) => {
    const getClassName = file => {
        if (selected && file.path == selected.path) {
            return 'file selected';
        }
        return 'file';
    };

    const elements = files.map(file => {
        const open = () => Actions.OpenFile(file);
        const close = () => Actions.CloseFile(file);
        const className = getClassName(file);

        return <div className={className} key={file.path}>
            <span onClick={open}>{file.name}</span>
            <i className="fa fa-times" onClick={close} />
        </div>;
    });

    return <div className="files">
        {elements}
    </div>;
};