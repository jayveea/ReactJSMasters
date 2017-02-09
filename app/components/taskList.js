'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var TaskListItem = require('./TaskListItem.js');

var TaskList = React.createClass({
    propTypes: {
        items: React.PropTypes.array.isRequired,
        onEdit : React.PropTypes.func.isRequired,
        onCancelEdit : React.PropTypes.func.isRequired,
        onSaveEdit : React.PropTypes.func.isRequired,
        onDelete : React.PropTypes.func.isRequired,
        handleUpdateChange : React.PropTypes.func.isRequired,
        editItem : React.PropTypes.object.isRequired
    },
    renderItems: function () {
        return this.props.items.map(function (item) {
            return (
                <TaskListItem
                    key={item.id}
                    taskId={item.id}
                    title={item.title} 
                    description={item.description} 
                    priority={item.priority} 
                    status={item.status}
                    onEdit={this.props.onEdit} 
                    onCancelEdit={this.props.onCancelEdit} 
                    onSaveEdit={this.props.onSaveEdit}
                    onDelete={this.props.onDelete} 
                    isEditMode={this.props.editItem.id == item.id}
                    handleUpdateChange = {this.props.handleUpdateChange}
                />
            );
        }, this);
    },
     render: function () {
        return (
            <table className="table table-striped table-bordered"
                data-toggle="table"
                data-pagination="true"
                data-show-pagination-switch="true"
                data-sort-order="desc" 
                data-show-columns="true"
                data-page-list="[10, 25, 50, 100, ALL]"
                >
                <thead>
                <tr className="info">
                    <th>Task Details</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>
                    </th>
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