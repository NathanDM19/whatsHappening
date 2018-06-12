import React, { Component } from 'react';
import axios from 'axios';
import DescriptionShow from './DescriptionShow'
import DetailsShow from './DetailsShow'
import DatesShow from './DatesShow'


const SERVER_URL = "http://localhost:3000/happenings/"

class Show extends Component {
  constructor(props) {
    super(props)
    this.state = {
      happening: {},
      description: {show: true, height: 70},
      details: {show: false, height: 50},
      dates: {show: false, height: 50}
    }
    this.descriptionShow = this.descriptionShow.bind(this)
    this.detailsShow = this.detailsShow.bind(this)
    this.datesShow = this.datesShow.bind(this)
    
  }

  componentDidMount() {
    const fetchHappening = () => {
      axios.get(`${SERVER_URL}${this.props.match.params.id}.json`)
        .then(response => {
          console.log("done")
          this.setState({happening: response.data})
        })
    }
    fetchHappening()
  }

  descriptionShow() {
    console.log("description")
    this.setState({ description: { show: true, height: 70 }, details: { show: false, height: 50 }, dates: {show: false, height: 50}})
  }
  detailsShow() {
    console.log("details")    
    this.setState({ description: { show: false, height: 50 }, details: { show: true, height: 70 }, dates: { show: false, height: 50 }})
  }
  datesShow() {
    console.log("dates")    
    this.setState({ description: { show: false, height: 50 }, details: { show: false, height: 50 }, dates: { show: true, height: 70 }})
  }

  render() {
    return (
      <div>
        <div className="topShowDiv">
          <h2>{this.state.happening.name}</h2>
          <p>{this.state.happening.happening_type}, {this.state.happening.city}, {this.state.happening.when}</p>
        </div>  
        <div className="mainShowDiv">
          <div className="middleShowDiv">
            <div className="leftMiddleShowDiv">  
              <div className="placeholderImage">
              </div>
              <div onClick={this.descriptionShow} style={{ height: `${this.state.description.height}px` }} className="rectangles rectangle1">
                Description
              </div>  
              <div onClick={this.detailsShow} style={{ height: `${this.state.details.height}px` }}  className="rectangles rectangle2">
                Details
              </div>  
              <div onClick={this.datesShow} style={{ height: `${this.state.dates.height}px` }}  className="rectangles rectangle3">
                Dates & Times
              </div>  
              {this.state.description.show ? <DescriptionShow happening={this.state.happening}/> : null}
              {this.state.details.show ? <DetailsShow happening={this.state.happening}/> : null}
              {this.state.dates.show ? <DatesShow happening={this.state.happening}/> : null}  
              <div className="paddingBelow">
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Show