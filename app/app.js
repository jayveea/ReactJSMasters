'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'
import ReactBootstrap from 'react-bootstrap' //code for importing react bootstrap

var Container = require('./components/container.js');
var TaskManager = require('./taskManager.js');
var About = require('./components/about.js');
var Layout = require('./components/layout.js');

ReactDOM.render((
  <Router history={hashHistory}>
        <Route path='/' component={Container}>
          <IndexRoute />
          <Route path='/task' component={TaskManager} />
          <Route path='/about' component={About} />
        </Route>
      </Router> 
), document.getElementById('root'));

