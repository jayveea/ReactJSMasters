'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Modal = require('react-bootstrap').Modal;
var Button = require('react-bootstrap').Button;

var ModalContainer = React.createClass({
    propTypes: {
        title: React.PropTypes.string.isRequired, 
        show: React.PropTypes.bool.isRequired,
        close: React.PropTypes.func.isRequired,
        save: React.PropTypes.func.isRequired
    },
    componentWillMount: function(){
        this.setState({showModal: this.props.show});
    },
    componentWillReceiveProps: function(nextProps){
        this.setState({ showModal: nextProps.show });
    },
    render: function() {
        return (
            <Modal show={this.state.showModal} onHide={this.props.close}>
            <Modal.Header closeButton>
                <Modal.Title>{this.props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {this.props.children}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.props.save} className="btn btn-primary">Save</Button>
                <Button onClick={this.props.close} className="btn btn-default">Cancel</Button>
            </Modal.Footer>
        </Modal>
        )
    }
});

module.exports = ModalContainer;