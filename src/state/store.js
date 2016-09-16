import { Store } from 'mva';

import Flow from './flow';
import App from './app';
import Project from './project';
import Editor from './editor';
import Terminal from './terminal';
import File from './file';

module.exports = Store([
    Flow, App, Project, Editor, Terminal, File
]);