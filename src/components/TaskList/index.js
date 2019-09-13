import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as Task from 'domain/task';
import TaskItem from 'components/TaskItem';

const INITIAL_STATE = {
    availableMembers: []
}

class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {...INITIAL_STATE};
    }

    render() {
        const tasksToShow = Task.filterTasksByAssigneeId(
            this.props.filterByAssigneeId, 
            this.props.tasks
        );
        const tasks = tasksToShow.map(
            task => {
                return (
                    <TaskItem
                        key={task.id}
                        task={task}>
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

const mapStateToProps = state => ({
    tasks: state.tasks,
    filterByAssigneeId: state.filterByAssigneeId
});

export default connect(mapStateToProps)(TaskList);