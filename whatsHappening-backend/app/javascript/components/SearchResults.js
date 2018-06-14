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
    latitude = this.props.latitude;
    longitude = this.props.longitude;
    proximity = this.props.proximity;

    const performSearch = () => {
      axios.get(`${serverUrlPrefix}/${ latitude }/${ longitude }/${ proximity }`)
        .then(response => {
          this.setState({ nearbyHappenings: response.data })
      })
    }
    performSearch();    
  }

  render() {
    return (
      <Map nearbyHappenings={ this.state.nearbyHappenings } latitude={ this.props.latitude } longitude={ this.props.longitude } proximity={ this.props.proximity } className='fullHeight' />
    );
  }
}

