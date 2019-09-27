import * as Task from 'domain/task';
import * as db from 'db';

jest.mock('db');


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

test('unassignMemberToTaskInTaskList', () => {
    const task0 = {id: '0', assignees:[{id: 'm0'}]};
    const task1 = {id: '1', assignees:[{id: 'm1'}, {id: 'm2'}]};
    const taskList = [task0, task1];
    const newTaskList = Task.unassignMemberToTaskInTaskList(task0, taskList, {id: 'm2'});
    expect(newTaskList).not.toBe(taskList);
    expect(newTaskList[0].assignees.length).toBe(1);
    expect(newTaskList[1].assignees.length).toBe(2);
    const newTaskList2 = Task.unassignMemberToTaskInTaskList(task1, taskList, {id: 'm2'});
    expect(newTaskList2[1].assignees.length).toBe(1);
});

test('filterTasksByAssigneeId', () => {
    const task0 = {id: '0', assignees:[{id:'0'}]};
    const task1 = {id: '1', assignees:[{id:'0'}, {id:'1'}]};
    const newTaskList = Task.filterTasksByAssigneeId(
        '1',
        [task0, task1]
    )
    expect(newTaskList.length).toBe(1);
    expect(newTaskList[0].id).toBe('1');
});

test('createTaskSuccess', (done) => {
    db.insertTaskInDb.mockResolvedValue({id: '0'});
    const mockSuccessCb = (data) => {
        expect(data.id).toBe('0');
        done();
    };
    Task.create(
        'test_this_one',
        '1',
        mockSuccessCb
    );
});

test('createTaskFailure', (done) => {
    db.insertTaskInDb.mockRejectedValue({error: 'error!'});
    const mockErrorCb = (error) => {
        expect(error.error).toBe('error!');
        done();
    };
    return Task.create(
        'test_this_two',
        '0',
        () => 0,
        mockErrorCb
    );
});

