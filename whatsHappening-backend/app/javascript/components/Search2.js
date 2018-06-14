import React, { Component } from 'react';
import Header from './Header';
import SearchResults from './SearchResults';
import { Container, Row, Col, Badge, Button } from 'reactstrap';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';

function Footer() {
  return (
    <div className='footer'>
      &copy; 2018 What's Happening Pty Ltd
    </div>
  );
}
let map = ""

export default class Search extends Component {
  constructor(props) {
    super(props);

    // Default the map to Sydney
    this.state = {
      location: 'Sydney, NSW',
      latitude: -33.8688197,
      longitude: 151.20929550000005,
      proximity: 2,
      zoom: 13.5,
      nearbyHappenings: {},
      type: ""
    }

    this.createMap = this.createMap.bind(this);
    this.displayHappenings = this.displayHappenings.bind(this);
    this.setDetails = this.setDetails.bind(this)
    this.fetchPredict = this.fetchPredict.bind(this)
    this.searchArea = this.searchArea.bind(this)

    // Run fetch predict to seed the happenings for the default location
    this.fetchPredict()
    
    // Plot a marking for the center of the map
    this.markerColors = {
      default: '#d0d0d0',
      'school-holidays': '#ccccff',
      'public-holidays': '#cbaa5c',
      observances: '#ccffcc',
      politics: '#ff33ff',
      conferences: '#ff8000',
      expos: '#ffcccc',
      concerts: '#66cc00',
      festivals: '#0080ff',
      'performing-arts': '#ff3333',
      sports: '#ffff00',
      community: '#00cc00' 
    }
  }

  fetchPredict(longitude, latitude, type) {
    if (!longitude) {
      longitude = this.state.longitude;
      latitude = this.state.latitude;
      type = this.state.type;
    }
    let proximity = this.state.proximity;
    const predictUrlPrefix = "https://api.predicthq.com/v1"

    axios.get(`${predictUrlPrefix}/events/?country=AU&within=${proximity}km@${latitude},${longitude}&q=${type}&offset=0`, { headers: { Authorization: "Bearer wGTgFr7Ad0XF4eGGhnHdFPoksITNZJ" } })
      .then(response => {
        // console.log(response.data)
        let tempArray = [];
        for (let i = 0; i < response.data.results.length; i++) {
          let tempObject = {}
          let result = response.data.results[i]
          tempObject.latitude = result.location[1]
          tempObject.longitude = result.location[0]
          tempObject.happening_type = result.category
          tempObject.description = result.description
          tempObject.name = result.title
          tempArray.push(tempObject);
          console.log('Category : ', result.category);
        }
        // console.log(tempArray)
        this.setState({ nearbyHappenings: tempArray });
      })
    axios.get(`${predictUrlPrefix}/events/?country=AU&within=${proximity}km@${latitude},${longitude}&q=${type}&offset=10`, { headers: { Authorization: "Bearer wGTgFr7Ad0XF4eGGhnHdFPoksITNZJ" } })
      .then(response => {
        // console.log(response.data)
        let tempArray = this.state.nearbyHappenings;
        for (let i = 0; i < response.data.results.length; i++) {
          let tempObject = {}
          let result = response.data.results[i]
          tempObject.latitude = result.location[1]
          tempObject.longitude = result.location[0]
          tempObject.happening_type = result.category
          tempObject.description = result.description
          tempObject.name = result.title
          tempArray.push(tempObject);
        }
        console.log(tempArray)
        this.setState({ nearbyHappenings: tempArray });
      })
  }


  createMap() {
    if (this.mapContainer) {
      const { longitude, latitude, proximity, zoom } = this.state;
      map = new mapboxgl.Map({
        container: this.mapContainer,
        style: 'mapbox://styles/mapbox/streets-v10',
        center: [longitude, latitude],
        zoom
      });
      console.log(map)

      // Add the map control
      map.addControl(new mapboxgl.FullscreenControl());
      
      // Drop a default marker on the center of the map
      const marker = new mapboxgl.Marker({ color: this.markerColors['default'] })
        .setLngLat([longitude, latitude])
        .addTo(map);

      // Plot markings on map where happenings are
      if ( this.state.nearbyHappenings ) {
        this.state.nearbyHappenings.forEach(marker => 
          // const colorToUse = markerColors[marker.happening_type];
          new mapboxgl.Marker({ color: this.markerColors[marker.happening_type] })
            .setLngLat([marker.longitude, marker.latitude])
            .addTo(map)
        );
      }
      map.on('dragend', () => {
        document.getElementById('searchArea').style.display = "block"
        //   this.setState({ newSearch: true})
      })
    }

    return (
      <div>
        <div className="inline-block absolute top left mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
        </div>
        <div ref={el => this.mapContainer = el} className="absolute top right left bottom" />
      </div>
    );
  }

  displayHappenings() {
    let happeningsToDisplay = [];
    const numFound = this.state.nearbyHappenings.length;

    if( numFound > 0 ){
      let happeningRows = [];

      for( let i = 0; i < numFound; i++){
        const happening = this.state.nearbyHappenings[i];
        const type = happening.happening_type;
        const displayType = type.replace('-', ' ');

        happeningRows.push(<li className='panel' key={ i }>{ happening.name } <Badge className={ 'badge-' + type }>{ displayType }</Badge></li>);
        happeningRows.push(<li key={ 'desc-' + i } className='panel-desc'>{ happening.description }</li>);
      }

      happeningsToDisplay.push(<div className='happenings-container' key='container-1'><ul key='ul-1'>{ happeningRows }</ul></div>);
    } else {
      happeningsToDisplay.push(<p key='p-1'>No happenings found ... please search again</p>);
    }
    return happeningsToDisplay;
  }
  setDetails(latitude, longitude, type, location, locationType) {
    if (latitude !== undefined && longitude !== undefined) {
      location = location.split(",")
      if (locationType[0] === "postcode") {
        location = location[0] + "," + location[1]
      } else {
        location = location[0]
      }
      this.setState({ latitude, longitude, type, location });
    }
    this.fetchPredict(longitude, latitude, type);
  }
  searchArea() {
    this.setState({longitude: map.getCenter().lng, latitude: map.getCenter().lat})
    this.fetchPredict(map.getCenter().lng, map.getCenter().lat, this.state.type)
    document.getElementById('searchArea').style.display = "none"
  }

  render() {
    console.log(map);
    return (
      <Container fluid>
        <Row noGutters>
          <Col><Header history={this.props.history} newSearch={this.setDetails} /></Col>
        </Row>
          <Button id="searchArea" onClick={this.searchArea} className="newSearchButton">Search this area</Button>
        <Row noGutters>
          <Col lg="6">
            {this.createMap()}
          </Col>
          <Col lg="6" className='happenings-list'>
            {this.displayHappenings()}
          </Col>
        </Row>
        <Row noGutters>
          <Col><Footer /></Col>
        </Row>
      </Container>
    )
  }
}