import React from 'react';
import ReactDOM from 'react-dom';

export default function Layout(props){
    return(
        <div className='container-fluid'>
            <div className="container">
                {props.children}
            </div>
        </div>
    );
};