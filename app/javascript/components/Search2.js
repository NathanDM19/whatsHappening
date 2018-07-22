import React, { Component } from 'react';
import Header from './Header';
import SearchResults from './SearchResults';
import { Container, Row, Col, Badge, Button } from 'reactstrap';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';
import dateFormat from 'dateformat'

function Footer() {
  return (
    <div className='footer'>
      &copy; 2018 What's Happening Pty Ltd
    </div>
  );
}
window.onresize = function () {
  document.getElementById('mainMap').style.height = `${window.innerHeight-110}px`
}
function createGeoJSON( inputHappenings ){
  let outputGeoJSON = {};

  if ( inputHappenings ) {
    // Initialise GeoJSON
    outputGeoJSON = {
      "id": "places",
      "type": "symbol",
      "source": {
        "type": "geojson",
        "data": {
          "type": "FeatureCollection",
          "features": []
        }
      }, // end source
      "layout": {
        "icon-image": "{icon}-11",
        "icon-allow-overlap": true
      } // end layout
    } // end let outputGeoJSON

    // Loop over each happenings passed as an argument and add to geoJSON
    inputHappenings.forEach(happening => 
      outputGeoJSON.source.data.features.push(
        {
          "type": "Feature",
          "properties": {
            "description": `${ happening.name }`,
            "icon": "circle"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [ 
              happening.longitude,
              happening.latitude
            ]
          }
        }
      ) // end features.push
    ); // end forEach
  } // end if ( inputHappenings )
  return outputGeoJSON;
} // end function createGeoJSON

let map = "";
let mapPopup = "";

export default class Search extends Component {
  constructor(props) {
    super(props);
    if (this.props.location.state) {
      console.log(this.props.location.state)
      if (this.props.location.state.locationType[0] === "postcode") {
        this.state = {
          location: this.props.location.state.location.split(",")[0]+this.props.location.state.location.split(",")[1],
          latitude: this.props.location.state.latitude,
          longitude: this.props.location.state.longitude,
          proximity: 2,
          zoom: 13.5,
          nearbyHappenings: {},
          type: this.props.location.state.type
        }
      } else if (this.props.location.state.locationType[0] === "locality") {
        this.state = {
          location: this.props.location.state.location.split(",")[0],
          latitude: this.props.location.state.latitude,
          longitude: this.props.location.state.longitude,
          proximity: 2,
          zoom: 13.5,
          nearbyHappenings: {},
          type: this.props.location.state.type
        }
      }
    } else {
      // Default the map to Sydney when the page is first loaded
      this.state = {
        location: 'Sydney, NSW',
        latitude: -33.8688197,
        longitude: 151.20929550000005,
        proximity: 2,
        zoom: 13.5,
        nearbyHappenings: {},
        type: ""
      }
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
  } // end constructor
  componentDidMount() {
  }
  fetchPredict(longitude, latitude, type) {
    if (!longitude && !type) {
      longitude = this.state.longitude;
      latitude = this.state.latitude;
      type = this.state.type;
    } else if (!longitude) {
      longitude = this.state.longitude;
      latitude = this.state.latitude;      
    }

    let maxRequests = 2;
    let offset = 0;
    let tempArray = [];

    let proximity = this.state.proximity;
    const predictUrlPrefix = "https://api.predicthq.com/v1"

    for ( let request = 0; request < maxRequests; request++ ){
      axios.get(`${predictUrlPrefix}/events/?country=AU&within=${proximity}km@${latitude},${longitude}&q=${type}&offset=${ offset }`, { headers: { Authorization: "Bearer uhQc0hpHXJRWMCez6LLJ6dchEGARdi" } })
        .then(response => {
          for (let i = 0; i < response.data.results.length; i++) {
            let result = response.data.results[i]

            // Exclude certain categories
            switch ( result.category ) {
              case "school-holidays":
              case "public-holidays":
              case "observances":
                continue;
            }

            let tempObject = {}
            tempObject.latitude = result.location[1]
            tempObject.longitude = result.location[0]
            tempObject.happening_type = result.category
            tempObject.description = result.description
            tempObject.name = result.title
            tempObject.when = result.start
            tempObject.time = result.end
            tempObject.id = result.id
            tempArray.push(tempObject);
          }
          this.setState({ nearbyHappenings: tempArray });
        });
      offset += 10;
    }
  } // end fetchPredict

  showMapPopup(lng, lat, description) {
    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
      offset: 30
    });

