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

  togglePriorityTasks(e){
    this.setState({ priorityTaskTarget: e.target, showPriorityTasks: !this.state.showPriorityTasks, showAddNewTask: false });
  }

  toggleAddNewTask(e){
    this.setState({ addTaskTarget: e.target, showAddNewTask : !this.state.showAddNewTask, showPriorityTasks: false });
  }
  
  render() {
    return (
        <Navbar inverse fluid >
          <Navbar.Header>
            <label className="label label-lg">Pomodoro</label>
            <Navbar.Toggle />
          </Navbar.Header>

          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1}><Link to='/dashboard'>Tomato Timer</Link></NavItem>
              <NavItem eventKey={2}><Link to='/task'>Tasks</Link></NavItem>
              <NavItem eventKey={3}><Link to='/Kanban'>Kanban</Link></NavItem>
            </Nav>
            <Nav pullRight>
              <NavItem eventKey={4} onClick={this.toggleAddNewTask}>Add New Task
                <div>
                  <Overlay
                    show={this.state.showAddNewTask}
                    target={this.state.addTaskTarget}
                    placement="bottom"
                    container={this}
                    containerPadding={20}
                    >
                      <Popover id="popover-addTask">
                        <TaskForm />
                      </Popover>
                  </Overlay>
                  </div>
              </NavItem>
              <NavItem eventKey={5} onClick={this.togglePriorityTasks}>Priority Tasks
                <div>
                    <Overlay
                      show={this.state.showPriorityTasks}
                      target={this.state.priorityTaskTarget}
                      placement="bottom"
                      container={this}
                      containerPadding={20}
                    >
                      <Popover id="popover-task">
                        <PrioritizedTaskList />
                      </Popover>
                    </Overlay>
                </div>
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
    )
  }
};