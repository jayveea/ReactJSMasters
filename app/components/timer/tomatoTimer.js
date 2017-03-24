import React from 'react';
import ReactDOM from 'react-dom';
import Timer from './timer';
import TimerType from '../../constants/timerTypes';
import TasksStore from '../../stores/tasksStore';
import TimerStore from '../../stores/timerStore';
import ConfigurationStore from '../../stores/configurationStore';
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
        this.setStateForTaskChanged = this.setStateForTaskChanged.bind(this);
    }

    componentWillMount(){
        TasksStore.on('change', this.setTasksFromStore);
        TimerStore.on('change', this.setStateFromTimerStore);
        TimerStore.on('task_change', this.setStateForTaskChanged);

        this.setTasksFromStore();
        this.setStateFromTimerStore();
    }

    componentWillUnmount(){
        TasksStore.removeListener('change', this.setTasksFromStore);
        TimerStore.removeListener('change', this.setStateFromTimerStore);
        TimerStore.removeListener('task_change', this.setStateForTaskChanged);
    }

    getTimerData(){
        return TimerStore.getTimerData();
    }

    setTasksFromStore(){
        let data = TasksStore.getOpenTasks();
        this.setState({ openTasks: _.orderBy(data, [task => task.title.toLowerCase()], ["asc"])});
    }

    setStateFromTimerStore(){
        let data = this.getTimerData();
        
        this.setState({ timeRemaining: data.timeRemaining, totalTime: data.totalTime, timerType: data.timerType, configurationId: data.configurationId });
        this.setState({taskId: data.taskId, taskName: data.taskName, timerEnabled: data.taskId > 0 });
        if (this.state.taskId != data.taskId){
            this.setState({ timeRemaining: data.timeRemaining, totalTime: data.totalTime, timerType: data.timerType, configurationId: data.configurationId });
        }
    }

    setStateForTaskChanged(){
        let data = TimerStore.getTimerData();

        this.setState({ timeRemaining: data.timeRemaining, totalTime: data.totalTime, timerType: data.timerType, configurationId: data.configurationId });
        this.setState({taskId: data.taskId, taskName: data.taskName, timerEnabled: data.taskId > 0 });
        
        let configurationId = data.configurationId;
        let config = _.find(ConfigurationStore.getConfigurations(), function(item){
            return item.id == configurationId;
        });

        this.setState({timerType: TimerType.POMODORO, totalTime: config != null ? config.pomodoro : 0, timeRemaining: config != null ? config.pomodoro : 0});
    }

    getConfigItem(id){
        let configurationId = id;
        let config = _.find(ConfigurationStore.getConfigurations(), function(item){
            return item.id == configurationId;
        });

        return config;
    }

    handleTimerClick(event){
        let timerType;
        let totalTime;

        let config = this.getConfigItem(this.state.configurationId);
        let eventId = event.target.id;
        switch(eventId){
            case 'btnPomodoro':
                timerType = TimerType.POMODORO;
                totalTime = config.pomodoro;
                break;
            case 'btnShortBreak':
                timerType = TimerType.SHORT_BREAK;
                totalTime = config.shortBreak;
                break;
            case 'btnLongBreak':
                timerType = TimerType.LONG_BREAK;
                totalTime = config.longBreak;
                break;
        }

        if (this.state.timerType != timerType){
            this.handleStopTimer();
            this.setState({timerType: timerType, totalTime: totalTime, timeRemaining: totalTime, configurationId: config.id, timerEnabled: this.state.taskId > 0});
            TimerActions.setTotalTime(timerType, totalTime);
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
        let configurationId = event.target[selectedIndex].getAttribute('data-configurationid');
        let config = this.getConfigItem(configurationId);

        if (this.state.taskId != taskId && this.state.taskId > 0){
            this.handleStopTimer();
        }

        TimerActions.setTaskTimer(taskId, taskName, config != null ? configurationId : 0, config != null ? config.pomodoro : 0);
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
                <select className="form-control" value={this.state.taskId} onChange={this.handleTaskChange}>
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