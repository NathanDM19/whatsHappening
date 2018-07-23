import React, { Component } from 'react';
import axios from 'axios';
import DescriptionShow from './DescriptionShow'
import DetailsShow from './DetailsShow'
import DatesShow from './DatesShow'
import Header from './Header'


const SERVER_URL = "https://api.predicthq.com/v1"
const BING_URL = "https://api.cognitive.microsoft.com/bing/v7.0/images/search"

function Footer() {
  return (
    <div className='footer'>
      &copy; 2018 What's Happening Pty Ltd
    </div>
  );
}

class Show extends Component {
  constructor(props) {
    super(props)
    this.state = {
      happening: {},
      description: {show: true, height: 70},
      details: {show: false, height: 50},
      dates: { show: false, height: 50 },
      imageUrl: ""
    }
    this.descriptionShow = this.descriptionShow.bind(this)
    this.detailsShow = this.detailsShow.bind(this)
    this.datesShow = this.datesShow.bind(this)
    
  }

  componentDidMount() {
    const fetchHappening = () => {
      axios.get(`${SERVER_URL}/events/?id=${this.props.match.params.id}`, { headers: { Authorization: "Bearer uhQc0hpHXJRWMCez6LLJ6dchEGARdi" } })  
        .then(response => {
          // console.log(response.data)
          let tempObject = {}
          let result = response.data.results[0]
          tempObject.latitude = result.location[1]
          tempObject.longitude = result.location[0]
          tempObject.happening_type = result.category
          tempObject.description = result.description
          tempObject.name = result.title
          tempObject.when = result.start
          tempObject.time = result.end
          tempObject.id = result.id
          this.setState({happening: tempObject})
          fetchImage(tempObject.name)
        })
    }
    const fetchImage = (query) => {
      axios.get(`${BING_URL}?q=${query}&minHeight=200&minWidth=400`, { headers: { "Ocp-Apim-Subscription-Key": "471bf23727964760bb9be36f73effb5a"}})
        .then(response => {
          // console.log(response.data)
        this.setState({imageUrl: response.data.value[0].contentUrl})
      })
    }
    fetchHappening()
  }

  descriptionShow() {
    this.setState({ description: { show: true, height: 70 }, details: { show: false, height: 50 }, dates: {show: false, height: 50}})
  }
  detailsShow() {
    this.setState({ description: { show: false, height: 50 }, details: { show: true, height: 70 }, dates: { show: false, height: 50 }})
  }
  datesShow() {
    this.setState({ description: { show: false, height: 50 }, details: { show: false, height: 50 }, dates: { show: true, height: 70 }})
  }

  render() {
    return (
      <div>
        <Header where="show" history={this.props.history}/>
        <div className="topShowDiv">
          <h2 className="showName">{this.state.happening.name}</h2>
        </div>  
        <div className="mainShowDiv">
          <div className="middleShowDiv">
            <div className="leftMiddleShowDiv">  
              <div className="placeholderImage">
                <img className="showImage" src={this.state.imageUrl}/>  
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
              {this.state.description.show ? <DescriptionShow  happening={this.state.happening}/> : null}
              {this.state.details.show ? <DetailsShow happening={this.state.happening}/> : null}
              {this.state.dates.show ? <DatesShow happening={this.state.happening}/> : null}  
              <div className="paddingBelow">
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Show