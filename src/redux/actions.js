import * as Task from 'domain/task';
import * as Member from 'domain/member';
import * as Roster from 'domain/roster';

export const actionType = {
    ADD_TASK: 'ADD_TASK',
    UPDATE_ALL_TASKS: 'UPDATE_ALL_TASKS',
    ADD_MEMBER: 'ADD_MEMBER',
    UPDATE_ALL_MEMBERS: 'UPDATE_ALL_MEMBERS',
    ASSIGN_MEMBER_TO_TASK: 'ASSIGN_MEMBER_TO_TASK',
    SET_CURRENT_ROSTER: 'SET_CURRENT_ROSTER'
};

export const addTask = task => ({
    type: actionType.ADD_TASK,
    task
});

export const updateAllTasks = tasks => ({
    type: actionType.UPDATE_ALL_TASKS,
    tasks
});

export const publishTask = task => dispatch => {
    Task.create(
        task.title, task.rosterId,
        (newTask) => {
            dispatch(addTask(newTask));
        }
    );
}

export const addMember = member => ({
    type: actionType.ADD_MEMBER,
    member
});

export const updateAllMembers = members => ({
    type: actionType.UPDATE_ALL_MEMBERS,
    members
});

export const setCurrentRoster = roster => ({
    type: actionType.SET_CURRENT_ROSTER,
    roster
});

export const publishMember = member => dispatch => {
    Member.create(member.name, member.rosterId,
        (newMember) => {
            dispatch(addMember(newMember));
        } 
    )
}

export const fetchCurrentRoster = rosterId => (dispatch, getState) => {
    const currentRoster = getState().currentRoster;
    if (currentRoster && currentRoster.id === rosterId) {
        return;
    }
    Roster.getRoster(
        rosterId,
        (roster) => {
            dispatch(setCurrentRoster(roster));
        }
    )
    Member.retrieveForRoster(
        rosterId,
        (members) => {
            dispatch(updateAllMembers(members));
        }    
    );
    Task.retrieveAliveTasks(
        rosterId,
        (tasks) => {
            dispatch(updateAllTasks(tasks));
        }
    );
}

export const assignMemberToTask = (task, member) => ({
    type: actionType.ASSIGN_MEMBER_TO_TASK,
    member,
    task
});

export const assignMemberToTaskRemote = (task, member) => dispatch => {
    Task.assignMemberToTask(
        task, 
        member, 
        () => {
            dispatch(assignMemberToTask(task, member));
        }
    );
}