'use strict';

var React = require('react');

var TaskListItem = React.createClass({
    render: function () {
        return (
            <tr>
            <td>
                <p>{this.props.title}</p>
                <p>{this.props.description}</p>
            </td>
            <td>
                {this.props.priority}
            </td>
            <td>
                {this.props.status}
            </td>
            <td>
                <span></span>
            </td>
            </tr>
        )
    }
});

module.exports = TaskListItem;