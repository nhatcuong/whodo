import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from 'redux/actions';

import * as ROUTES from 'constants/routes';
import MemberForm from 'components/MemberForm';
import MemberList from 'components/MemberList';

const RosterMemberPage = (props) => {
    const { rosterId } = props.match.params;

    useEffect(() => {
        props.dispatch(
            actions.fetchCurrentRoster(rosterId)
        );
    });

    return (
        <div>
            <div>Roster: { props.roster.title }</div>
            <Link to={ ROUTES.pathWithRosterId(rosterId) }>Back To Tasks</Link>
            <MemberForm></MemberForm>
            <MemberList></MemberList>
        </div>
    )
}

const mapStateToProps = state => ({
    roster: state.currentRoster
});

export default connect(mapStateToProps)(RosterMemberPage);