import React from 'react';
import { FormGroup, FormControl, ControlLabel, Button, Glyphicon } from 'react-bootstrap';

import * as ConfigurationActions from '../../actions/configurationAction';

export default class ConfigurationForm extends React.Component{
    constructor(){
        super();

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        this.props.handleAddChange(event);
    }

    render(){
        return(
            <form>
                <FormGroup>
                    <ControlLabel>Name:</ControlLabel>
                    <FormControl
                        type="text"
                        id="newName"
                        placeholder="Enter configuration name"
                        value={this.props.name}
                        onChange={this.handleChange}
                    />
                    <FormControl.Feedback />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Pomodoro:</ControlLabel>
                    <FormControl
                        type="text"
                        id="newPomodoro"
                        placeholder="Enter pomodoro break duration (seconds)"
                        value={this.props.pomodoro}
                        onChange={this.handleChange}
                    />
                    <FormControl.Feedback />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Short Break:</ControlLabel>
                    <FormControl
                        type="text"
                        id="newShortBreak"
                        placeholder="Enter short break duration (seconds)"
                        value={this.props.shortBreak}
                        onChange={this.handleChange}
                    />
                    <FormControl.Feedback />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Long Break:</ControlLabel>
                    <FormControl
                        type="text"
                        id="newLongBreak"
                        placeholder="Enter long break duration (seconds)"
                        value={this.props.longBreak}
                        onChange={this.handleChange}
                    />
                    <FormControl.Feedback />
                </FormGroup>
            </form>
        );
    }
};