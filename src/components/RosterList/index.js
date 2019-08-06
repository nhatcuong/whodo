import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { retrieveRosters } from '../../domain/roster';
import * as ROUTES from '../../constants/routes';

const INITIAL_STATE = {
    existingRosters: []
}

export default class RosterList extends Component {
    constructor(props) {
        super(props);
        this.state = {...INITIAL_STATE};
    }

    componentWillMount() {
        retrieveRosters(
            results => {
                this.setState({existingRosters: results})
            }
        );
    }

    render() {
        const rosters = this.state.existingRosters.map(
            roster => {
                return (
                    <Link to={ ROUTES.pathWithRosterId(roster.id) } key={ roster.id }>
                        { roster.title }
                        <br/>
                    </Link>)
                ;
            }
        );

        return (
            <div>
                <div>__Existing Rosters</div>
                { rosters }
            </div>
        );
    }
}