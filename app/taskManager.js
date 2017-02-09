'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var TaskListContainer = require('./components/taskListContainer.js');
var Layout = require('./components/layout.js');
var Board = require('./components/board.js');
var Section = require('./components/section.js');
var ModalContainer = require('./components/modalContainer.js');
var _ = require('lodash');

var TaskManager = React.createClass({
    getInitialState: function(){
        var taskData = [];
        if (localStorage.getItem('taskData') != null){
            taskData = JSON.parse(localStorage.getItem('taskData'));
        }

        return {
            taskData: taskData,
            newTaskItem: {id: 0, title: '', description: '', priority: 'Low', status: 'To Do'},
            displayModal: true
        };
    },
    handleAddButtonClick: function(){
        this.setState({displayModal: true}, function(){
            this.showAddModal();
        });
    },
    showAddModal: function(){
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
    },
    closeAddModal: function(){
        this.setState({ displayModal: false }, function(){
            this.showAddModal();
        });
    },
    handleChange: function(event){
        var newItem = this.state.newTaskItem;
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
    },
    addTaskItem: function(){
        var data = this.state.taskData;
        // var maxObj = _.maxBy(data, function(item){
        //     return item.id;
        // });

        // var newId = (maxObj == null ? 0 : maxObj.id) + 1;
        var newId = _.random(_.now());
        var newTaskData = this.state.newTaskItem;
        newTaskData.id = newId;
        
        data.push(newTaskData);
        localStorage.setItem('taskData', JSON.stringify(data));
        this.setState({taskData : data});

        this.closeAddModal();
    },
    render: function(){
        return(
            <Layout>
                <Section title='Tasks Masterlist' customClassName='container-fluid' />
                <Board title='Task Master List'>
                    <TaskListContainer taskData={this.state.taskData} />
                    <button type="button" className="btn btn-primary" onClick={this.handleAddButtonClick}>Add New</button>
                </Board>
            </Layout>
        )
    }
});

module.exports = TaskManager;