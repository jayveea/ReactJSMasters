import React from 'react';
import ReactDOM from 'react-dom';

export default function Board(props){
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