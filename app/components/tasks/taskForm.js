import React from 'react';
import { FormGroup, FormControl, ControlLabel, Button, Glyphicon } from 'react-bootstrap';

import * as TasksActions from '../../actions/tasksActions';

export default class TaskForm extends React.Component{
    constructor(){
        super();
        this.state = this.getInitialState();
    }

    getInitialState(){
        return {
                title: '',
                description: '',
                priority: 'Low',
                status: 'To Do',
                configuration: 1           
        };
    }

    handleAddTask(){
        TasksActions.addTask(this.state.title, this.state.description, this.state.priority, this.state.status, this.state.configuration);
        this.setState(this.getInitialState());
    }

    handleChange(event){
        switch (event.target.id){
            case 'newTitle':
                this.setState({ title: event.target.value });
                break;
            case 'newDescription':
                this.setState({ description: event.target.value });
                break;
            case 'newPriority':
                this.setState({ priority: event.target.value });
                break;
            case 'newStatus':
                this.setState({ status: event.target.value });
                break;
            case 'newConfiguration':
                this.setState({ configuration: event.target.value });
                break;
        }
    }

    render(){
        return(
            <form>
                <FormGroup>
                    <ControlLabel>Title:</ControlLabel>
                    <FormControl
                        type="text"
                        id="newTitle"
                        placeholder="Enter task title"
                        value={this.state.title}
                        onChange={this.handleChange.bind(this)}
                    />
                    <FormControl.Feedback />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Description:</ControlLabel>
                    <FormControl
                        type="text"
                        id="newDescription"
                        placeholder="Enter task description"
                        value={this.state.description}
                        onChange={this.handleChange.bind(this)}
                    />
                    <FormControl.Feedback />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Priority:</ControlLabel>
                    <FormControl
                        componentClass="select"
                        value={this.state.priority}
                        id="newPriority"
                        onChange={this.handleChange.bind(this)}>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </FormControl>
                    <FormControl.Feedback />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Status:</ControlLabel>
                    <FormControl
                        componentClass="select"
                        value={this.state.status}
                        id="newStatus"
                        onChange={this.handleChange.bind(this)}>
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </FormControl>
                    <FormControl.Feedback />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Configuration:</ControlLabel>
                    <FormControl
                        componentClass="select"
                        value={this.state.configuration}
                        id="newConfiguration"
                        onChange={this.handleChange.bind(this)}>
                        <option value="1">Timer 1</option>
                    </FormControl>
                    <FormControl.Feedback />
                </FormGroup>
                <button className="btn btn-primary" onClick={this.handleAddTask.bind(this)}>Add</button>
            </form>
        );
    }
};