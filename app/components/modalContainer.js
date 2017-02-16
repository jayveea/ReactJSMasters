import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {Modal, Button } from 'react-bootstrap';

export default class ModalContainer extends Component{
    
    componentWillMount(){
        this.setState({showModal: this.props.show});
    }

    componentWillReceiveProps(nextProps){
        this.setState({ showModal: nextProps.show });
    }

    render() {
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
};

ModalContainer.propTypes = {
    title: React.PropTypes.string.isRequired, 
    show: React.PropTypes.bool.isRequired,
    close: React.PropTypes.func.isRequired,
    save: React.PropTypes.func.isRequired
};