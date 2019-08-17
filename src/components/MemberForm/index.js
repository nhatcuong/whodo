import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from 'redux/actions';

const INITIAL_STATE = {
    name: ''
};

class MemberForm extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit = event => {
        const { name } = this.state;
        this.props.dispatch(actions.publishMember({
            rosterId: this.props.rosterId,
            name
        }));
        this.setState({ ...INITIAL_STATE });
        event.preventDefault();
    }

    render() {
        const { name } = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <div>__New Member</div>
                <input
                    onChange={this.onChange}
                    type='text'
                    name='name'
                    value={name}
                />
                <button type="submit">__Submit</button>
            </form>
        )
    }
}

export default connect()(MemberForm);