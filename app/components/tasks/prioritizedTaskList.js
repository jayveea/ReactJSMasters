import React from 'react';
import { ListGroup, ListGroupItem, Label } from 'react-bootstrap';
import PrioritizedTasksStore from '../../stores/prioritizedTasksStore';
import ConfigurationStore from '../../stores/configurationStore';
import * as TimerActions from '../../actions/timerActions';

export default class PrioritizedTaskList extends React.Component{
    constructor(){
        super();
        
        this.state = {
            tasks: []
        };

        this.setTasksFromStore = this.setTasksFromStore.bind(this);
        this.renderListItems = this.renderListItems.bind(this);
        this.handleTimerClick = this.handleTimerClick.bind(this);
    }

    componentWillMount(){
        this.setTasksFromStore();
        PrioritizedTasksStore.on('change', this.setTasksFromStore);
    }

    componentWillUnMount(){
        PrioritizedTasksStore.removeListener('change', this.setTasksFromStore);
    }

    setTasksFromStore(){
        this.setState({ tasks: PrioritizedTasksStore.getPrioritizedTasks()});
    }

    handleTimerClick(event){
        let taskId = event.target.dataset.taskid;
        let taskName = event.target.dataset.taskname;
        let configurationId = event.target.dataset.configurationid;

        let config = _.find(ConfigurationStore.getConfigurations(), function(item){
            return item.id == configurationId;
        });

        TimerActions.setTaskTimer(taskId, taskName, configurationId, config.pomodoro);
    }

    renderListItems(){
        return this.state.tasks.map((task)=>{
            return(
                <ListGroupItem key={task.id}>
                    {task.title}
                    <br />
                    {task.description}
                    <br />
                    <Label bsStyle="primary">{task.status}</Label>
                    <br />
                    <a href="#/dashboard" className="btn btn-warning" onClick={this.handleTimerClick}
                        style={task.status == 'Done' ? {display:'none'} : {display:'block'}}
                        data-taskId={task.id} data-taskName={task.title} data-configurationId={task.configuration}>
                            <i className="fa fa-clock-o" aria-hidden="true"></i>
                    </a>
                </ListGroupItem>
            );
        }, this)
    }

    render(){
        return(
                <ListGroup>
                    {this.renderListItems()}
                </ListGroup>
        );
    }
};