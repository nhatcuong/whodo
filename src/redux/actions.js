import * as Task from 'domain/task';

export const addTask = task => ({
    type: 'ADD_TASK',
    task
});

export const updateAllTasks = tasks => ({
    type: 'UPDATE_ALL_TASKS',
    tasks
});

export const publishTaskMiddleware = store => next => action => {
    if (action.type == 'PUBLISH_TASK') {
        Task.create(
            action.task.title, action.task.rosterId,
            (newTask) => {
                store.dispatch(addTask(newTask));
            }
        );
    } else {
        return next(action);
    }
}

export const fetchTaskMiddleware = store => next => action => {
    if (action.type = 'FETCH_TASKS') {
        Task.retrieveTasks(
            action.rosterId,
            (tasks) => {
                store.dispatch(updateAllTasks(tasks));
            }
        );
    }
    else {
        return next(action);
    }
}