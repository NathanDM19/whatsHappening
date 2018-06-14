import React from 'react';
import axios from 'axios';
import Map from './Map';

const mapboxAccessToken = 'pk.eyJ1IjoiZ3Jvb3RoZXdhbmRlcmVyIiwiYSI6ImNqaWI3MmQ2aTFmM3ozcG5iaGMzMW9oc3QifQ.CwYqjyg85TWZYLiwBxbg8w';
const mapboxUrlPrefix = 'https://api.mapbox.com/geocoding/v5/mapbox.places';
let latitude;
let longitude;
let proximity;
 
export default class SearchResults extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nearbyHappenings: {}
    }
  }

  componentDidMount() {
    const serverUrlPrefix = "http://localhost:3000/search"
    const predict = "https://api.predicthq.com/v1"
    latitude = this.props.latitude;
    longitude = this.props.longitude;
    proximity = this.props.proximity;

    const performSearch = () => {
      axios.get(`${serverUrlPrefix}/${ latitude }/${ longitude }/${ proximity }`)
        .then(response => {
          console.log(response.data)
          this.setState({ nearbyHappenings: response.data })
        })
    }
    const fetchPredict = () => {
      axios.get(`${predict}/events/?country=AU&within=${proximity}km@${latitude},${longitude}`, { headers: { Authorization: "Bearer wGTgFr7Ad0XF4eGGhnHdFPoksITNZJ" } } )
        .then(response => {
          console.log(response.data.results)
          let tempArray = this.state.nearbyHappenings
          for (let i = 0; i < response.data.results.length; i++) {
            let tempObject = {}
            let result = response.data.results[i]
            tempObject.latitude = result.location[1]
            tempObject.longitude = result.location[0]
            tempObject.happening_type = result.category
            tempObject.description = result.description
            tempObject.name = result.title
            tempObject.when = result.start
            tempObject.time = result.end // results.duration 
            tempArray.push(tempObject)
          }
          this.setState({nearbyHappenings: tempArray})
          })
      }
    fetchPredict()
    performSearch();    
  }

  render() {
    return (
      <Map nearbyHappenings={ this.state.nearbyHappenings } latitude={ this.props.latitude } longitude={ this.props.longitude } proximity={ this.props.proximity } />
    );
  }
}

