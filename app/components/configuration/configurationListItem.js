import React, {Component, PropTypes} from 'react';
import Format from 'format-duration';

export default class ConfigurationListItem extends Component{
    constructor(){
        super();

        this.state = {duration: "0 hrs 0 mins 0 secs"};
        this.editItem = this.editItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    editItem(event){
        let updateItem = { 
            id: this.props.configurationId, 
            name: this.props.name, 
            pomodoro: this.props.pomodoro, 
            shortBreak: this.props.shortBreak, 
            longBreak: this.props.longBreak
        };
        this.props.onEdit(updateItem);
    }

    deleteItem(event){
        let itemId = this.props.configurationId;
        this.props.onDelete(itemId);
    }

    render() {
        if (!this.props.isEditMode){
            return (
                <tr>
                <td className="col-md-4">
                    <p>{this.props.name}</p>
                </td>
                <td className="col-md-2">
                    {this.props.pomodoro}
                </td>
                <td className="col-md-2">
                    {this.props.shortBreak}
                </td>
                <td className="col-md-2">
                    {this.props.longBreak}
                </td>
                <td className="col-md-2">
                    <div className="btn-group" role="group" aria-label="..." 
                        style={this.props.configurationId == 1 ? {display:'none'} : {display:'block'}}>
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
                    <input id="inputName" className="form-control" type='text' defaultValue={this.props.name} onChange={this.props.handleUpdateChange} />
                </td>
                <td className="col-md-2">
                    <input id="inputPomodoro" className="form-control" type='text' defaultValue={this.props.pomodoro} onChange={this.props.handleUpdateChange} />
                </td>
                <td className="col-md-2">
                    <input id="inputShortBreak" className="form-control" type='text' defaultValue={this.props.shortBreak} onChange={this.props.handleUpdateChange} />
                </td>
                <td className="col-md-2">
                    <input id="inputLongBreak" className="form-control" type='text' defaultValue={this.props.longBreak} onChange={this.props.handleUpdateChange} />
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