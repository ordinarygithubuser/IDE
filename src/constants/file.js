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

const MVAComponent = props => {
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

const MVAStore = () => `import * as Action from '../actions/';

export default ({ load, init } => {

    register(Action, (data, state, update) => {
        update(state);
    });

});
`;

const MVAModel = () => '';

const MVAService = () => '';

/**
 * Exports { Types, Templates }
 */

export const Types = [
    {
        name: 'Directory',
        suffix: '',
        alias: 'dir'
    }, {
        name: 'Action',
        suffix: '.js',
        alias: 'act',
        text: MVAAction
    },
    {
        name: 'Data',
        suffix: '.json',
        alias: '',
        text: () => ''
    }, {
        name: 'Component',
        suffix: '.js',
        alias: 'cmp',
        text: MVAComponent
    }, {
        name: 'Model',
        suffix: '.js',
        alias: 'mod',
        text: MVAModel
    }, {
        name: 'Store',
        suffix: '.js',
        alias: 'str',
        text: MVAStore
    }, {
        name: 'Service',
        suffix: '.js',
        alias: 'svc',
        text: MVAService
    }
];