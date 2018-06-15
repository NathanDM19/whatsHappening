import React from 'react'
import mapboxgl from 'mapbox-gl'
import ReactDOM from 'react-dom';
import '../styles/mapbox.css'

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

export default class Map extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      longitude: this.props.longitude,
      latitude: this.props.latitude,
      proximity: this.props.proximity,
      zoom: 12.5
    };
  }

  componentDidMount() {
    const { longitude, latitude, zoom } = this.state;

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [longitude, latitude],
      zoom
    });

    // map.on('move', (map) => {
    //   const { longitude, latitude } = map.getCenter();

    //   this.setState({
    //     longitude: longitude.toFixed(4),
    //     latitude: latitude.toFixed(4),
    //     zoom: map.getZoom().toFixed(2)
    //   });
    // });
  }

  render() {
    const { longitude, latitude, zoom } = this.state;

    return (
      <div className='fullHeight'>
        <div className="inline-block absolute top left mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
        </div>
        <div ref={el => this.mapContainer = el } className="absolute top right left bottom" />
      </div>
    );
  }
}
