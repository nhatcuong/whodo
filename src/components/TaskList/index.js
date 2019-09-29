import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import * as actions from 'redux/actions';
import * as Task from 'domain/task';
import TaskItem from 'components/TaskItem';

const TaskList = (props) => {
    const moveCard = useCallback(
        (dragIndex, hoverIndex) => {
            props.dispatch(
                actions.dragToReorder(
                    dragIndex,
                    hoverIndex
                )
            );
        },
        [props],
    )

    const tasksToShow = Task.filterTasksByAssigneeId(
        props.filterByAssigneeId, 
        props.tasks
    );
    
    const tasks = tasksToShow.map(
        (task, index) => {
            return (
                <TaskItem
                    key={task.id}
                    task={task}
                    index={index}
                    moveCard={moveCard}>
                </TaskItem>
            );
        }
    );

    return (
        <DndProvider backend={HTML5Backend}>
            <div>__Tasks</div>
            { tasks }
        </DndProvider>
    );
}

const mapStateToProps = state => ({
    tasks: state.tasks,
    filterByAssigneeId: state.filterByAssigneeId
});

export default connect(mapStateToProps)(TaskList);