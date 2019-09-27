import React from 'react';
import { connect } from 'react-redux';

import * as Task from 'domain/task';
import TaskItem from 'components/TaskItem';

const TaskList = (props) => {
    const tasksToShow = Task.filterTasksByAssigneeId(
        props.filterByAssigneeId, 
        props.tasks
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

const mapStateToProps = state => ({
    tasks: state.tasks,
    filterByAssigneeId: state.filterByAssigneeId
});

export default connect(mapStateToProps)(TaskList);