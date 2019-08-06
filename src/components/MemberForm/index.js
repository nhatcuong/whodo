import React, { Component } from 'react';
import * as Task from '../../domain/member'

const INITIAL_STATE = {
    name: ''
};

export default class MemberForm extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit = event => {
        const { name } = this.state;
        Task.create(name, this.props.rosterId);
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