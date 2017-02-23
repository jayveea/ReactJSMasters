import { EventEmitter } from 'events';

import Dispatcher from '../dispatcher';

import TasksActionTypes from '../constants/tasksActionTypes';
import PrioritizedTasksStore from './prioritizedTasksStore';

class TasksStore extends EventEmitter{
    constructor(){
        super();

        let taskData = [];
        if (localStorage.getItem('taskData') != null){
            taskData = JSON.parse(localStorage.getItem('taskData'));
        }

        this._state = {
            isLoading: false,
            tasks: taskData
        }
    }

    getTasks(){
        return this._state.tasks;
    }

    addTask(task){
        let maxObj = _.maxBy(this._state.tasks, function(item) { 
            return item.id; 
        });

        let newId = (maxObj == null) ? 1 : maxObj.id + 1;
        let newTaskData = {id: newId, title: task.title, description: task.description, priority: task.priority, status: task.status};
        
        this._state.tasks.push(newTaskData);
        localStorage.setItem('taskData', JSON.stringify(this._state.tasks));
    }

    editTask(task){
        this._state.tasks.map(function (item) {
            if (item.id == task.id){
                item.title = task.title;
                item.description = task.description;
                item.priority = task.priority;
                item.status = task.status;
            }
        }, this);

        localStorage.setItem('taskData', JSON.stringify(this._state.tasks));
    }

    deleteTask(id){
        let index = _.findIndex(this._state.tasks, {id: id});
        this._state.tasks.splice(index, 1);
        localStorage.setItem('taskData', JSON.stringify(this._state.tasks));
    }

    isLoading(){
        return this._state.isLoading;
    }
    
    handleAction(action){
        console.log("action", action.type);
        switch(action.type){
            case TasksActionTypes.ADD_TASK:
                this.addTask(action.task);
                this.emit('change');
                break;
            case TasksActionTypes.EDIT_TASK:
                this.editTask(action.task);
                this.emit('change');
                break;
            case TasksActionTypes.DELETE_TASK:
                this.deleteTask(action.id);
                this.emit('change');
                break;
            case TasksActionTypes.FETCH_TASK:
                this._state.isLoading = true;
                this.emit('change');
                break;
            case TasksActionTypes.RECEIVE_TASK:
                this._state.isLoading = false;
                this._state.tasks = action.tasks;
                this.emit('change');
                break;
        }
    }
}

const tasksStore = new TasksStore();
tasksStore.dispatchToken = Dispatcher.register(tasksStore.handleAction.bind(tasksStore));

window.Dispatcher = Dispatcher;
export default tasksStore;