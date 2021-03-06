import { React } from 'mva';
import AceEditor from 'react-ace';

import 'brace/mode/jsx';
import 'brace/theme/xcode';
import 'brace/ext/searchbox';

import * as Actions from '../../../actions/editor';

export default ({ file, dim }) => {
    const eProps = {
        $blockScrolling: Infinity,
        fontFamily: 'Consolas'
    };

    const commands = [{
        name: 'saveFile',
        bindKey: {
            win: 'Ctrl-S',
            mac: 'Command-S',
            sender: 'editor|cli'
        },
        exec: (env, args, request) => {
            Actions.Save();
        }
    }];

    const onChange = text => {
        Actions.SetText(text);
    };

    return <AceEditor
        mode="jsx"
        theme="xcode"
        name="code-editor"
        fontSize={14}
        width={dim.width + 'px'}
        height={dim.height + 'px'}
        onChange={onChange}
        editorProps={eProps}
        value={file.tmp}
        enableBasicAutocompletion
        enableLiveAutocompletion
        enableSnippets
        fontFamily="Consolas"
        commands={commands}
    />;
};