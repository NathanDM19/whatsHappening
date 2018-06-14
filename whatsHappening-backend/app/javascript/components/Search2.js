import React, {Component} from 'react';
import Header from './Header';
import SearchResults from './SearchResults';
import { Container, Row, Col } from 'reactstrap';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';

function Footer() {
  return (
    <div className='footer'>
      &copy; 2018 What's Happening Pty Ltd
    </div>
  );
}

export default class Search extends Component {
  constructor(props) {
    super(props);

    // Default the map to Sydney
    this.state = {
      location: 'Sydney, NSW',
      latitude: -33.8688197,
      longitude: 151.20929550000005,
      proximity: 15,
      zoom: 13.5,
      nearbyHappenings: {}
    }

    this.createMap = this.createMap.bind( this );
    this.displayHappenings = this.displayHappenings.bind( this );
  }

  componentDidMount() {
    const { longitude, latitude, proximity } = this.state;

    // Run default proximity query for events within 5km of default
    const serverUrlPrefix = "http://localhost:3000/search"
    const predictUrlPrefix = "https://api.predicthq.com/v1"

    const performSearch = () => {
      axios.get(`${serverUrlPrefix}/${ latitude }/${ longitude }/${ proximity }`)
        .then(response => {
          this.setState({ nearbyHappenings: response.data })                    
      })
    }

    const fetchPredict = () => {
      axios.get(`${predictUrlPrefix}/events/?country=AU&within=${proximity}km@${latitude},${longitude}`, { headers: { Authorization: "Bearer wGTgFr7Ad0XF4eGGhnHdFPoksITNZJ" } } )
        .then(response => {
          let tempArray = this.state.nearbyHappenings
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
          this.setState({nearbyHappenings: tempArray});
          })
      }
    fetchPredict()
    performSearch();
  }

  createMap () {    
    if ( this.mapContainer ){
      const { longitude, latitude, proximity, zoom } = this.state;

      const map = new mapboxgl.Map({
        container: this.mapContainer,
        style: 'mapbox://styles/mapbox/streets-v10',
        center: [longitude, latitude],
        zoom
      });
  
      // Add the map control
      map.addControl(new mapboxgl.FullscreenControl());
      
      // Plot a marking for the center of the map
      const marker = new mapboxgl.Marker()
        .setLngLat([longitude, latitude])
        .addTo(map);
    
      // Plot markings on map where happenings are
      if ( this.state.nearbyHappenings ) {
        this.state.nearbyHappenings.forEach(marker => 
          new mapboxgl.Marker()
            .setLngLat([marker.longitude, marker.latitude])
            .addTo(map)
        );
      }
    }

    return (
      <div className='bbb'>
        <div className="inline-block absolute top left mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
        </div>
        <div ref={el => this.mapContainer = el } className="absolute top right left bottom" />
      </div>
    );
  }

  displayHappenings(){
    let happeningsToDisplay = [];
    const numFound = this.state.nearbyHappenings.length;

    if( numFound > 0 ){
      // let happeningCols = [];
      let happeningRows = [];
      
      happeningsToDisplay.push(<h2 className='happenings-h2' key='h2-1'>We found <span className='happenings-h2-stats'> { numFound } </span> { numFound === 1 ? 'happening' : 'happenings' } in <span className='happenings-h2-stats'> { this.state.location } </span> that matched your search criteria</h2>);

      for( let i = 0; i < numFound; i++){
        // if( i % 1 === 0 && i > 0 ){
        //   happeningRows.push(<Row key={ 'row-' + i }>{ happeningCols }</Row>)
        //   happeningCols = [];
        // }
        const happening = this.state.nearbyHappenings[i];
        happeningRows.push(<li className='panel' key={ i }>{ happening.name }</li>);
        // happeningCols.push(<Col lg='12' key={ 'col-' + i } className='panel'><span key={ i }>{ happening.name }</span></Col>);
        happeningRows.push(<li key={ 'desc-' + i } className='panel-desc'>{ happening.description }</li>);
      }

      // if( happeningCols.length > 0 ){
        // happeningRows.push(<Row key={ 'row-' + numFound }>{ happeningCols }</Row>)
      // }

      happeningsToDisplay.push(<div className='happenings-container'><ul key='ul-1'>{ happeningRows }</ul></div>);
    } else {
      happeningsToDisplay.push(<p key='p-1'>No happenings found ... please search again</p>);
    }
    return happeningsToDisplay;
  }

  render() {
    return (
      <Container fluid>
        <Row noGutters>
          <Col><Header/></Col>
        </Row>
        <Row noGutters>
          <Col lg="6">
            { this.createMap() }
          </Col>
          <Col lg="6" className='happenings-list'>
            { this.displayHappenings() }
          </Col>
        </Row>
        <Row noGutters>
          <Col><Footer/></Col>
        </Row>
      </Container>
    )
  }
}