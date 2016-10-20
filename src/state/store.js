import { Store } from 'mva';

import Flow from './flow';
import Project from './project';
import Editor from './editor';
import Terminal from './terminal';

module.exports = Store([
    Flow, Project, Editor, Terminal
]);