import _ from 'lodash';
import { EventEmitter } from 'events';
import TaskActionTypes from '../constants/tasksActionTypes';

import Dispatcher from '../dispatcher';
import TasksStore from './tasksStore';

class PrioritizedTasksStore extends EventEmitter{
    constructor(){
        super();

        this._state = {
            prioritizedTasks : _.filter(TasksStore.getTasks(), { priority: "High"})
        };
    }

    getPrioritizedTasks(){
        return this._state.prioritizedTasks;
    }

    getPrioritizedTasksCount(){
        return this._state.prioritizedTasks.length;
    }

    handleAction(action){
        console.log("action: " + action.type);
        switch(action.type){
            case TaskActionTypes.DELETE_TASK:
            case TaskActionTypes.EDIT_TASK:
            case TaskActionTypes.ADD_TASK:{
                Dispatcher.waitFor([TasksStore.dispatchToken]);
                this._state.prioritizedTasks = _.filter(TasksStore.getTasks(), { priority: "High"});
                this.emit('change');
                break;
            }
        }
    }
}

const prioritizedTasksStore = new PrioritizedTasksStore();
Dispatcher.register(prioritizedTasksStore.handleAction.bind(prioritizedTasksStore));

Dispatcher.unregister(TasksStore.dispatchToken);
TasksStore.dispatchToken = Dispatcher.register(TasksStore.handleAction.bind(TasksStore));

export default prioritizedTasksStore;