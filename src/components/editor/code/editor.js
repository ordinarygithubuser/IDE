import { React } from 'mva';
import AceEditor from 'react-ace';

import 'brace/mode/jsx';
import 'brace/theme/xcode';
import 'brace/ext/searchbox';

import * as Actions from '../../../actions/editor';

export default ({ editor }) => {
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
            console.log('save')
        }
    }];

    const onChange = () => {};

    return <AceEditor
        mode="jsx"
        theme="xcode"
        name="code-editor"
        fontSize={14}
        width="auto"
        height="auto"
        onChange={onChange}
        editorProps={eProps}
        value={editor.file.content}
        enableBasicAutocompletion
        enableLiveAutocompletion
        enableSnippets
        fontFamily="Consolas"
        commands={commands}
    />;
};