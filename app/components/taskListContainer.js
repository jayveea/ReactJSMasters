import React from 'react';
import ReactDOM from 'react-dom';
import TaskList from './taskList.js';

export default class TaskListContainer extends React.Component{
    constructor(){
        super();

        this.state = {editTaskItem : {}};

        this.editTaskItem = this.editTaskItem.bind(this);
        this.cancelEditTaskItem = this.cancelEditTaskItem.bind(this);
        this.saveEditItem = this.saveEditItem.bind(this);
        this.deleteTaskItem = this.deleteTaskItem.bind(this);
        this.handleUpdateChange = this.handleUpdateChange.bind(this);
    }
    
    editTaskItem(updateItem){
        this.setState({ editTaskItem: updateItem });
    }

    cancelEditTaskItem(){
        this.setState({ editTaskItem: {} });
    }

    saveEditItem(){
        let editItem = this.state.editTaskItem;
        this.props.onSaveEdit(editItem);
        this.cancelEditTaskItem();
    }

    deleteTaskItem(itemId){
        this.props.onDelete(itemId);
    }

    handleUpdateChange(event){
        let editItem = this.state.editTaskItem;
        let newEditItem = this.props.handleUpdateChange(event.target.id, editItem, event.target.value);
        
        this.setState({editTaskItem: newEditItem});
    }

    render() {
        return (
            <div>
                <TaskList 
                    items={this.props.taskData}
                    onEdit={this.editTaskItem} 
                    onCancelEdit={this.cancelEditTaskItem} 
                    onSaveEdit={this.saveEditItem}
                    onDelete={this.deleteTaskItem} 
                    handleUpdateChange = {this.handleUpdateChange}
                    editItem = {this.state.editTaskItem}
                    onSort = {this.props.handleSort}
                >
                </TaskList>
                <button type="button" className="btn btn-primary" onClick={this.props.handleAddButtonClick}>Add New</button>
            </div>
        )
    }
};