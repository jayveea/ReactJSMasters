import React from 'react';
import ReactDOM from 'react-dom';
import Timer from './timer';
import TimerType from '../../constants/timerTypes';
import TasksStore from '../../stores/tasksStore';
import _ from 'lodash';
import * as TasksActions from '../../actions/tasksActions';

export default class TomatoTimer extends React.Component{
    constructor(){
        super();

        this.state = { totalTime: 1500, timerType:  TimerType.POMODORO, timerEnabled: false, taskId: 0};

        this.handleTimerClick = this.handleTimerClick.bind(this);
        this.handleStopTimer = this.handleStopTimer.bind(this);
        this.setTasksFromStore = this.setTasksFromStore.bind(this);
        this.renderItems = this.renderItems.bind(this);
        this.handleTaskChange = this.handleTaskChange.bind(this);
    }

    componentWillMount(){
        TasksStore.on('change', this.setTasksFromStore);
        this.setTasksFromStore();
    }

    componentWillUnmount(){
        TasksStore.removeListener('change', this.setTasksFromStore);
    }

    setTasksFromStore(){
        let data = TasksStore.getOpenTasks();
        this.setState({ openTasks: _.orderBy(data, [task => task.title.toLowerCase()], ["asc"])});
    }

    handleTimerClick(event){
        switch(event.target.id){
            case 'btnPomodoro':
                this.setState( {totalTime: 1500, timerType: TimerType.POMODORO} );
                break;
            case 'btnShortBreak':
                this.setState( {totalTime: 300, timerType: TimerType.SHORT_BREAK} );
                break;
            case 'btnLongBreak':
                this.setState( {totalTime: 900, timerType: TimerType.LONG_BREAK} );
                break;
        }
    }

    handleStopTimer(elapsedTime){
        switch(this.state.timerType){
            case TimerType.POMODORO:
            case TimerType.SHORT_BREAK:
                TasksActions.setDuration(this.state.taskId, elapsedTime);
                break;
        }
        console.log("Elapsed Time: " + elapsedTime);
    }

    handleTaskChange(event){
        let taskId = event.target.value;
        this.setState({timerEnabled: (taskId > 0), taskId: taskId});
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
                <select className="form-control" onChange={this.handleTaskChange}>
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
                        timerType = {this.state.timerType}
                        stopTimer = {this.handleStopTimer}
                        timerEnabled = {this.state.timerEnabled}
                    />
                </div>
            </div>
        )
    }
};