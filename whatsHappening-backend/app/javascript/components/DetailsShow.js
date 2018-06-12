import React, { Component } from 'react';

class DetailsShow extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="bottomShow">
        <p>Address: {this.props.happening.address}</p>
      </div>
    )
  }
}

export default DetailsShow