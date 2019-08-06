import React, { Component } from 'react';

import { retrieveForRoster } from '../../domain/member';

const INITIAL_STATE = {
    members: []
}

export default class MemberList extends Component {
    constructor(props) {
        super(props);
        this.state = {...INITIAL_STATE};
    }

    componentWillMount() {
        retrieveForRoster(
            this.props.rosterId,
            results => {
                this.setState({members: results})
            }
        );
    }

    render() {
        const members = this.state.members.map(
            member => {
                return (
                    <div key={ member.id }>{ member.name }</div>
                );
            }
        );

        return (
            <div>
                <div>__Member</div>
                { members }
            </div>
        );
    }
}