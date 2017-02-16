import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';

export default class Section extends Component{
  getClassName() {
        return 'row ' + this.props.customClassName;
  }

  render() {
    return (
      <div className={this.getClassName()}>
            <h2>{this.props.title}</h2>
        </div>
    )
  }
};

Section.propTypes= {
        customClassName: PropTypes.string,
        title: PropTypes.string.isRequired
};