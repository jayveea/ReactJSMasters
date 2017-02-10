'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var TaskHeader = React.createClass({
  render: function() {
    return (
      <table className="table table-striped table-bordered"
                data-toggle="table"
                data-pagination="true"
                data-show-pagination-switch="true"
                data-sort-order="desc" 
                data-show-columns="true">
        <thead>
            <tr className="info">
                <th className="col-md-4">Task Details</th>
                <th className="col-md-3">Priority</th>
                <th className="col-md-3">Status</th>
                <th className="col-md-2"></th>
            </tr>
        </thead>
      </table>
    )
  }
});

module.exports = TaskHeader;