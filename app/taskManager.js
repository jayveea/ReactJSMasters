import React from 'react';
import ReactDOM from 'react-dom';
import TaskListContainer from './components/tasks/taskListContainer';
import Layout from './components/layout/layout';
import Board from './components/layout/board';
import Section from './components/layout/section';
import ModalContainer from './components/modalContainer';
import _ from 'lodash';

import TasksStore from './stores/tasksStore';
import * as TasksActions from './actions/tasksActions';

// Note: This component is not being used anymore
// since Flux is implemented
export default class TaskManager extends React.Component {
    constructor(){
        super();

        this.state = {
            taskData: TasksStore.getTasks(),
            newTaskItem: {id: 0, title: '', description: '', priority: 'Low', status: 'To Do'},
            displayModal: true
        };

        this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
        this.showAddModal = this.showAddModal.bind(this);
        this.closeAddModal = this.closeAddModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addTaskItem = this.addTaskItem.bind(this);
        this.saveEditItem = this.saveEditItem.bind(this);
        this.deleteTaskItem = this.deleteTaskItem.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.handleUpdateChange = this.handleUpdateChange.bind(this);
        this.setTasksFromStore = this.setTasksFromStore.bind(this);
    }

    componentWillMount(){
        TasksStore.on('change', this.setTasksFromStore);
    }

    componentWillUnmount(){
        TasksStore.removeListener('change', this.setTasksFromStore);
    }

    setTasksFromStore(){
        if(TasksStore.isLoading())
            this.setState({ taskData: []});
        else
            this.setState({ taskData: TasksStore.getTasks()});
    }

    handleAddButtonClick(){
        this.setState({displayModal: true}, function(){
            this.showAddModal();
        });
    }

    showAddModal(){
        ReactDOM.render(
            <ModalContainer show = {this.state.displayModal} title="Add New Task" save={this.addTaskItem} close={this.closeAddModal}>
                <form className="form-horizontal">
                    <div className="form-group">
                        <label htmlFor="newTitle" className="col-sm-2 control-label">Title</label>
                        <div className="col-sm-10">
                            <input type="text" onChange={this.handleChange} className="form-control" id="newTitle" placeholder="Title"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="newDescription" className="col-sm-2 control-label">Description</label>
                        <div className="col-sm-10">
                        <input type="text" onChange={this.handleChange} className="form-control" id="newDescription" placeholder="Description"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="newPriority" className="col-sm-2 control-label">Priority</label>
                        <div className="col-sm-10">
                            <select className="form-control" id="newPriority" onChange={this.handleChange}>
                                <option>Low</option>
                                <option>Medium</option>
                                <option>High</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="newStatus" className="col-sm-2 control-label">Status</label>
                        <div className="col-sm-10">
                            <select className="form-control" id="newStatus" onChange={this.handleChange}>
                                <option>To Do</option>
                                <option>In Progress</option>
                                <option>Done</option>
                            </select>
                        </div>
                    </div>
                </form>
            </ModalContainer>,
            document.getElementById('modal')
        );
    }

    closeAddModal(){
        this.setState({ displayModal: false }, function(){
            this.showAddModal();
        });
    }

    handleChange(event){
        let newItem = this.state.newTaskItem;
        switch (event.target.id){
            case 'newTitle':
                newItem.title = event.target.value;
                break;
            case 'newDescription':
                newItem.description = event.target.value;
                break;
            case 'newPriority':
                newItem.priority = event.target.value;
                break;
            case 'newStatus':
                newItem.status = event.target.value;
                break;
        }
        this.setState({newTaskItem: newItem});
    }

    addTaskItem(){
        let newTaskData = this.state.newTaskItem;
        TasksActions.addTask(newTaskData.title, newTaskData.description, newTaskData.priority, newTaskData.status);

        this.setState({newTaskItem : {id: 0, title: '', description: '', priority: 'Low', status: 'To Do'}});
        this.closeAddModal();
    }

    saveEditItem(editItem){
        TasksActions.editTask(editItem);
    }

    deleteTaskItem(itemId){
        TasksActions.deleteTask(itemId);
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

    handleUpdateChange(controlId, editItem, newValue){
        switch (controlId){
            case 'inputTitle':
                editItem.title = newValue;
                break;
            case 'inputDescription':
                editItem.description = newValue;
                break;
            case 'selectPriority':
                editItem.priority = newValue;
                break;
            case 'selectStatus':
                editItem.status = newValue;
                break;
        }
        return editItem;
    }

    render(){
        return(
            <Layout>
                <Section title='Tasks Masterlist' customClassName='container-fluid' />
                <Board title='Task Master List'>
                    <TaskListContainer 
                        taskData={this.state.taskData}
                        handleAddButtonClick={this.handleAddButtonClick}
                        onSaveEdit={this.saveEditItem}
                        onDelete={this.deleteTaskItem}
                        handleSort={this.handleSort}
                        handleUpdateChange={this.handleUpdateChange} />
                    <button type="button" className="btn btn-primary" onClick={this.props.handleAddButtonClick}>Add New</button>
                </Board>
            </Layout>
        )
    }
};