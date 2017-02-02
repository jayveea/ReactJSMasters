'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var TaskListContainer = require('./components/taskListContainer.js');
var Layout = require('./components/layout.js');
var Board = require('./components/board.js');
var Section = require('./components/section.js');

var TaskManager = React.createClass({
    render: function(){
        return(
            <Layout>
                <Section title='Tasks Masterlist' customClassName='container-fluid' />
                <Board>
                    <Section title='Task Master List' customClassName='subHeader label-primary' />
                    <TaskListContainer />
                </Board>
            </Layout>
        )
    }
});

module.exports = TaskManager;