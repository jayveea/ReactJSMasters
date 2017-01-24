'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
import ReactBootstrap from 'react-bootstrap'; //code for importing react bootstrap

var Layout = require('./components/layout.js');
var Board = require('./components/board.js');
var Header = require('./components/header.js');
var Footer = require('./components/footer.js');

ReactDOM.render(
    <Layout>
        <Header />
        <Board>
            <div className='row'>
                <div className='col-md-12 subHeader'>
                    <h1>Hero</h1>
                </div>
                <div className='col-md-10 col-md-offset-1 section'>
                    <h1>Section</h1>
                </div>
                <div className='col-md-10 col-md-offset-1 card-section'>
                    <div className='col-md-3 card pull-left'>
                        <h1>Card</h1>
                    </div>
                    <div className='col-lg-1'>
                    </div>
                    <div className='col-md-3 card text-center'>
                        <h1>Card</h1>
                    </div>
                    <div className='col-md-3 card pull-right'>
                        <h1>Card</h1>
                    </div>
                </div>
            </div>
        </Board>
        <Footer />
    </Layout>, 
    document.getElementById('root')
);