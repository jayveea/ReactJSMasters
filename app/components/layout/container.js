import React from 'react';
import ReactDOM from 'react-dom';
import Header from './header.js';
import Layout from './layout.js';

export default class Container extends React.PureComponent{
    render(){
        return( 
            <div>
                <Header />
                <Layout>
                    {this.props.children}
                </Layout>
            </div>
        );
    }
};