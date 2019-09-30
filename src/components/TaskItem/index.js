import React from 'react';
import { connect } from 'react-redux';

import * as Task from 'domain/task';
import * as actions from 'redux/actions';

const TaskItem = (props) => {
    const onClickMemberButton = (event) => {
        const memberId = event.target.getAttribute('data-member');
        const member = props.availableMembers.find(
            m => m.id === memberId
        );
        if (member) {
            props.dispatch(
                actions.assignMemberToTaskRemote(
                    props.task,
                    member
                )
            );
        }
    };

    const onClickUnassignButton = (event) => {
        const memberId = event.target.getAttribute('data-member');
        const member = props.task.assignees.find(
            m => m.id === memberId
        );
        if (member) {
            props.dispatch(
                actions.unassignMemberToTaskRemote(
                    props.task,
                    member
                )
            );
        }
    };

    const renderAssignees = () => {
        return props.task.assignees.map(m => (
            <span key={m.id}>
                <button onClick={onClickUnassignButton} data-member={m.id}>X</button><span>{m.name}</span>
            </span>
        ));
    };

    const renderAssignableMembers = () => {
        const assignableMembers = Task.assignableMembersToTask(
            props.task,
            props.availableMembers
        );
        return assignableMembers.map(m => (
            <button key={m.id} onClick={onClickMemberButton} data-member={m.id}>
                {m.name}
            </button>
        ));
    };

    return (
        <div>
            <div>__Title: {props.task.title}</div>
            {renderAssignees()}
            {renderAssignableMembers()}
        </div>
    );
}

const mapStateToProps = state => ({
    availableMembers: state.members,
    filterByAssigneeId: state.filterByAssigneeId
});

export default connect(mapStateToProps)(TaskItem);
