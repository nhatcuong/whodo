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

const rootReducer = combineReducers({currentRoster, tasks, members});

export default rootReducer;

