import React, { Component } from 'react';
import axios from 'axios';
import MapGL, { NavigationControl} from 'react-map-gl'
import mapboxgl from 'mapbox-gl/dist/mapbox-gl'

const SERVER_URL = "https://api.predicthq.com/v1"
const TOKEN = "pk.eyJ1IjoibmF0aGFuZG0xOSIsImEiOiJjamliNDNuY3ExZTN6M3FwZmxnNjhkd3d5In0.tg6mrqeNeX5XujlPmN1V9Q"

class Test extends Component {

  constructor(props) {
    super(props)
    this.state = {
      zoom: 8,
      viewport: {
        latitude: -34.1909,
        longitude: 150.9822,
        zoom: 8,
        bearing: 0,
        pitch: 0,
        width: 500,
        height: 500,
      }
    }
    this.test = this.test.bind(this)
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
  test(type) {
    let tempVar = this.state.zoom
    if (type === "+") {
      tempVar += 1;
      this.setState({ zoom: tempVar })
    } else if (type === "-") {
      tempVar -= 1;
      this.setState({ zoom: tempVar })
    }
  }
  render() {
    const { viewport } = this.state
    return (
      <div>
        <MapGL {...viewport} mapboxApiAccessToken={TOKEN} mapStyle="mapbox://styles/mapbox/streets-v10" InteractiveMap={true}>
   
        </MapGL>
      </div>  
    )
  }
  
}

export default Test