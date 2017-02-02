'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var Section = React.createClass({
  propTypes: {
        customClassName: React.PropTypes.string,
        title: React.PropTypes.string.isRequired
  },
  getClassName: function () {
        return 'row ' + this.props.customClassName;
  },
  render: function() {
    return (
      <div className={this.getClassName()}>
            <h2>{this.props.title}</h2>
        </div>
    )
  }
});

module.exports = Section;