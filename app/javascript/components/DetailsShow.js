import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';

const mapboxAccessToken = 'pk.eyJ1IjoiZ3Jvb3RoZXdhbmRlcmVyIiwiYSI6ImNqaWI3MmQ2aTFmM3ozcG5iaGMzMW9oc3QifQ.CwYqjyg85TWZYLiwBxbg8w';
const mapboxUrlPrefix = 'https://api.mapbox.com/geocoding/v5/mapbox.places';


class DetailsShow extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.createMap = this.createMap.bind(this)
    window.setTimeout(() => {this.createMap()}, 1)
  }
  componentDidMount() {
    axios.get(`${mapboxUrlPrefix}/${this.props.happening.longitude},${this.props.happening.latitude}.json?&access_token=${mapboxAccessToken}&country=AU&types=address`)
      .then(response => {
        this.setState({ address: response.data.features[0].place_name })
      })    
  }
  createMap() {
    if (this.mapContainer) {
      
      const { longitude, latitude } = this.props.happening;
      const map = new mapboxgl.Map({
        container: this.mapContainer,
        style: 'mapbox://styles/mapbox/streets-v10',
        center: [longitude, latitude],
        zoom: 15
      });

      // Add the map control
      map.addControl(new mapboxgl.FullscreenControl());

      // Drop a default marker on the center of the map
      const marker = new mapboxgl.Marker()
        .setLngLat([longitude, latitude])
        .addTo(map);
    }
    return (
      <div className="showMap">
        <div ref={el => this.mapContainer = el} style={{ height: "455px" }} className="absolute top right left bottom" />
      </div>
    );
  }
  render() {
    return (
      <div className="bottomShow">
        <p>Address: {this.state.address}</p>
        {this.createMap()}
      </div>
    )
  }
}

export default DetailsShow