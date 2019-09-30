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
    Task.create(
        'test_this_two',
        '0',
        () => 0,
        mockErrorCb
    );
});

test('reorderTaskListLocally', () => {
    const tasks = [
        {position: 0, title: 't0'}, 
        {position: 1, title: 't1'}, 
        {position: 2, title: 't2'},
        {position: 3, title: 't3'}
    ];
    const newTaskList = Task.reorderTaskListLocally(tasks, 0, 2);
    expect(newTaskList).toEqual([
        {position: 0, title: 't1'}, 
        {position: 1, title: 't2'}, 
        {position: 2, title: 't0'},
        {position: 3, title: 't3'}
    ]);
    const newTaskList2 = Task.reorderTaskListLocally(tasks, 2, 0);
    expect(newTaskList2).toEqual([
        {position: 0, title: 't2'}, 
        {position: 1, title: 't0'}, 
        {position: 2, title: 't1'},
        {position: 3, title: 't3'}
    ]);
});

test('persistTaskListOrder', () => {
    // db.updateTasksPosition().mockResolvedValue(undefined);
    const taskList = [
        {position: 0, title: 't0', id: '0'}, 
        {position: 1, title: 't1', id: '1'}, 
        {position: 2, title: 't2', id: '2'},
        {position: 3, title: 't3', id: '3'}
    ]
    Task.persistTaskListOrder(taskList);
    expect(db.updateTasksPosition).toHaveBeenCalledWith(
        ['0', '1', '2', '3'],
        [0, 1, 2, 3]
    );

});

