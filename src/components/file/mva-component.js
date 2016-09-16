import { React, Error, Form, Checkbox } from 'mva';

export default class MVAComponent extends Form {
    componentDidMount () {
        this.update(true, false, false);
    }

    update (constr, state, lCycle) {
        this.props.update({ constr, state, lCycle });
    }

    render () {
        const { constr, state, lCycle } = this.props.props;

        const setConstr = () => {
            if (constr) this.update(!constr, false, lCycle);
            else this.update(!constr, state, lCycle);
        };

        const setState = () => {
            this.update(constr, !state, lCycle);
        };

        const setLCycle = () => {
            this.update(constr, state, !lCycle);
        };

        return <div>
            <div className="row">
                <label>Constructor</label>
                <Checkbox
                    checked={constr}
                    toggle={setConstr}
                />
            </div>
            <div className="row">
                <label>State</label>
                <Checkbox
                    checked={state}
                    toggle={setState}
                    disabled={!constr}
                />
            </div>
            <div className="row">
                <label>Lifecycle</label>
                <Checkbox
                    checked={lCycle}
                    toggle={setLCycle}
                />
            </div>
        </div>
    }
};