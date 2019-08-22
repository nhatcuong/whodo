import React, {Component} from 'react';

import * as actions from 'redux/actions';
import MemberForm from 'components/MemberForm';
import MemberList from 'components/MemberList';

export default class RosterMemberPage extends Component {
    componentWillMount() {
        const { rosterId } = this.props.match.params;
        this.props.dispatch(
            actions.fetchCurrentRoster(rosterId)
        );
    }
    
    render() {
        const { rosterId } = this.props.match.params;
        return (
            <div>
                Roster:  Id: {rosterId}
                <MemberForm rosterId={rosterId}></MemberForm>
                <MemberList rosterId={rosterId}></MemberList>
            </div>
        )
    }
}
