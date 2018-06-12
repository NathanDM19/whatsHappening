import React, { Component } from 'react';
import axios from 'axios';
import MapGL, { NavigationControl } from 'react-map-gl'

const SERVER_URL = "https://api.predicthq.com/v1"
const TOKEN = "pk.eyJ1IjoibmF0aGFuZG0xOSIsImEiOiJjamliNDNuY3ExZTN6M3FwZmxnNjhkd3d5In0.tg6mrqeNeX5XujlPmN1V9Q"

class Test extends Component {

  constructor(props) {
    super(props)
    this.state = {
      viewport: {
        latitude: -34.1909,
        longitude: 150.9822,
        zoom: 20,
        bearing: 0,
        pitch: 0,
        width: 500,
        height: 500,
      }
    }
  }
  componentDidMount() {
    //   const fetchTest = () => {
    //       axios.get(`${SERVER_URL}/events/?q=festival&country=AU`, { headers: { Authorization: "Bearer wGTgFr7Ad0XF4eGGhnHdFPoksITNZJ" } } )
    //         .then(response => {
    //             console.log("done")
    //             console.log(response.data)
    //       })
    //   }
    // fetchTest()
    const fetchGeo = () => {
      axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/helensburgh.json?&access_token=${TOKEN}&country=AU`)
        .then(response => {
        console.log(response.data)
      })
    }
    fetchGeo()
  }
      
  render() {
    const { viewport } = this.state
    return (
      <MapGL {...viewport} mapboxApiAccessToken={TOKEN} mapStyle="mapbox://styles/mapbox/streets-v10">
        </MapGL>
      
    )
  }
}

export default Test