    const coordinates = [lng, lat];

    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(lng - coordinates[0]) > 180) {
      coordinates[0] += lng > coordinates[0] ? 360 : -360;
    }

    // Populate the popup and set its coordinates
    // based on the feature found.
    popup.setLngLat(coordinates)
      .setHTML(description)
      .addTo(map);

    mapPopup = popup;
  }

  removeMapPopup(popup) {
    popup.remove();
  }

  createMap() {
    if (this.mapContainer) {
      const { longitude, latitude, proximity, zoom } = this.state;

      // if(!map){
        map = new mapboxgl.Map({
          container: this.mapContainer,
          style: 'mapbox://styles/mapbox/streets-v10',
          center: [longitude, latitude],
          zoom
        });
        map.addControl(new mapboxgl.FullscreenControl());
        
        map.on('load', () => {
          // const geoJSON = 
          const geoJSON = createGeoJSON( this.state.nearbyHappenings );

          const popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false,
            offset: 30
          });

          // Add the new layer based on derived geoJSON
          map.addLayer( geoJSON );

          map.on('mouseenter', 'places', function(e) {
            // Change the cursor style as a UI indicator.
            map.getCanvas().style.cursor = 'pointer';
            const coordinates = e.features[0].geometry.coordinates.slice();
            const description = e.features[0].properties.description;

            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
              coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }
  
            // Populate the popup and set its coordinates
            // based on the feature found.
            popup.setLngLat(coordinates)
              .setHTML(description)
              .addTo(map);
          });

          map.on('mouseleave', 'places', function() {
            map.getCanvas().style.cursor = '';
            popup.remove();
          });
        }); // end map onLoad

      // Drop a default marker on the center of the map
      const marker = new mapboxgl.Marker({ color: this.markerColors['default'] })
        .setLngLat([longitude, latitude])
        .addTo(map);
      
      // Plot markings on map where happenings are
      if ( this.state.nearbyHappenings ) {
        this.state.nearbyHappenings.forEach(marker => 
          new mapboxgl.Marker({ color: this.markerColors[marker.happening_type] })
            .setLngLat([marker.longitude, marker.latitude])
            .addTo(map)
      )};

      // If the user drags the map we display a "Search This Area" button
      map.on('dragend', () => {
        document.getElementById('searchArea').style.display = "block"
      });
    } // end createMap
    let height = window.innerHeight - 110
    return (
      <div>
        <div className="inline-block absolute top left mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
        </div>
        <div ref={el => this.mapContainer = el} id="mainMap" style={{height: `${height}px`}}className="absolute top right left bottom" />
      </div>
    );
  }

  showPage(happening) {
    this.props.history.push(`happenings/${happening.id}`)
  }
  
  displayHappenings() {
    let happeningsToDisplay = [];
    const numFound = this.state.nearbyHappenings.length;

    if( numFound > 0 ){
      let happeningRows = [];

      happeningsToDisplay.push(<h2 className='happenings-h2' key='h2-1'>We found <span className='happenings-h2-stats'> { numFound } </span> { numFound === 1 ? 'happening' : 'happenings' } in <span className='happenings-h2-stats'> { this.state.location } </span> that matched your search criteria</h2>);

      for( let i = 0; i < numFound; i++){
        const happening = this.state.nearbyHappenings[i];
        const type = happening.happening_type;
        const displayType = type.replace('-', ' ');
        let date = dateFormat(happening.when, " HH:MM dddd, mmmm dS - ") + dateFormat(happening.time, "HH:MM dddd, mmmm dS")
        happeningRows.push(<li onClick={() => this.showPage(happening)} onMouseOver={() => this.showMapPopup( happening.longitude, happening.latitude, happening.name)} onMouseOut={() => this.removeMapPopup(mapPopup)}className='panel titles' key={i}>{happening.name} <Badge className={'badge-' + type}>{displayType}</Badge>
        <div className="panel-date">{date}</div></li>);
        happeningRows.push(<li onClick={() => this.showPage(happening)} onMouseOver={() => this.showMapPopup( happening.longitude, happening.latitude, happening.name)} onMouseOut={() => this.removeMapPopup(mapPopup)} key={ 'desc-' + i } className='panel-desc'>{ happening.description }</li>);
      }
      happeningsToDisplay.push(<div className='happenings-container' id="happeningsContainer" key='container-1'><ul key='ul-1'>{happeningRows}</ul></div>);
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
  getSuburb(longitude, latitude) {
    const mapboxAccessToken = 'pk.eyJ1IjoiZ3Jvb3RoZXdhbmRlcmVyIiwiYSI6ImNqaWI3MmQ2aTFmM3ozcG5iaGMzMW9oc3QifQ.CwYqjyg85TWZYLiwBxbg8w';
    const mapboxUrlPrefix = 'https://api.mapbox.com/geocoding/v5/mapbox.places';
    axios.get(`${mapboxUrlPrefix}/${longitude},${latitude}.json?&access_token=${mapboxAccessToken}&country=AU&types=locality`)
      .then(response => {
        this.setState({ location: response.data.features[0].place_name.split(",")[0] })
      })  
  }
  searchArea() {
    this.getSuburb(map.getCenter().lng, map.getCenter().lat)
    this.setState({ longitude: map.getCenter().lng, latitude: map.getCenter().lat, zoom: map.getZoom() })
    this.fetchPredict(map.getCenter().lng, map.getCenter().lat, this.state.type)
    document.getElementById('searchArea').style.display = "none"
  }

  render() {
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
            {this.state.nearbyHappenings.length > 5 ?
              <div className="bounce-down scroll-bottom">
                <i className="fas fa-angle-down"></i>
              </div> : null}
          </Col>
        </Row>
        <Row noGutters>
          <Col><Footer /></Col>
        </Row>
      </Container>
    )
  }
}