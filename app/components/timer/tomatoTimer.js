import React from 'react';
import ReactDOM from 'react-dom';
import Timer from './timer';
import TimerType from '../../constants/timerTypes';
import TasksStore from '../../stores/tasksStore';
import TimerStore from '../../stores/timerStore';
import _ from 'lodash';
import * as TasksActions from '../../actions/tasksActions';
import * as TimerActions from '../../actions/timerActions';

export default class TomatoTimer extends React.Component{
    constructor(){
        super();

        this.state = { totalTime: 0, timeRemaining: 0, timerEnabled: false, taskId: 0, timerType: TimerType.POMODORO};

        this.handleTimerClick = this.handleTimerClick.bind(this);
        this.handleStartTimer = this.handleStartTimer.bind(this);
        this.handleStopTimer = this.handleStopTimer.bind(this);
        this.setTasksFromStore = this.setTasksFromStore.bind(this);
        this.renderItems = this.renderItems.bind(this);
        this.handleTaskChange = this.handleTaskChange.bind(this);
        this.setStateFromTimerStore = this.setStateFromTimerStore.bind(this);
        this.handleTimerComplete = this.handleTimerComplete.bind(this);
    }

    componentWillMount(){
        TasksStore.on('change', this.setTasksFromStore);
        TimerStore.on('change', this.setStateFromTimerStore);
        this.setTasksFromStore();
        this.setStateFromTimerStore();
    }

    componentWillUnmount(){
        TasksStore.removeListener('change', this.setTasksFromStore);
        TimerStore.removeListener('change', this.setStateFromTimerStore);
    }

    setTasksFromStore(){
        let data = TasksStore.getOpenTasks();
        this.setState({ openTasks: _.orderBy(data, [task => task.title.toLowerCase()], ["asc"])});
    }

    setStateFromTimerStore(){
        let data = TimerStore.getTimerData();
        
        if (data.taskId > 0){
            this.setState({timeRemaining: data.timeRemaining, totalTime: data.totalTime });
        }

        if (this.state.taskId <= 0){
            this.setState({taskId: data.taskId, taskName: data.taskName, timerEnabled: data.taskId > 0 });
        }
    }

    handleTimerClick(event){
        let timerType;
        let totalTime;
        switch(event.target.id){
            case 'btnPomodoro':
                timerType = TimerType.POMODORO;
                totalTime = 1500;
                break;
            case 'btnShortBreak':
                timerType = TimerType.SHORT_BREAK;
                totalTime = 5;
                break;
            case 'btnLongBreak':
                timerType = TimerType.LONG_BREAK;
                totalTime = 900;
                break;
        }

        if (this.state.timerType != timerType){
            this.handleStopTimer();
            this.setState({timerType: timerType, totalTime: totalTime, timeRemaining: totalTime});
        }
    }

    handleStartTimer(){
        TimerActions.startTimer(this.state.taskId, this.state.taskName, this.state.totalTime, this.state.timerType);
    }

    handleStopTimer(){
        TimerActions.stopTimer();
    }

    handleResetTimer(){
        TimerActions.resetTimer();
    }

    handleTaskChange(event){
        let taskId = event.target.value;
        let selectedIndex = event.target.selectedIndex;
        let taskName = selectedIndex >= 0 ? event.target[selectedIndex].text : '';

        if (this.state.taskId != taskId && this.state.taskId > 0){
            this.handleStopTimer();
        }

        this.setState({timerEnabled: (taskId > 0), taskId: taskId, taskName: taskName});

        if(taskId > 0){
            this.setState({totalTime: 1500, timeRemaining: 1500});
        }
    }

    handleTimerComplete(){
        TimerActions.completeTask(this.state.taskId, this.state.timerType);

        this.setState({taskId: 0, totalTime: 0, timeRemaining: 0, timerEnabled: false});
    }

    renderItems() {
        return this.state.openTasks.map(function (item) {
            return (
                <option key={item.id} value={item.id} data-configurationid={item.configuration}>{item.title}</option>
            );
        }, this);
    }

    render() {
        return (
            <div className="div-timer">
                <label className="control-label">Task:</label>
                <select className="form-control" defaultValue={this.state.taskId} onChange={this.handleTaskChange}>
                    <option>Select a Task</option>
                    {this.renderItems()}
                </select>
                <div className="button-group-timer text-center">
                    <div className="btn-group btn-group-lg" role="group" aria-label="...">
                        <button id="btnPomodoro" type="button" className="btn btn-success" 
                            onClick={this.handleTimerClick} disabled={!this.state.timerEnabled ? "disabled" : ""}>
                                Pomodoro
                        </button>
                        <button id="btnShortBreak" type="button" className="btn btn-success" 
                            onClick={this.handleTimerClick} disabled={!this.state.timerEnabled ? "disabled" : ""}>
                                Short Break
                        </button>
                        <button id="btnLongBreak" type="button" className="btn btn-success" 
                            onClick={this.handleTimerClick} disabled={!this.state.timerEnabled ? "disabled" : ""}>
                                Long Break
                        </button>
                    </div>
                    <Timer 
                        totalTime = {this.state.totalTime}
                        timeRemaining = {this.state.timeRemaining}
                        timerType = {this.state.timerType}
                        stopTimer = {this.handleStopTimer}
                        startTimer = {this.handleStartTimer}
                        resetTimer = {this.handleResetTimer}
                        timerEnabled = {this.state.timerEnabled}
                        completeTimer = {this.handleTimerComplete}
                    />
                </div>
            </div>
        )
    }
};