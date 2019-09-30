import update from 'immutability-helper'

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

export function unassignMemberToTask(task, member, successCb=null, errorCb=null) {
    db.unassignMemberToTaskInDb(task, member)
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

/* As we deal with reactive views, this function must
return a new list. */
export function assignMemberToTaskInTaskList(task, taskList, member) {
    var newTaskList = taskList.map((t) => {
        var newT = {...t};
        if (newT.id === task.id) {
            newT.assignees.push(member);
        }
        return newT;
    });
    return newTaskList;
}

export function unassignMemberToTaskInTaskList(task, taskList, member) {
    var newTaskList = taskList.map((t) => {
        var newT = {...t};
        if (newT.id === task.id) {
            newT.assignees = newT.assignees.filter(
                (m) => m.id !== member.id
            );
        }
        return newT;
    });
    return newTaskList;
}

export function filterTasksByAssigneeId(assigneeId, tasks) {
    if (assigneeId == null) {
        return tasks;
    }
    return tasks.filter((t) => {
        for (var i = 0; i < t.assignees.length; i++) {
            const a = t.assignees[i];
            if (a.id === assigneeId) {
                return true;
            }
        }
        return false;
    });
}

export function reorderTaskListLocally(taskList, dragIndex, hoverIndex) {
    const dragTask = taskList[dragIndex]
    var newTaskList = update(taskList, {
        $splice: [[dragIndex, 1], [hoverIndex, 0, dragTask]],
    });
    newTaskList = newTaskList.map((task, i) => {
        task.position = i;
        return task;
    });
    return newTaskList;
}

export function persistTaskListOrder(taskList) {
    const ids = taskList.map(t => t.id);
    const positions = taskList.map(t => t.position);
    db.updateTasksPosition(ids, positions);
}
