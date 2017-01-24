'use strict';
var React = require('react');
var ReactDOM = require('react-dom');

function Board(props){
    return(
        <div className='container-fluid body'>
            {props.children}
        </div>
    );
};

module.exports = Board;