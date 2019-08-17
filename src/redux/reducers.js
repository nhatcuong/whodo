import { combineReducers } from 'redux'
import * as actions from './actions';

function tasks(state=[], action) {
    switch (action.type) {
        case actions.actionType.ADD_TASK:
            return [
                ...state,
                action.task
            ];
        case actions.actionType.UPDATE_ALL_TASKS:
            return action.tasks;
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

const rootReducer = combineReducers({tasks, members});

export default rootReducer;

