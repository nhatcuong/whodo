import * as db from '../db';

export function create(title, rosterId, successCb=null, errorCb=null) {
    db.insertTaskInDb(title, rosterId, successCb, errorCb);
}

export function retrieveTasks(rosterId, successCb, errorCb=null) {
    db.retrieveTasksFromDb(rosterId, successCb, errorCb);
}

export function assignMemberToTask(task, member, successCb=null, errorCb=null) {
    if (task.assignees === undefined) {
        task.assignees = [];
    }
    task.assignees.push(member);
    db.assignMemberToTaskInDb(task, member);
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
