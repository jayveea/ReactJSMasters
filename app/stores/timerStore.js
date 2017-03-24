import { EventEmitter } from 'events';

import Dispatcher from '../dispatcher';

import TasksActionTypes from '../constants/tasksActionTypes';
import TimerActionTypes from '../constants/timerActionTypes';
import TimerTypes from '../constants/timerTypes';
import TasksStore from './tasksStore';

class TimerStore extends EventEmitter{
    constructor(){
        super();

        this.setDefaultState();
    }

    setDuration(elapsedTime){
        let taskList = TasksStore.getTasks();

        taskList.map(function (item) {
            if (item.id == this._state.taskId){
                item.duration += elapsedTime;
            }
        }, this);

        localStorage.setItem('taskData', JSON.stringify(taskList));
    }

    setTaskComplete(taskId, timerType){
        clearInterval(this.interval);
        let taskList = TasksStore.getTasks();

        taskList.map(function (item) {
            if (item.id == taskId){
                item.status = "Done";
                if (timerType == TimerTypes.POMODORO || timerType == TimerTypes.SHORT_BREAK){
                    let elapsedTime = this._state.totalTime - this._state.timeRemaining;
                    item.duration += elapsedTime;
                }
            }
        }, this);

        localStorage.setItem('taskData', JSON.stringify(taskList));
    }

    startTimer(taskId, taskName, totalTime, timerType){
        let configurationId = this._state.configurationId;
        let configTotalTime = this._state.configTotalTime;
        this._state = {taskId: taskId, totalTime: totalTime, timeRemaining: totalTime, timerType: timerType, 
            taskName: taskName, configurationId: configurationId, configTotalTime: configTotalTime};
        this.interval = setInterval( () => {
            this._state.timeRemaining = this._state.timeRemaining - 1;
            if (this._state.timeRemaining <= 0) {
                this.setTaskComplete(taskId, timerType);
            }
            this.emit('change');
        }, 1000);
    }

    stopTimer(){
        clearInterval(this.interval);
        
        if (this._state.timerType == TimerTypes.POMODORO || this._state.timerType == TimerTypes.SHORT_BREAK){
            let elapsedTime = this._state.totalTime - this._state.timeRemaining;
            this.setDuration(elapsedTime);
        }
        this._state.totalTime = this._state.timeRemaining;
    }

    resetTimer(){
        clearInterval(this.interval);
        this._state.timeRemaining = this._state.configTotalTime;
    }

    getTimerData(){
        return { timeRemaining: this._state.timeRemaining, totalTime: this._state.totalTime, 
            taskId: this._state.taskId, timerType: this._state.timerType, 
            taskName: this._state.taskName, configurationId: this._state.configurationId };
    }
    
    setTaskTimer(taskId, taskName, configurationId, configTotalTime){
        this._state.taskId = taskId;
        this._state.taskName = taskName;
        this._state.configurationId = configurationId;
        this._state.configTotalTime  = configTotalTime;
        this._state.totalTime  = configTotalTime;
        this._state.timeRemaining  = configTotalTime;
    }

    setDefaultState(){
        this._state = { timeRemaining: 0, totalTime: 0, taskId: 0, taskName: '', configurationId: 0 };
    }

    setTotalTime(timerType, configTotalTime){
        this._state.timerType = timerType;
        this._state.configTotalTime  = configTotalTime;
    }

    handleAction(action){
        switch(action.type){
            case TimerActionTypes.START_TIMER:
                this.startTimer(action.taskId, action.taskName, action.totalTime, action.timerType);
                break;
            case TimerActionTypes.STOP_TIMER:
                this.stopTimer();
                this.emit('change');
                break;
            case TimerActionTypes.RESET_TIMER:
                this.resetTimer();
                this.emit('change');
                break;
            case TimerActionTypes.SET_TASK_TIMER:
                this.setTaskTimer(action.taskId, action.taskName, action.configurationId, action.configTotalTime);
                this.emit('task_change');
                break;
            case TimerActionTypes.COMPLETE_TASK:
                this.setTaskComplete(action.taskId, action.timerType);
                this.emit('change');
                break;
            case TimerActionTypes.SET_TOTAL_TIME:
                this.setTotalTime(action.timerType, action.configTotalTime);
                break;
            case TasksActionTypes.EDIT_TASK:
                Dispatcher.waitFor([TasksStore.dispatchToken]);
                this.emit('change');
                break;
            case TimerActionTypes.SET_DEFAULT:
                this.setDefaultState();
                this.emit('change');
                break;
        }
    }
}

const timerStore = new TimerStore();
timerStore.dispatchToken = Dispatcher.register(timerStore.handleAction.bind(timerStore));

window.Dispatcher = Dispatcher;
export default timerStore;