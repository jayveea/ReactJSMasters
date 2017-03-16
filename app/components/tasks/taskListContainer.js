import React from 'react';
import ReactDOM from 'react-dom';
import TaskList from './taskList';
import Layout from '../layout/layout';
import Board from '../layout/board';
import Section from '../layout/section';

import TasksStore from '../../stores/tasksStore';
import * as TasksActions from '../../actions/tasksActions';
import * as TimerActions from '../../actions/timerActions';

export default class TaskListContainer extends React.Component{
    constructor(){
        super();

        this.state = {
            editTaskItem : {}, 
            taskData: []
        };

        this.editTaskItem = this.editTaskItem.bind(this);
        this.cancelEditTaskItem = this.cancelEditTaskItem.bind(this);
        this.saveEditItem = this.saveEditItem.bind(this);
        this.deleteTaskItem = this.deleteTaskItem.bind(this);
        this.handleUpdateChange = this.handleUpdateChange.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.setTasksFromStore = this.setTasksFromStore.bind(this);
    }

    componentWillMount(){
        TasksStore.on('change', this.setTasksFromStore);
        this.setTasksFromStore();
    }

    componentWillUnmount(){
        TasksStore.removeListener('change', this.setTasksFromStore);
    }

    setTasksFromStore(){
        if(TasksStore.isLoading())
            this.setState({ taskData: []});
        else{
            if (this.props.showInDashboard)
                this.setState({ taskData: TasksStore.getOpenTasks()});
            else
                this.setState({ taskData: TasksStore.getTasks()});
        }
    }   

    handleSort(event){
        let el = event.target.closest('button');
        let columnName = el.dataset.columnname;
        let sort = el.dataset.sort;
        let data = this.state.taskData;
        let orderedData;

        switch(columnName){
            case 'title'    :
                orderedData = _.orderBy(data, [task => task.title.toLowerCase()], [sort]);
                break;
            case 'priority':
                orderedData = _.orderBy(data, [task => task.priority == 'Low' ? 1 : (task.priority == 'Medium' ? 2 : 3 )], [sort]);
                break;
            case 'status':
                orderedData = _.orderBy(data, [task => task.status == 'To Do' ? 1 : (task.status == 'In Progress' ? 2 : 3 )], [sort]);
                break;
        }        

        this.setState({taskData: orderedData});

        el.dataset.sort = (sort == 'asc') ? 'desc' : 'asc';
    }

    editTaskItem(updateItem){
        this.setState({ editTaskItem: updateItem });
    }

    cancelEditTaskItem(){
        this.setState({ editTaskItem: {} });
    }

    saveEditItem(){
        let editItem = this.state.editTaskItem;
        TasksActions.editTask(editItem);
        this.cancelEditTaskItem();
    }

    deleteTaskItem(itemId){
        TasksActions.deleteTask(itemId);
    }

    setTaskTimer(taskId){
        TimerActions.setTaskTimer(taskId);
    }

    handleUpdateChange(event){
        let editItem = this.state.editTaskItem;
        
        switch (event.target.id){
            case 'inputTitle':
                editItem.title = event.target.value;
                break;
            case 'inputDescription':
                editItem.description = event.target.value;
                break;
            case 'selectPriority':
                editItem.priority = event.target.value;
                break;
            case 'selectStatus':
                editItem.status = event.target.value;
                break;
        }

        this.setState({editTaskItem: editItem});
    }

    render() {
        return (
            <div>
                <Section title={this.props.showInDashboard ? '' : 'Tasks Masterlist'} customClassName='container-fluid' />
                <Board title={this.props.showInDashboard ? 'Pending, In-progress Tasks' : 'Task Master List'}>
                    <TaskList 
                        items={this.state.taskData}
                        onEdit={this.editTaskItem} 
                        onCancelEdit={this.cancelEditTaskItem} 
                        onSaveEdit={this.saveEditItem}
                        onDelete={this.deleteTaskItem} 
                        handleUpdateChange = {this.handleUpdateChange}
                        editItem = {this.state.editTaskItem}
                        onSetTaskTimer = {this.setTaskTimer}
                        onSort = {this.handleSort}>
                    </TaskList>
                </Board>
            </div>
        )
    }
};