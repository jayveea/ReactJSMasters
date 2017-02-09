'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'

var Header = React.createClass({
  render: function() {
    return (
      <nav className="navbar navbar-inverse">
          <ul className="nav navbar-nav">
            <li><Link to='/'>Tomato Timer</Link></li>
            <li className="active"><Link to='/task'>Tasks</Link></li>
            <li><Link to='/about'>About</Link></li>
          </ul>
      </nav>
    )
  }
});

module.exports = Header;