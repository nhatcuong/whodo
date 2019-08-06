import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import * as Roster from '../../domain/roster';

const INITIAL_STATE = {
    title: ''
};

class NewRosterFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit = event => {
        const { title } = this.state;
        Roster.create(
            title, 
            (rosterId) => this.goToNewRoster(rosterId));
        this.setState({ ...INITIAL_STATE });
        event.preventDefault();
    }

    goToNewRoster = rosterId => {
        const pathToRosterPage = ROUTES.pathWithRosterId(rosterId)
        this.props.history.push(pathToRosterPage);
    }

    render() {
        const { title } = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <div>__New Roster</div>
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

const NewRosterForm = withRouter(NewRosterFormBase);

export default NewRosterForm;