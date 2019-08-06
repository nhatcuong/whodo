import React, { Component } from 'react';

import NewRosterForm from '../RosterForm';
import RosterList from '../RosterList';

export default class HomePage extends Component {
    render() {
        return (
            <div>
                <NewRosterForm></NewRosterForm>
                <RosterList></RosterList>
            </div>
        );
    }
}