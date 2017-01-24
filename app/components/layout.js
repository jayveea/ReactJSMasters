'use strict';
var React = require('react');
var ReactDOM = require('react-dom');

function Layout(props){
    return(
        <div className='container-fluid'>
            {props.children}
        </div>
    );
};

module.exports = Layout;