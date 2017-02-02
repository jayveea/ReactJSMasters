'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var TaskListContainer = require('./components/taskListContainer.js');
import ReactBootstrap from 'react-bootstrap'; //code for importing react bootstrap

var Task = require('./components/task.js');
var Layout = require('./components/layout.js');
var Board = require('./components/board.js');
var Header = require('./components/header.js');
var Section = require('./components/section.js');
var Footer = require('./components/footer.js');

ReactDOM.render(
    <Layout>
        <Header title='Header' />
        <Section title='Tasks Masterlist' customClassName='container-fluid' />
        <Board>
            <Section title='Task Master List' customClassName='subHeader label-primary' />
            <TaskListContainer />
        </Board>
    </Layout>, document.getElementById('root'));