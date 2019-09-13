import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actions from 'redux/actions';
import * as ROUTES from 'constants/routes';
import TaskForm from 'components/TaskForm';
import TaskList from 'components/TaskList';
import AssigneeFilter from 'components/AssigneeFilter';

const RosterTaskPage = (props) => {
    const { rosterId } = props.match.params;

    useEffect(() => {
        props.dispatch(
            actions.fetchCurrentRoster(rosterId)
        );
    }, []);

    return (
        <div>
            <div>__Roster {props.roster.title}</div>
            <Link to={ ROUTES.memberPathWithRosterId(rosterId) }>__Manage members</Link>
            <AssigneeFilter></AssigneeFilter>
            <TaskForm></TaskForm>
            <TaskList></TaskList>
        </div>
    )
}

const mapStateToProps = state => ({
    roster: state.currentRoster
});

export default connect(mapStateToProps)(RosterTaskPage);