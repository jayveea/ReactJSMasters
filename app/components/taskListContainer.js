'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var TaskList = require('./taskList.js');

var data = [
    {id: "1", title:"Finish Week 1 Deck", description: "Introduction, React, Component, JSX, Virtual DOM", Priority: "Medium", Status: "Done"},
    {id: "2", title:"Finish Week 1 Quiz", description: "Introduction to MMR", Priority: "Medium", Status: "Done"},
    {id: "3", title:"Finish Week 3 Deck", description: "Props and states", Priority: "Medium", Status: "In Progress"},
    {id: "4", title:"Task Gpxl0DVgs5", description: "Task desc y0sVvfgsgdsgsdg", Priority: "Medium", Status: "To Do"}
];

localStorage.setItem('taskData', JSON.stringify(data));

var TaskListContainer = React.createClass({
    getInitialState: function(){
        return {
            taskData: JSON.parse(localStorage.getItem('taskData'))
        };
    },
    render: function() {
        return (
            <TaskList items={this.state.taskData}>
            </TaskList>
        )
    }
});

module.exports = TaskListContainer;