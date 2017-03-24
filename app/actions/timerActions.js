import Dispatcher from '../dispatcher';

import TimerActionTypes from '../constants/timerActionTypes';

export function stopTimer(){
    Dispatcher.dispatch({
        type: TimerActionTypes.STOP_TIMER
    })
}

export function startTimer(taskId, taskName, totalTime, timerType){
    Dispatcher.dispatch({
        type: TimerActionTypes.START_TIMER,
        taskId: taskId,
        taskName: taskName,
        totalTime: totalTime,
        timerType: timerType
    })
}

export function resetTimer(){
    Dispatcher.dispatch({
        type: TimerActionTypes.RESET_TIMER,
    })
}

export function setTaskTimer(taskId, taskName, configurationId, configTotalTime){
    Dispatcher.dispatch({
        type: TimerActionTypes.SET_TASK_TIMER,
        taskId: taskId,
        taskName: taskName,
        configurationId: configurationId,
        configTotalTime: configTotalTime
    })
}

export function completeTask(taskId, timerType){
    Dispatcher.dispatch({
        type: TimerActionTypes.COMPLETE_TASK,
        taskId: taskId,
        timerType: timerType
    })
}

export function setTotalTime(timerType, configTotalTime){
    Dispatcher.dispatch({
        type: TimerActionTypes.SET_TOTAL_TIME,
        timerType: timerType,
        configTotalTime: configTotalTime
    })
}

export function setDefaultState(){
    Dispatcher.dispatch({
        type: TimerActionTypes.SET_DEFAULT,
    })
}