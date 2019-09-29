import { combineReducers } from 'redux'
import * as actions from './actions';
import * as Task from 'domain/task';

function currentRoster(state={}, action) {
    switch (action.type) {
        case actions.actionType.SET_CURRENT_ROSTER:
            return action.roster;
        default:
            return state;
    }
}

function tasks(state=[], action) {
    switch (action.type) {
        case actions.actionType.ADD_TASK:
            return [
                ...state,
                action.task
            ];
        case actions.actionType.UPDATE_ALL_TASKS:
            return action.tasks;
        case actions.actionType.ASSIGN_MEMBER_TO_TASK:
            return Task.assignMemberToTaskInTaskList(
                action.task,
                state,
                action.member
            );
        case actions.actionType.UNASSIGN_MEMBER_TO_TASK:
            return Task.unassignMemberToTaskInTaskList(
                action.task,
                state,
                action.member
            );
        case actions.actionType.DRAG_TO_REORDER:
            return Task.reorderTaskListLocally(
                state,
                action.dragIndex,
                action.hoverIndex
            );
        default:
            return state;
    }
}

function members(state=[], action) {
    switch (action.type) {
        case actions.actionType.ADD_MEMBER:
            return [
                ...state,
                action.member
            ];
        case actions.actionType.UPDATE_ALL_MEMBERS:
            return action.members;
        default:
            return state;
    }
}

function filterByAssigneeId(state=null, action) {
    switch (action.type) {
        case actions.actionType.FILTER_BY_ASSIGNEE_ID:
            return action.memberId;
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    currentRoster, tasks, members, filterByAssigneeId
});

export default rootReducer;

