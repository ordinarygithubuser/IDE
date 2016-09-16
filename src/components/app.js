import { React, Dialog, Context, SplitPanel } from 'mva';

import Header from './header';
import Explorer from './explorer/explorer';
import Editor from './editor/editor';
import Terminal from './terminal/terminal';

import * as Flow from '../actions/flow';

export default class App extends React.Component {
    getMainHeight () {
        return this.props.app.main.height;
    }

    getMenuWidth () {
        return this.props.app.menu.width;
    }

    render() {
        const state = this.props;

        return <div className="app">
            <Header project={state.project} />
            <SplitPanel orientation="vertical" height={this.getMainHeight()}>
                <SplitPanel orientation="horizontal" width={this.getMenuWidth()}>
                    <Explorer {...state} />
                    <Editor editor={state.editor} />
                </SplitPanel>
                <Terminal {...state} />
            </SplitPanel>
            <Dialog state={state} close={Flow.SetDialog} />
            <Context {...state} close={Flow.SetContext} />
        </div>;
    }
}