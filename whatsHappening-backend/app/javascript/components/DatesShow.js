import React, { Component } from 'react';

class DatesShow extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="bottomShow">
        <p>When: {this.props.happening.when}</p>
        <p>Time: {this.props.happening.time}</p>
      </div>
    )
  }
}

export default DatesShow