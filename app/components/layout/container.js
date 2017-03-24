import React from 'react';
import ReactDOM from 'react-dom';
import Header from './header.js';
import Layout from './layout.js';
import TimerStore from '../../stores/timerStore';
import * as TimerActions from '../../actions/timerActions';
import { Modal, Button } from 'react-bootstrap';

export default class Container extends React.Component{
    constructor(){
        super();

        if(localStorage.getItem('configurationData') == null || localStorage.getItem('configurationData').length == 0){
            let configurationData = [{id: 1, name: 'Default Timer', pomodoro: 1500, shortBreak: 300, longBreak: 900}];
            localStorage.setItem('configurationData', JSON.stringify(configurationData));
        }

        this.state = { showTimerModal : false };

        this.displayTimerEndMessage = this.displayTimerEndMessage.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentWillMount(){
        TimerStore.on('change', this.displayTimerEndMessage);
        this.displayTimerEndMessage();
    }

    componentWillUnmount(){
        TimerStore.removeListener('change', this.displayTimerEndMessage);
    }

    displayTimerEndMessage(){
        let timer = TimerStore.getTimerData();
        if (timer.taskId > 0 && timer.totalTime > 0 && timer.timeRemaining == 0){
            this.setState({showTimerModal: true, taskName: timer.taskName });
        }
    }

    closeModal(){
        this.setState({showTimerModal: false });
        TimerStore.setDefaultState();
    }

    render(){
        return( 
            <div>
                <Header />
                <Layout>
                    {this.props.children}
                </Layout>
                <Modal show={this.state.showTimerModal} onHide={this.closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Times Up!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Timer ends for task: {this.state.taskName}</p>
                </Modal.Body>
                <Modal.Footer>
                    <button className='btn btn-primary' onClick={this.closeModal}>Close</button>
                </Modal.Footer>
                </Modal>
            </div>
        );
    }
};