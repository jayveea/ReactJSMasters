'use strict';
var React = require('react');
var ReactDOM = require('react-dom');

function Board(props){
    return(
        <div className="panel panel-primary">
            <div className="panel-heading">
                {props.title}
            </div>
            <div className="panel-body">
                {props.children}
            </div>
        </div>
    );
};

module.exports = Board;