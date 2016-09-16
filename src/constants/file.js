/**
 * Template Definitions
 */

const MVAAction = props => {
    const actions = props.actions.map(action => {
        return `export const ${action} = new Action();`;
    }).join('\n');

    return `import { Action } from 'mva';

${actions}`;
};

const MVAStatefulComponent = props => {
    const state = !props.state ? '' : `
        this.state = {

        };`;

    const constr = !props.constructor ? '' : `constructor (props) {
        super(props);
        ${state}
    }`;

    const lCycle = !props.lCycle ? '' : `
    componentWillMount () {

    }

    componentDidMount () {

    }

    componentWillUnmount () {

    }

    componentWillUpdate (nextProps, nextState) {

    }

    componentDidUpdate (prevProps, prevState) {

    }`;

    return `import { React } from 'mva';

export default class Component extends React.Component {
    ${constr}
    ${lCycle}

    render () {
        return <div className=""></div>;
    }
};`;
};

const MVAStatelessComponent = () => `import { React } from 'mva';

export default (state) => {
    return <div className=""></div>;
};`;

const MVAStore = () => `import * as Action from '../actions/';

export default ({ load, init } => {

    register(Action, (data, state, update) => {
        update(state);
    });

});
`;

const Package = () => `{
    "name": "Project",
    "version": "0.0.1",
    "description": "",
    "main": "",
    "scripts": {},
    "dependencies": {},
    "devDependencies": {},
    "keywords": [],
    "author": "Anonymous",
    "license": "None"
}`;

const IndexHTML = () => `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Application</title>
    </head>
    <body>
        <h1>Application</h1>
    </body>
</html>`;

/**
 * Exports { Types, Templates }
 */

export const Types = [
    { name: 'Directory', suffix: '' },
    { name: 'File', suffix: '' },
    { name: 'Javascript File', suffix: '.js' },
    { name: 'HTML File', suffix: '.html' },
    { name: 'JSON File', suffix: '.json' },
    { name: 'SASS File', suffix: '.sass' },
    { name: 'Model File', suffix: '.mod' }
];

export const Templates = {
    'Javascript File': [
        { name: 'None', text: () => '' },
        { name: 'MVA Action', text: MVAAction },
        { name: 'MVA Component', text: MVAStatelessComponent },
        { name: 'MVA Component (State)', text: MVAStatefulComponent },
        { name: 'MVA Store', text: MVAStore },
        { name: 'Web Server', text: () => '' }
    ],
    'Model File': [
        { name: 'None', text: () => '' },
        { name: 'Action', text: () => '' },
        { name: 'Component', text: () => '' },
        { name: 'Store', text: () => '' }
    ],
    'JSON File': [
        { name: 'None', text: () => '' },
        { name: 'package.json', text: Package }
    ],
    'HTML File': [
        { name: 'None', text: () => '' },
        { name: 'Index', text: IndexHTML }
    ]
};