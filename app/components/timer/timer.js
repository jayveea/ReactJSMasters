import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '../layout/layout';
import Format from 'format-duration';

export default class Timer extends React.Component{

    constructor(){
        super();
    }

    render() {
        return (
            <div>
                <div className="timer-text">
                    <span>
                        { Format(this.props.timeRemaining * 1000) }
                    </span>
                </div>
                <div>
                    <button className="btn btn-success button-timer" onClick={this.props.startTimer} 
                        disabled={!this.props.timerEnabled ? "disabled" : ""}>
                            Start
                    </button>
                    <button className="btn btn-danger button-timer" onClick={this.props.stopTimer}
                        disabled={!this.props.timerEnabled ? "disabled" : ""}>
                            Stop
                    </button>
                    <button className="btn btn-warning button-timer" onClick={this.props.resetTimer}
                        disabled={!this.props.timerEnabled ? "disabled" : ""}>
                            Reset
                    </button>
                    <button className="btn btn-info button-timer" onClick={this.props.completeTimer}
                        disabled={!this.props.timerEnabled ? "disabled" : ""}>
                            Complete
                    </button>
                </div>
            </div>
        )
    }
};