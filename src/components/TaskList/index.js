import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import _ from 'underscore';

import * as actions from 'redux/actions';
import * as Task from 'domain/task';
import TaskItem from 'components/TaskItem';
import TaskItemDraggable from 'components/TaskItemDraggable';

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

    const tasksToShowInOrder = _.sortBy(tasksToShow, 'position');
    
    const TaskComponent = props.filterByAssigneeId ? TaskItem : TaskItemDraggable;

    const tasks = tasksToShowInOrder.map(
        (task, index) => {
            return (
                <TaskComponent
                    key={task.id}
                    task={task}
                    position={index}
                    moveCard={moveCard}>
                </TaskComponent>
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