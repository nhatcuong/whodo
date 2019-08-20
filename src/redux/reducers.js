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
        case actions.actionType.ASSIGN_MEMBER_TO_TASK:
            var tasks = state.map((task) => {
                var t = {...task};
                if (t.id === action.task.id) {
                    t.assignees.push(action.member);
                }
                return t;
            });
            return tasks;
            // return state;
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

