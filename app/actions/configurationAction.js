import Dispatcher from '../dispatcher';

import ConfigurationActionTypes from '../constants/configurationActionTypes';

export function addConfiguration(name, pomodoro, shortBreak, longBreak){
    Dispatcher.dispatch({
        type: ConfigurationActionTypes.ADD_CONFIGURATION,
        configuration: {
            name: name,
            pomodoro: pomodoro,
            shortBreak: shortBreak,
            longBreak: longBreak
        }
    })
}

export function editConfiguration(configuration){
    Dispatcher.dispatch({
        type: ConfigurationActionTypes.EDIT_CONFIGURATION,
        configuration: configuration
    })
}

export function deleteConfiguration(id){
    Dispatcher.dispatch({
        type: ConfigurationActionTypes.DELETE_CONFIGURATION,
        id
    })
}