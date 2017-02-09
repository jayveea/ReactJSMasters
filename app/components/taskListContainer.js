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
    componentWillMount: function(){
        this.setState({ taskData: this.props.taskData });
    },
    componentWillReceiveProps: function(nextProps){
        this.setState({ taskData: nextProps.taskData });
    },
    editTaskItem: function(updateItem){
        this.setState({ editTaskItem: updateItem });
    },
    cancelEditTaskItem: function(){
        this.setState({ editTaskItem: {} });
    },
    saveEditItem: function(){
        var taskData = this.state.taskData;
        var editItem = this.state.editTaskItem;

        taskData.map(function (item) {
            if (item.id == editItem.id){
                item.title = editItem.title;
                item.description = editItem.description;
                item.priority = editItem.priority;
                item.status = editItem.status;
            }
        }, this);

        localStorage.setItem('taskData', JSON.stringify(taskData));
        this.setState({taskData : JSON.parse(localStorage.getItem('taskData'))});
        this.cancelEditTaskItem();
    },
    deleteTaskItem: function(itemId){
        var data = this.state.taskData;
        var itemIndex = 0;

        data.map(function (item, index) {
            if (item.id == itemId){
                itemIndex = index;
            }
        }, this);

        data.splice(itemIndex, 1);

        localStorage.setItem('taskData', JSON.stringify(data));
        this.setState({taskData : data});
    },
    handleUpdateChange: function(event){
        var editItem = this.state.editTaskItem;
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
    },
    render: function() {
        return (
            <div>
                <TaskList 
                    items={this.state.taskData}
                    onEdit={this.editTaskItem} 
                    onCancelEdit={this.cancelEditTaskItem} 
                    onSaveEdit={this.saveEditItem}
                    onDelete={this.deleteTaskItem} 
                    handleUpdateChange = {this.handleUpdateChange}
                    editItem = {this.state.editTaskItem}
                >
                </TaskList>
            </div>
        )
    }
});

module.exports = TaskListContainer;