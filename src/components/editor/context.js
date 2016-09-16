import { React } from 'mva';

import { SetContext } from '../../actions/editor';

export default class Context extends React.Component {
    componentDidMount () {
        this.refs.context.focus();
    }

    handleKey () {
        console.log('Context.handleKey not implemented.');
    }

    renderContent () {
        return <noscript />;
    }

    getOffset () {
        return null;
    }

    getStyle () {
        const { context } = this.props.editor;
        const offset = this.getOffset();

        return offset ? offset : context.pos;
    }

    close () {
        SetContext(null);
    }

    render () {
        const onKeyDown = event => {
            const { key, ctrlKey } = event;

            event.preventDefault();
            if ((ctrlKey && key == ' ') || key == 'Escape') {
                this.close();
            } else {
                this.handleKey(key, ctrlKey);
            }
        };

        return <div
            ref="context"
            className="context"
            style={this.getStyle()}
            tabIndex="2"
            onKeyDown={onKeyDown}>
            {this.renderContent()}
        </div>;
    }
}