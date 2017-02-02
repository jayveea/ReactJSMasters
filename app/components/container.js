'use strict';
var React = require('react');
var ReactDOM = require('react-dom');
var Header = require('./header.js');

function Container(props){
    return(
        <div>
            <Header />
            {props.children}
        </div>
    );
};

module.exports = Container;