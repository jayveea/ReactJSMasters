'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var TaskListItem = require('./TaskListItem.js');

var TaskList = React.createClass({
    renderItems: function () {
        return this.props.items.map(function (item) {
            return (
                <TaskListItem
                    key={item.id}
                    title={item.title} 
                    description={item.description} 
                    priority={item.Priority} 
                    status={item.Status} 
                />
            );
        }, this);
    },
     render: function () {
        return (
            <table className="table table-striped table-bordered">
                <thead>
                <tr className="info">
                    <th>Task Details</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                    {this.renderItems()}
                </tbody>
            </table>
        );
    }
});

module.exports = TaskList;