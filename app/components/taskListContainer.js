'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var TaskList = require('./taskList.js');

var TaskListContainer = React.createClass({
    getInitialState: function(){
        return {
            editTaskItem : {}
        };
    },
    editTaskItem: function(updateItem){
        this.setState({ editTaskItem: updateItem });
    },
    cancelEditTaskItem: function(){
        this.setState({ editTaskItem: {} });
    },
    saveEditItem: function(){
        var editItem = this.state.editTaskItem;
        this.props.onSaveEdit(editItem);
        this.cancelEditTaskItem();
    },
    deleteTaskItem: function(itemId){
        this.props.onDelete(itemId);
    },
    handleUpdateChange: function(event){
        var editItem = this.state.editTaskItem;
        var newEditItem = this.props.handleUpdateChange(event.target.id, editItem, event.target.value);
        
        this.setState({editTaskItem: newEditItem});
    },
    render: function() {
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
});

module.exports = TaskListContainer;