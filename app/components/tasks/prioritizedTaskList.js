import React from 'react';
import { ListGroup, ListGroupItem, Label } from 'react-bootstrap';
import PrioritizedTasksStore from '../../stores/prioritizedTasksStore';

export default class PrioritizedTaskList extends React.Component{
    constructor(){
        super();
        this.setTasksFromStore = this.setTasksFromStore.bind(this);
        this.renderItems = this.renderItems.bind(this);
        this.renderListItems = this.renderListItems.bind(this);
        this.state = {
            tasks: []
        };
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

    renderItems(){
        return this.state.tasks.map((task)=>{
            return(
                <tr>
                    <td className="col-md-10">
                        {task.title}
                        <br/>
                        {task.description}
                        <br/>
                        <Label bsStyle="primary">{task.status}</Label>
                    </td>
                    <td className="col-md-2">
                        <button type="button" className="btn btn-warning" onClick={this.handleTimerClick}>
                            <i className="fa fa-clock-o" aria-hidden="true"></i>
                        </button>
                    </td>
                </tr>
            );
        }, this)
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
                    <button type="button" className="btn btn-warning" onClick={this.handleTimerClick}>
                        <i className="fa fa-clock-o" aria-hidden="true"></i>
                    </button>
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