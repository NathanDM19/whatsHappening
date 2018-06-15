import React, { Component } from 'react';
import dateFormat from 'dateformat'

class DatesShow extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="bottomShow">
        From: {dateFormat(this.props.happening.when, " HH:MM dddd, mmmm dS")}<br />
        To: {dateFormat(this.props.happening.time, "HH:MM dddd, mmmm dS")}
      </div>
    )
  }
}

export default DatesShow