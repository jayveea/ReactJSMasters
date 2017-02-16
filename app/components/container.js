import React from 'react';
import ReactDOM from 'react-dom';
import Header from './header.js';

export default class Container extends React.PureComponent{
    render(){
        return( 
            <div>
                <Header />
                {this.props.children}
            </div>
        );
    }
};