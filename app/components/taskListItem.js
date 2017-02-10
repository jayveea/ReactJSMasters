'use strict';

var React = require('react');

var TaskListItem = React.createClass({
    propTypes: {
        isEditMode : React.PropTypes.bool.isRequired,
        onEdit : React.PropTypes.func.isRequired,
        onCancelEdit : React.PropTypes.func.isRequired,
        onSaveEdit : React.PropTypes.func.isRequired,
        onDelete : React.PropTypes.func.isRequired,
        handleUpdateChange : React.PropTypes.func.isRequired,
        taskId : React.PropTypes.number.isRequired,
        title : React.PropTypes.string.isRequired,
        description : React.PropTypes.string.isRequired,
        priority : React.PropTypes.string.isRequired,
        status : React.PropTypes.string.isRequired
    },
    editItem: function(event){
        var updateItem = { 
            id: this.props.taskId, 
            title: this.props.title, 
            description: this.props.description, 
            priority: this.props.priority, 
            status: this.props.status 
        };
        this.props.onEdit(updateItem);
    },
    deleteItem: function(event){
        var itemId = this.props.taskId;
        this.props.onDelete(itemId);
    },
    render: function () {
        if (this.props.isEditMode == false){
            return (
                <tr>
                <td className="col-md-4">
                    <p>{this.props.title}</p>
                    <p>{this.props.description}</p>
                </td>
                <td className="col-md-3">
                    {this.props.priority}
                </td>
                <td className="col-md-3">
                    {this.props.status}
                </td>
                <td className="col-md-2">
                    <div className="btn-group" role="group" aria-label="...">
                        <button type="button" className="btn btn-primary" onClick={this.editItem}>
                            <i className="fa fa-pencil" aria-hidden="true"></i>
                        </button>
                        <button type="button" className="btn btn-danger" onClick={this.deleteItem}>
                            <i className="fa fa-trash" aria-hidden="true"></i>
                        </button>
                    </div>
                </td>
                </tr>
            )
        }
        else{
            return (
                <tr>
                <td className="col-md-4">
                    <input id="inputTitle" className="form-control" type='text' defaultValue={this.props.title} onChange={this.props.handleUpdateChange} />
                    <br />
                    <input id="inputDescription" className="form-control" type='text' defaultValue={this.props.description} onChange={this.props.handleUpdateChange} />
                </td>
                <td className="col-md-3">
                    <select className="form-control" id="selectPriority" onChange={this.props.handleUpdateChange} defaultValue={this.props.priority}>
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                    </select>
                </td>
                <td className="col-md-3">
                    <select className="form-control" id="selectStatus" onChange={this.props.handleUpdateChange} defaultValue={this.props.status}>
                            <option>To Do</option>
                            <option>In Progress</option>
                            <option>Done</option>
                    </select>
                </td>
                <td className="col-md-2">
                    <div className="btn-group" role="group" aria-label="...">
                        <button type="button" className="btn btn-success" onClick={this.props.onSaveEdit}>
                            <i className="fa fa-floppy-o" aria-hidden="true"></i>
                        </button>
                        <button type="button" className="btn btn-danger" onClick={this.props.onCancelEdit}>
                            <i className="fa fa-times" aria-hidden="true"></i>
                        </button>
                    </div>
                </td>
                </tr>
            )
        }
    }
});

module.exports = TaskListItem;