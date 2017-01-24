'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var Header = React.createClass({
  render: function() {
    return (
        <div className='header'>
            <h1>Header</h1>
        </div>
    )
  }
});

module.exports = Header;