'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var Footer = React.createClass({
  render: function() {
    return (
        <div className='navbar navbar-fixed-bottom footer'>
            <h1>Footer</h1>
        </div>
    )
  }
});

module.exports = Footer;