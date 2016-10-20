import { React, Dialog, Context, SplitPanel } from 'mva';

import Header from './header';
import Footer from './footer';
import Explorer from './explorer/explorer';
import Editor from './editor/editor';
import Terminal from './terminal/terminal';

import * as Flow from '../actions/flow';

export default class App extends React.Component {
    componentDidMount () {
        window.resizeBy(1, 1); // hack
    }

    render() {
        const state = this.props;
        const { main, menu } = state.app;
        const resizeMain = value => Flow.Resize({ name: 'main', key: 'height', value });
        const resizeMenu = value => Flow.Resize({ name: 'menu', key: 'width', value });

        return <div className="app">
            <Header project={state.project} />
            <SplitPanel orientation="vertical" height={main.height} resize={resizeMain}>
                <SplitPanel orientation="horizontal" width={menu.width} resize={resizeMenu}>
                    <Explorer {...state} />
                    <Editor editor={state.editor} />
                </SplitPanel>
                <Terminal {...state} />
            </SplitPanel>
            <Footer state={state} />
            <Dialog state={state} close={Flow.SetDialog} />
            <Context {...state} close={Flow.SetContext} />
        </div>;
    }
}