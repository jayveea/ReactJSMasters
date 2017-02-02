'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var TaskListContainer = require('./taskListContainer.js');

var Layout = require('./layout.js');
var Board = require('./board.js');
var Header = require('./header.js');
var Section = require('./section.js');
var Footer = require('./footer.js');

var Task = React.createClass({
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

module.exports = Task;