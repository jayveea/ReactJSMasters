import React, {Component, PropTypes} from 'react';
import Format from 'format-duration';

export default class TaskListItem extends Component{
    constructor(){
        super();

        this.state = {duration: "0 hrs 0 mins 0 secs"};
        this.editItem = this.editItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.handleTimerClick = this.handleTimerClick.bind(this);
    }
    
    componentWillReceiveProps(nextProps){
        let duration = Format(nextProps.duration * 1000);

        this.setState({duration: duration});
    }

    editItem(event){
        let updateItem = { 
            id: this.props.taskId, 
            title: this.props.title, 
            description: this.props.description, 
            priority: this.props.priority, 
            status: this.props.status,
            duration: this.props.duration,
            configuration: this.props.configuration
        };
        this.props.onEdit(updateItem);
    }

    deleteItem(event){
        let itemId = this.props.taskId;
        this.props.onDelete(itemId);
    }

    handleTimerClick(event){

    }

    render() {
        if (!this.props.isEditMode){
            return (
                <tr>
                <td className="col-md-3">
                    <p>{this.props.title}</p>
                    <p>{this.props.description}</p>
                </td>
                <td className="col-md-2">
                    {this.props.priority}
                </td>
                <td className="col-md-2">
                    {this.props.status}
                </td>
                <td className="col-md-2">
                    {this.props.configuration}
                </td>
                <td className="col-md-1">
                    {this.state.duration}
                </td>
                <td className="col-md-2">
                    <div className="btn-group" role="group" aria-label="...">
                        <button type="button" className="btn btn-primary" onClick={this.editItem}>
                            <i className="fa fa-pencil" aria-hidden="true"></i>
                        </button>
                        <button type="button" className="btn btn-danger" onClick={this.deleteItem}>
                            <i className="fa fa-trash" aria-hidden="true"></i>
                        </button>
                        <button type="button" className="btn btn-warning" onClick={this.handleTimerClick}>
                            <i className="fa fa-clock-o" aria-hidden="true"></i>
                        </button>
                    </div>
                </td>
                </tr>
            )
        }
        else{
            return (
                <tr>
                <td className="col-md-3">
                    <input id="inputTitle" className="form-control" type='text' defaultValue={this.props.title} onChange={this.props.handleUpdateChange} />
                    <br />
                    <input id="inputDescription" className="form-control" type='text' defaultValue={this.props.description} onChange={this.props.handleUpdateChange} />
                </td>
                <td className="col-md-2">
                    <select className="form-control" id="selectPriority" onChange={this.props.handleUpdateChange} defaultValue={this.props.priority}>
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                    </select>
                </td>
                <td className="col-md-2">
                    <select className="form-control" id="selectStatus" onChange={this.props.handleUpdateChange} defaultValue={this.props.status}>
                            <option>To Do</option>
                            <option>In Progress</option>
                            <option>Done</option>
                    </select>
                </td>
                <td className="col-md-2">
                    <select className="form-control" id="selectConfiguration" onChange={this.props.handleUpdateChange} defaultValue={this.props.configuration}>
                            <option>Timer 1</option>
                    </select>
                </td>
                <td className="col-md-1">
                    {this.state.duration}
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
};

TaskListItem.propTypes = {
    isEditMode : PropTypes.bool.isRequired,
    onEdit : PropTypes.func.isRequired,
    onCancelEdit : PropTypes.func.isRequired,
    onSaveEdit : PropTypes.func.isRequired,
    onDelete : PropTypes.func.isRequired,
    handleUpdateChange : PropTypes.func.isRequired,
    taskId : PropTypes.number.isRequired,
    title : PropTypes.string.isRequired,
    description : PropTypes.string.isRequired,
    priority : PropTypes.string.isRequired,
    status : PropTypes.string.isRequired
};