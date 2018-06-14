import React from 'react';
import {
  Button,
  Collapse,
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  Input,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import axios from 'axios';

const mapboxAccessToken = 'pk.eyJ1IjoiZ3Jvb3RoZXdhbmRlcmVyIiwiYSI6ImNqaWI3MmQ2aTFmM3ozcG5iaGMzMW9oc3QifQ.CwYqjyg85TWZYLiwBxbg8w';
const mapboxUrlPrefix = 'https://api.mapbox.com/geocoding/v5/mapbox.places';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: false,
      user: {},
      type: "",
      location: "",
      close5: [],
      newSearch: true
    };
    this.typeChange = this.typeChange.bind(this);
    this.locationChange = this.locationChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this)
    window.headerComponent = this;
  }
  componentDidMount() {
    const fetchUser = () => {
      axios.get(`http://localhost:3000/getuser.json`)
        .then(response => {
          this.setState({ user: response.data })
        })
    }
    fetchUser()
  }
  fetchGeo = query => {
    axios.get(`${mapboxUrlPrefix}/${query}.json?&access_token=${mapboxAccessToken}&country=AU&types=postcode,locality`)
      .then(response => {
        this.setState({ close5: response.data.features })
      })
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  fillSearch(place) {
    this.setState({ location: place.place_name, newSearch: false })
  }
  typeChange(event) {
    this.setState({type: event.target.value})
  }
  locationChange(event) {
    this.setState({ location: event.target.value })
    if (event.target.value.length >= 3) {
      this.fetchGeo(event.target.value)
    } else {
      this.setState({ newSearch: true })
    }
  }
  _handleSubmit() {
    event.preventDefault();
    let latitude;
    let longitude;
    const proximity = 3;
    let type = this.state.type
    let location = this.state.location;
    let locationType = ""

    if (this.state.close5.length > 0) {
      for (let i = 0; i < this.state.close5.length; i++) {
        if (this.state.close5[i].place_name === this.state.location) {
          const foundLocation = this.state.close5[i];
          longitude = foundLocation.center[0];
          latitude = foundLocation.center[1];
          locationType = foundLocation.place_type;
        }
      }
    }
    this.props.newSearch(latitude, longitude, type, location, locationType)
  }

  render() {
    return (
      <div className='site-header'>
        <Navbar color="light" light expand="lg">
          <NavbarBrand href="/#/">What's Happening?</NavbarBrand>
            <input type="text" className="typeHeader" onChange={this.typeChange}placeholder="All Happenings"></input>
          <p className="inline in">in</p>
          <input type="text" className="locationHeader" onChange={this.locationChange} placeholder="Location" value={this.state.location} ref={el => this.inputRef = el} ></input>
          <Button className="headerSearch btn-success btn-sm" onClick={this._handleSubmit}>Search</Button>
          <Nav className="ml-auto" navbar>
            {this.state.user ?
              <NavItem>
                <NavLink className="inline floatRight" href="/logout">Logout</NavLink>
                <NavLink className="inline floatRight" href="/#/profile">Profile</NavLink>
              </NavItem>
              : <NavLink href="/login">Login</NavLink>}
          </Nav>
        </Navbar>
        {this.state.location.length >= 3 && this.state.newSearch ?
          <span className="resultDropdownDiv" style={ {left: this.inputRef.offsetLeft + 'px'} }>
            {this.state.close5.map((place,index) =>
              <div key={ index } onClick={() => {
                this.fillSearch(place)
              }} className="resultDropdown">{place.place_name}</div>
            )}
          </span>
          : null}
      </div>
    );
  }
}
