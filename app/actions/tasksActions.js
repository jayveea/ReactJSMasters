import Dispatcher from '../dispatcher';

import TasksActionTypes from '../constants/tasksActionTypes';

export function addTask(title, description, priority, status, configuration){
    Dispatcher.dispatch({
        type: TasksActionTypes.ADD_TASK,
        task: {
            title: title,
            description: description,
            priority: priority,
            status: status,
            configuration: configuration
        }
    })
}

export function editTask(task){
    Dispatcher.dispatch({
        type: TasksActionTypes.EDIT_TASK,
        task: task
    })
}

export function setDuration(id, elapsedTime){
    Dispatcher.dispatch({
        type: TasksActionTypes.SET_DURATION,
        id: id,
        elapsedTime: elapsedTime
    })
}

export function deleteTask(id){
    Dispatcher.dispatch({
        type: TasksActionTypes.DELETE_TASK,
        id
    })
}

export function refreshTasks(){
    Dispatcher.dispatch({
        type: TasksActionTypes.FETCH_TASK
    })

    setTimeout(()=>{
        Dispatcher.dispatch({
            type: TasksActionTypes.RECEIVE_TASK,
            tasks: [
                {
                    id: 1,
                    name: 'Task 1 - from server',
                    description: 'Task 1 Description',
                    priority: 'Low',
                    status: 'Pending',
                    isStarred: false
                },
                {
                    id: 2,
                    name: 'Task 2 - from server',
                    description: 'Task 2 Description',
                    priority: 'Medium',
                    status: 'In Progress',
                    isStarred: true
                },
                {
                    id: 3,
                    name: 'Task 3 - from server',
                    description: 'Task 3 Description',
                    priority: 'High',
                    status: 'Completed',
                    isStarred: false
                }
            ]
        })
    }, 3000);
}