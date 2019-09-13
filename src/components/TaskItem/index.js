import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as Task from 'domain/task';
import * as actions from 'redux/actions';


class TaskItem extends Component {
    onClickMemberButton = event => {
        const memberId = event.target.getAttribute('data-member');
        const member = this.props.availableMembers.find(
            m => m.id === memberId
        );
        if (member) {
            this.props.dispatch(
                actions.assignMemberToTaskRemote(
                    this.props.task,
                    member
                )
            );
        }
    }

    onClickUnassignButton = event => {
        const memberId = event.target.getAttribute('data-member');
        const member = this.props.task.assignees.find(
            m => m.id === memberId
        );
        if (member) {
            this.props.dispatch(
                actions.unassignMemberToTaskRemote(
                    this.props.task,
                    member
                )
            );
        }
    }

    renderAssignees() {
        return this.props.task.assignees.map(m => (
            <span key={m.id}>
                <button onClick={this.onClickUnassignButton} data-member={m.id}>X</button><span>{m.name}</span>
            </span>
        ));
    }

    renderAssignableMembers() {
        const assignableMembers = Task.assignableMembersToTask(
            this.props.task,
            this.props.availableMembers
        );
        return assignableMembers.map(m => (
            <button key={m.id} onClick={this.onClickMemberButton} data-member={m.id}>
                {m.name}
            </button>
        ));
    }

    render() {
        return (
            <div>
                <div>__Title: {this.props.task.title}</div>
                {this.renderAssignees()}
                {this.renderAssignableMembers()}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    availableMembers: state.members
});

export default connect(mapStateToProps)(TaskItem);