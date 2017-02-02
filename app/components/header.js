'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var Header = React.createClass({
  render: function() {
    return (
      <nav className="navbar navbar-inverse">
          <ul className="nav navbar-nav">
            <li><a href="#">Tomato Timer</a></li>
            <li className="active"><a href="#">Tasks</a></li>
            <li><a href="#">Kanban</a></li>
          </ul>
      </nav>
    )
  }
});

module.exports = Header;