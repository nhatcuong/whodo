import * as db from '../db';

export function create(title, rosterId, successCb=null, errorCb=null) {
    db.insertTaskInDb(title, rosterId)
        .then(successCb)
        .catch(errorCb);
}

export function retrieveAliveTasks(rosterId, successCb, errorCb=null) {
    db.retrieveAliveTasksFromDb(rosterId)
        .then(successCb)
        .catch(errorCb);
}

export function assignMemberToTask(task, member, successCb=null, errorCb=null) {
    db.assignMemberToTaskInDb(task, member)
        .then(successCb)
        .catch(errorCb);
}

export function assignableMembersToTask(task, membersInRoster) {
    var assigneesId = [];
    if (task.assignees) {
        assigneesId = task.assignees.map(
            assignee => {return assignee.id;}
        );
    }
    var results = [];
    membersInRoster.forEach(m => {
        if (!assigneesId.includes(m.id)) {
            results.push(m);
        }
    });
    return results;
}

