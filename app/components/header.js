import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

export default class Header extends React.PureComponent{
  render() {
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
};