import * as Task from 'domain/task';

test('assignMemberToTaskInTaskList', () => {
    const task0 = {id: '0', assignees:['m0']};
    const task1 = {id: '1', assignees:['m1']};
    const taskList = [task0, task1];
    const member = 'm2';
    const newTaskList = Task.assignMemberToTaskInTaskList(task0, taskList, member);
    expect(newTaskList).not.toBe(taskList);
    expect(newTaskList[0].assignees.length).toBe(2);
    expect(newTaskList[1].assignees.length).toBe(1);
});