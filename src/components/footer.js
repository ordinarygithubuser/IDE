import { React } from 'mva';
const remote = require('electron').remote;

export default class Footer extends React.Component {
    constructor (props) {
        super(props);

        this.state = { memUsed: this.getMemUsed() };
        this.interval = null;
    }

    componentDidMount () {
        this.interval = setInterval(() => this.setState({
            memUsed: this.getMemUsed()
        }), 5000);
    }

    componentWillUnMount () {
        clearInterval(this.interval);
        this.interval = null;
    }

    getMemUsed () {
        const memInfo = remote.process.getProcessMemoryInfo();
        return memInfo.workingSetSize / 1000;
    }

    render () {
        const { app } = this.props.state;
        const { memUsed } = this.state;

        return <footer>
            <div className="status">
                <span>{app.status}</span>
            </div>
            <div className="usage">
                <label>Memory </label>
                <span>{memUsed + ' MB'}</span>
            </div>
        </footer>;
    }
};