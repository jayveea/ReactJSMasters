import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import ConfigurationListItem from './configurationListItem';

export default class ConfigurationList extends Component{
    constructor(){
        super();
    }
    
    renderItems() {
        return this.props.items.map(function (item) {
            return (
                <ConfigurationListItem
                    key={item.id}
                    configurationId={item.id}
                    name={item.name} 
                    pomodoro={item.pomodoro} 
                    shortBreak={item.shortBreak} 
                    longBreak={item.longBreak}
                    onEdit={this.props.onEdit} 
                    onCancelEdit={this.props.onCancelEdit} 
                    onSaveEdit={this.props.onSaveEdit}
                    onDelete={this.props.onDelete} 
                    isEditMode={this.props.editItem.id == item.id}
                    handleUpdateChange = {this.props.handleUpdateChange}
                />
            );
        }, this);
    }

    render() {
        return (
            <table className="table table-striped table-bordered"
                data-toggle="table"
                data-show-columns="true"
                >
                <thead>
                <tr className="info">
                    <th className="col-md-4">Name<button data-columnName="name" data-sort="asc" onClick={this.props.onSort}><i className="fa fa-sort"/></button></th>
                    <th className="col-md-2">Pomodoro (seconds)</th>
                    <th className="col-md-2">Short Break (seconds)</th>
                    <th className="col-md-2">Long Break (seconds)</th>
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
};