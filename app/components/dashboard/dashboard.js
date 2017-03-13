import React from 'react';
import TaskListContainer from '../tasks/taskListContainer';
import TomatoTimer from '../timer/tomatoTimer';

export default class Dashboard extends React.PureComponent{
  render(){
    return(
      <div>
        <div className="col-md-6">
          <TomatoTimer />
        </div>
        <div className="col-md-6">
          <TaskListContainer showInDashboard="true" />
        </div>
      </div>
    );
  }
};