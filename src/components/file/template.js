import { React, Error, ComboBox } from 'mva';
import { Templates } from '../../constants/file';

export default ({ type, template, setTemplate }) => {
    const templates = Templates[type.name];

    if (!templates) {
        return <noscript />;
    }

    return <div className="row">
        <label>Template</label>
        <Error />
        <ComboBox
            items={templates}
            item={template || { name: '' }}
            select={setTemplate}
        />
    </div>
};