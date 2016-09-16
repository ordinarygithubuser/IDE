import { React } from 'mva';

export default class Settings extends React.Component {
    constructor (props) {
        super(props);

        this.state = {}
    }

    render () {
        return <div className="settings">
            <h2>Settings</h2>
            <div className="main">
                <div className="menu">side</div>
                <div className="content">content</div>
            </div>
        </div>;
    }
}