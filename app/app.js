import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import Container from './components/layout/container';
import Dashboard from './components/dashboard/dashboard';
import TaskListContainer from './components/tasks/taskListContainer';
import ConfigurationListContainer from './components/configuration/configurationListContainer';

class KanbanApplication extends React.PureComponent{
  render(){
    return(
      <Router history={hashHistory}>
        <Route path='/' component={Container}>
          <IndexRoute />
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/task' component={TaskListContainer} />
          <Route path='/configuration' component={ConfigurationListContainer} />
        </Route>
      </Router> 
    );
  }
};

ReactDOM.render(<KanbanApplication />, document.getElementById('root'));

