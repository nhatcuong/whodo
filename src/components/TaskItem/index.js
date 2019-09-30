import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd'

import * as Task from 'domain/task';
import * as actions from 'redux/actions';

const TaskItem = (props) => {
    const ref = useRef(null);

    const [, drop] = useDrop({
        accept: 'card',
        drop(item, monitor) {
            props.dispatch(actions.dropToReorder());
        },
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.position;
            const hoverIndex = props.position;
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current.getBoundingClientRect();
            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            // Determine mouse position
            const clientOffset = monitor.getClientOffset();
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            // Time to actually perform the action
            props.moveCard(dragIndex, hoverIndex);
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive position searches.
            item.position = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        item: { type: 'card', id: props.task.id, position: props.position },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0 : 1;

    drag(drop(ref));

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
        <div ref={ref} style={{ opacity }}>
            <div>__Title: {props.task.title}</div>
            {renderAssignees()}
            {renderAssignableMembers()}
        </div>
    );
}

const mapStateToProps = state => ({
    availableMembers: state.members
});

export default connect(mapStateToProps)(TaskItem);
