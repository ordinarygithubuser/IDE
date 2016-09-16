import { React } from 'mva';
import Files from './files';
import CodeEditor from './code/editor';

const ContextWrapper = props => {
    if (!props.editor.context) return <noscript />;
    const { Component } = props.editor.context;
    return <Component {...props} />;
};

const ActiveEditor = props => {
    return <CodeEditor {...props} />;
};

export default class Editor extends React.Component {
    constructor (props) {
        super(props);
        this.state = { rect: this.getOffset() };
        this.resize = this.resize.bind(this)
    }

    componentDidMount() {
        window.addEventListener('resize', this.resize);
    }

    componentWillUnmount () {
        window.removeEventListener('resize', this.resize);
    }

    resize () {
        this.setState({ rect: this.getOffset() })
    }

    getOffset () {
        const node = this.refs.wrapper;

        if (node) {
            return node.getBoundingClientRect();
        }
        return { left: 0, top: 0, width: 0, height: 0 };
    }

    render () {
        const { editor } = this.props;
        const { rect } = this.state;

        if (!editor.file) return <noscript />;

        return <div className="editor">
            <Files files={editor.files} selected={editor.file} />
            <div className="wrapper" ref="wrapper">
                <ActiveEditor
                    editor={editor}
                    dim={rect}
                    resize={this.resize}
                />
            </div>
            <ContextWrapper editor={editor} offset={rect} />
        </div>;
    }
}