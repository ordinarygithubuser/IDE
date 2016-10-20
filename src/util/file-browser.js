import React from 'react';
import { equalsPath } from '../util/common';

const isSelected = (selected, file) => {
    return selected && equalsPath(selected, file);
};

const DirectoryItem = props => {
    const { file, select, selected, toggle, setContext } = props;
    const status = file.open ? 'caret-down' : 'caret-right';
    const className = isSelected(selected, file) ? 'selected' : '';

    const renderChildren = () => {
        if (!file.children || !file.open) {
            return <noscript />;
        }

        return <Files {...props} file={file} />;
    };

    const onClick = event => {
        select(file);
        if (event.ctrlKey && setContext) {
            setContext('dir', event, file);
        }
    };

    return <li className={`file ${className}`}>
        <div className="name">
            <i className={`fa fa-${status}`} onClick={() => toggle({ file })} />
            <i className={`fa fa-folder`} onClick={onClick} />
            <span onClick={onClick}>{file.name}</span>
        </div>
        {renderChildren()}
    </li>;
};

const FileItem = ({ file, selected, read, select, setContext }) => {
    const className = isSelected(selected, file) ? 'selected' : '';

    const onClick = event => {
        select(file);
        if (event.ctrlKey && setContext) {
            setContext('file', event, file)
        }
    };

    return <li className={`file ${className}`}>
        <div className="name" onDoubleClick={() => read(file)}>
            <i className="fa fa-file iconSmall" onClick={onClick} />
            <span onClick={onClick}>{file.name}</span>
        </div>
    </li>;
};

const Files = props => {
    const elements = props.file.children.map((file, key) => {
        const Component = file.type == 'dir' ? DirectoryItem : FileItem;
        return <Component key={key} {...props} file={file} />;
    });

    return <ul>{elements}</ul>;
};

export default class FileBrowser extends React.Component {
    render () {
        const { props } = this;
        return <div className="fileBrowser">
            <div className="scroll">
                <Files {...props} />
            </div>
        </div>;
    }
}