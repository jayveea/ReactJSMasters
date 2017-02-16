import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import Container from './components/container.js';
import TaskManager from './taskManager.js';
import About from './components/about.js';

class KanbanApplication extends React.PureComponent{
  render(){
    return(
      <Router history={hashHistory}>
        <Route path='/' component={Container}>
          <IndexRoute />
          <Route path='/task' component={TaskManager} />
          <Route path='/about' component={About} />
        </Route>
      </Router> 
    );
  }
};

ReactDOM.render(<KanbanApplication />, document.getElementById('root'));

