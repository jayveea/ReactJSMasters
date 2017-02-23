import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import PrioritizedTaskList from '../tasks/prioritizedTaskList';
import TaskForm from '../tasks/taskForm';
import { ButtonToolbar, Overlay, Button, Popover, Navbar, Nav, NavItem } from 'react-bootstrap';

export default class Header extends React.PureComponent{
  constructor(){
    super();
    
    this.state = this.getInitialState();
    this.togglePriorityTasks = this.togglePriorityTasks.bind(this);
    this.toggleAddNewTask = this.toggleAddNewTask.bind(this);
    this.resetPopoverState = this.resetPopoverState.bind(this);
  }
  
  resetPopoverState(){
    this.setState({ showPriorityTasks : false, showAddNewTask : false });
  }

  getInitialState(){
    return { showPriorityTasks : false, showAddNewTask : false };
  }

  togglePriorityTasks(){
    this.setState({ showPriorityTasks : !this.state.showPriorityTasks });
  }

  toggleAddNewTask(){
    this.setState({ showAddNewTask : !this.state.showAddNewTask });
  }
  
  render() {
    const sharedProps = {
      show: this.state.showPriorityTasks,
      container: document.getElementById('divPriorityPopover'),
      target: () => ReactDOM.findDOMNode(this.refs.target)
    };

    const sharedAddNewProps = {
      show: this.state.showAddNewTask,
      container: document.getElementById('divAddNewPopover'),
      target: () => ReactDOM.findDOMNode(this.refs.target)
    };

    return (
        <Navbar inverse fluid >
          <Navbar.Header>
            <Nav>
              <NavItem eventKey={1} onClick={this.resetPopoverState}><Link to='/dashboard'>Dashboard</Link></NavItem>
              <NavItem eventKey={2} onClick={this.resetPopoverState}><Link to='/task'>Tasks</Link></NavItem>
              <NavItem eventKey={3} onClick={this.resetPopoverState}><Link to='/about'>About</Link></NavItem>
            </Nav>
            <Navbar.Toggle />
          </Navbar.Header>

          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem eventKey={4} onClick={this.toggleAddNewTask}>Add New Task
                <div>
                    <Overlay {...sharedAddNewProps} placement="bottom">
                      <div>
                        <TaskForm />
                      </div>
                    </Overlay>
                  </div>
              </NavItem>
              <NavItem eventKey={5} onClick={this.togglePriorityTasks}>Priority Tasks
                <div>
                    <Overlay {...sharedProps} placement="bottom">
                      <div>
                        <PrioritizedTaskList />
                      </div>
                    </Overlay>
                  </div>
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
    )
  }
};