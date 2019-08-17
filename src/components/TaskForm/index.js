import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from 'redux/actions';

const INITIAL_STATE = {
    title: ''
};

class TaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit = event => {
        const { title } = this.state;
        this.props.dispatch(actions.publishTask({
            title: title,
            rosterId: this.props.rosterId
        }));
        this.setState({ ...INITIAL_STATE });
        event.preventDefault();
    }

    render() {
        const { title } = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <div>__New Task</div>
                <input
                    onChange={this.onChange}
                    type='text'
                    name='title'
                    value={title}
                />
                <button type="submit">__Submit</button>
            </form>
        )
    }
}

export default connect()(TaskForm);
