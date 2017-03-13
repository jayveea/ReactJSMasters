import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '../layout/layout';
import Format from 'format-duration';

export default class Timer extends React.Component{

    constructor(){
        super();

        this.state = {
            timeRemaining : 0,
            totalTime : 0
        };

        this.tick = this.tick.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
    }

    componentDidMount(){
        this.setState({ 
            timeRemaining: this.props.totalTime, 
            totalTime : this.props.totalTime
         });
    }

    componentWillReceiveProps(nextProps){
        this.setState({ 
            timeRemaining: nextProps.totalTime, 
            totalTime : nextProps.totalTime
         });
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    tick() {
        this.setState({timeRemaining: this.state.timeRemaining - 1});

        if (this.state.timeRemaining <= 0) {
            clearInterval(this.interval);
        }
    }

    startTimer(){
        this.interval = setInterval(this.tick, 1000);
    }

    stopTimer(){
        clearInterval(this.interval);
        let elapsedTime = this.state.totalTime - this.state.timeRemaining;

        this.props.stopTimer(elapsedTime);
    }

    resetTimer(){
        clearInterval(this.interval);
        this.setState({timeRemaining: this.state.totalTime});
    }

    render() {
        return (
            <div>
                <div className="timer-text">
                    <span>
                        { Format(this.state.timeRemaining * 1000) }
                    </span>
                </div>
                <div>
                    <button className="btn btn-success button-timer" onClick={this.startTimer} 
                        disabled={!this.props.timerEnabled ? "disabled" : ""}>
                            Start
                    </button>
                    <button className="btn btn-danger button-timer" onClick={this.stopTimer}
                        disabled={!this.props.timerEnabled ? "disabled" : ""}>
                            Stop
                    </button>
                    <button className="btn btn-warning button-timer" onClick={this.resetTimer}
                        disabled={!this.props.timerEnabled ? "disabled" : ""}>
                            Reset
                    </button>
                    <button className="btn btn-info button-timer"
                        disabled={!this.props.timerEnabled ? "disabled" : ""}>
                            Complete
                    </button>
                </div>
            </div>
        )
    }
};