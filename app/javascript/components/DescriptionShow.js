import React, { Component } from 'react';

class DescriptionShow extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="bottomShow">{this.props.happening.description}</div>
    )
  }
}

export default DescriptionShow