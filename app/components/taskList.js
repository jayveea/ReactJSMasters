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
                data-show-columns="true"
                >
                <thead>
                <tr className="info">
                    <th className="col-md-4">Task Details<button data-columnName="title" data-sort="asc" onClick={this.props.onSort}><i className="fa fa-sort"/></button></th>
                    <th className="col-md-3">Priority<button data-columnName="priority" data-sort="asc" onClick={this.props.onSort}><i className="fa fa-sort"/></button></th>
                    <th className="col-md-3">Status<button data-columnName="status" data-sort="asc" onClick={this.props.onSort}><i className="fa fa-sort"/></button></th>
                    <th className="col-md-2">
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