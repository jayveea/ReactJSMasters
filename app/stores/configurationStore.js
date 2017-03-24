import { EventEmitter } from 'events';

import Dispatcher from '../dispatcher';

import ConfigurationActionTypes from '../constants/configurationActionTypes';

class ConfigurationStore extends EventEmitter{
    constructor(){
        super();

        let configurationData = [];
        if (localStorage.getItem('configurationData') != null){
            configurationData = JSON.parse(localStorage.getItem('configurationData'));
        }

        this._state = {
            configurations: configurationData
        }
    }

    getConfigurations(){
        return this._state.configurations;
    }

    addConfiguration(configuration){
        let maxObj = _.maxBy(this._state.configurations, function(item) { 
            return item.id; 
        });

        let newId = (maxObj == null) ? 1 : maxObj.id + 1;
        let newConfigurationData = {id: newId, name: configuration.name, pomodoro: configuration.pomodoro, 
            shortBreak: configuration.shortBreak, longBreak: configuration.longBreak};
        
        this._state.configurations.push(newConfigurationData);
        localStorage.setItem('configurationData', JSON.stringify(this._state.configurations));
    }

    editConfiguration(configuration){
        this._state.configurations.map(function (item) {
            if (item.id == configuration.id){
                item.name = configuration.name;
                item.pomodoro = configuration.pomodoro;
                item.shortBreak = configuration.shortBreak;
                item.longBreak = configuration.longBreak;
            }
        }, this);

        localStorage.setItem('configurationData', JSON.stringify(this._state.configurations));
    }

    deleteConfiguration(id){
        let index = _.findIndex(this._state.configurations, {id: id});
        this._state.configurations.splice(index, 1);
        localStorage.setItem('configurationData', JSON.stringify(this._state.configurations));
    }

    handleAction(action){
        switch(action.type){
            case ConfigurationActionTypes.ADD_CONFIGURATION:
                this.addConfiguration(action.configuration);
                this.emit('change');
                break;
            case ConfigurationActionTypes.EDIT_CONFIGURATION:
                this.editConfiguration(action.configuration);
                this.emit('change');
                break;
            case ConfigurationActionTypes.DELETE_CONFIGURATION:
                this.deleteConfiguration(action.id);
                this.emit('change');
                break;
        }
    }
}

const configurationStore = new ConfigurationStore();
configurationStore.dispatchToken = Dispatcher.register(configurationStore.handleAction.bind(configurationStore));

window.Dispatcher = Dispatcher;
export default configurationStore;