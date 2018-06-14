import React, { Component } from 'react';
import dateFormat from 'dateformat'

class DatesShow extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="bottomShow">
        <p>From: {dateFormat(this.props.happening.when, " HH:MM dddd, mmmm dS")}</p>
        <p>To: {dateFormat(this.props.happening.time, "HH:MM dddd, mmmm dS")}</p>
      </div>
    )
  }
}

export default DatesShow