import React from 'react';
import ReactDOM from 'react-dom';
import ConfigurationList from './configurationList';
import ConfigurationForm from './configurationForm';
import Layout from '../layout/layout';
import Board from '../layout/board';
import Section from '../layout/section';
import { Modal } from 'react-bootstrap';

import ConfigurationStore from '../../stores/configurationStore';
import * as ConfigurationActions from '../../actions/configurationAction';

export default class ConfigurationListContainer extends React.Component{
    constructor(){
        super();

        this.state = {
            editConfigurationItem : {}, 
            configurationData: [],
            showAddModal: false
        };

        this.editConfigurationItem = this.editConfigurationItem.bind(this);
        this.cancelEditConfigurationItem = this.cancelEditConfigurationItem.bind(this);
        this.saveEditItem = this.saveEditItem.bind(this);
        this.deleteConfigurationItem = this.deleteConfigurationItem.bind(this);
        this.handleUpdateChange = this.handleUpdateChange.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.setConfigurationsFromStore = this.setConfigurationsFromStore.bind(this);
        this.handleAddClick = this.handleAddClick.bind(this);
        this.handleAddChange = this.handleAddChange.bind(this);
        this.handleAddConfiguration = this.handleAddConfiguration.bind(this);
        this.closeAddModal = this.closeAddModal.bind(this);
    }

    componentWillMount(){
        ConfigurationStore.on('change', this.setConfigurationsFromStore);
        this.setConfigurationsFromStore();
    }

    componentWillUnmount(){
        ConfigurationStore.removeListener('change', this.setConfigurationsFromStore);
    }

    setConfigurationsFromStore(){
        this.setState({ configurationData: ConfigurationStore.getConfigurations()});
    }   

    handleSort(event){
        let el = event.target.closest('button');
        let columnName = el.dataset.columnname;
        let sort = el.dataset.sort;
        let data = this.state.configurationData;
        let orderedData;

        switch(columnName){
            case 'name'    :
                orderedData = _.orderBy(data, [configuration => configuration.name.toLowerCase()], [sort]);
                break;
        }        

        this.setState({configurationData: orderedData});

        el.dataset.sort = (sort == 'asc') ? 'desc' : 'asc';
    }

    editConfigurationItem(updateItem){
        this.setState({ editConfigurationItem: updateItem });
    }

    cancelEditConfigurationItem(){
        this.setState({ editConfigurationItem: {} });
    }

    saveEditItem(){
        let editItem = this.state.editConfigurationItem;
        ConfigurationActions.editConfiguration(editItem);
        this.cancelEditConfigurationItem();
    }

    deleteConfigurationItem(itemId){
        ConfigurationActions.deleteConfiguration(itemId);
    }

    handleUpdateChange(event){
        let editItem = this.state.editConfigurationItem;
        
        switch (event.target.id){
            case 'inputName':
                editItem.name = event.target.value;
                break;
            case 'inputPomodoro':
                editItem.pomodoro = event.target.value;
                break;
            case 'inputShortBreak':
                editItem.shortBreak = event.target.value;
                break;
            case 'inputLongBreak':
                editItem.longBreak = event.target.value;
                break;
        }

        this.setState({editConfigurationItem: editItem});
    }

    handleAddClick(){
        this.setState({showAddModal: true});
    }

    getAddInitialState(){
        return {
                name: '',
                pomodoro: 0,
                shortBreak: 0,
                longBreak: 0           
        };
    }

    handleAddConfiguration(){
        ConfigurationActions.addConfiguration(this.state.name, this.state.pomodoro, this.state.shortBreak, this.state.longBreak);
        this.setState(this.getAddInitialState());
        this.closeAddModal();
    }

    handleAddChange(event){
        switch (event.target.id){
            case 'newName':
                this.setState({ name: event.target.value });
                break;
            case 'newPomodoro':
                this.setState({ pomodoro: event.target.value });
                break;
            case 'newShortBreak':
                this.setState({ shortBreak: event.target.value });
                break;
            case 'newLongBreak':
                this.setState({ longBreak: event.target.value });
                break;
        }
    }

    closeAddModal(){
        this.setState({showAddModal: false});
    }

    render() {
        return (
            <div>
                <Section title='Configurations Masterlist' customClassName='container-fluid' />
                <Board title='Configuration Master List'>
                    <ConfigurationList 
                        items={this.state.configurationData}
                        onEdit={this.editConfigurationItem} 
                        onCancelEdit={this.cancelEditConfigurationItem} 
                        onSaveEdit={this.saveEditItem}
                        onDelete={this.deleteConfigurationItem} 
                        handleUpdateChange = {this.handleUpdateChange}
                        editItem = {this.state.editConfigurationItem}
                        onSort = {this.handleSort}>
                    </ConfigurationList>
                    <button className="btn btn-primary" onClick={this.handleAddClick}>Add New Configuration</button>
                </Board>
                <Modal show={this.state.showAddModal} onHide={this.closeAddModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Configuration</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ConfigurationForm handleAddChange={this.handleAddChange} />
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-primary" onClick={this.handleAddConfiguration}>Add</button>
                        <button className="btn btn-default" onClick={this.closeAddModal}>Cancel</button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
};