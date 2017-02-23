import React from 'react';
import TaskListContainer from '../tasks/taskListContainer';

export default class Dashboard extends React.PureComponent{
  render(){
    return(
        <TaskListContainer />
    );
  }
};