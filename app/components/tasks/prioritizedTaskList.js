import React from 'react';
import { ListGroup, ListGroupItem, Label } from 'react-bootstrap';
import PrioritizedTasksStore from '../../stores/prioritizedTasksStore';

export default class PrioritizedTaskList extends React.Component{
    constructor(){
        super();
        this.setTasksFromStore = this.setTasksFromStore.bind(this);
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
    
    render(){
        return(
            <ListGroup>
                {this.state.tasks.map((task)=>{
                    return(
                        <ListGroupItem key={task.id}>
                            {task.title}
                            <br/>
                            {task.description}
                            <br/>
                            <Label bsStyle="primary">{task.status}</Label>
                        </ListGroupItem>
                    );
                })}
            </ListGroup>
        );
    }
};