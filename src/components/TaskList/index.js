import React, { Component } from 'react';

import { retrieveTasks } from 'domain/task';
import * as Member from 'domain/member';
import TaskItem from 'components/TaskItem';

const INITIAL_STATE = {
    tasks: [],
    availableMembers: []
}

export default class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {...INITIAL_STATE};
    }

    componentWillMount() {
        retrieveTasks(
            this.props.rosterId,
            results => {
                this.setState({tasks: results});
            }
        );
        Member.retrieveForRoster(
            this.props.rosterId,
            results => {
                this.setState({availableMembers: results});
            }
        );
    }

    render() {
        const tasks = this.state.tasks.map(
            task => {
                return (
                    <TaskItem
                        key={task.id}
                        task={task} 
                        availableMembers={this.state.availableMembers}>
                    </TaskItem>
                );
            }
        );

        return (
            <div>
                <div>__Tasks</div>
                { tasks }
            </div>
        );
    }
}