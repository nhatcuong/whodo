import React, { Component } from 'react';
import * as Task from 'domain/task'


export default class TaskItem extends Component {
    onClickMemberButton = event => {
        const memberId = event.target.getAttribute('data-member');
        const member = this.props.availableMembers.find(
            m => m.id === memberId
        )
        if (member) {
            Task.assignMemberToTask(this.props.task, member);
        }
    }

    renderAssignees() {
        return this.props.task.assignees.map(m => (
            <span key={m.id}>{m.name} </span>
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