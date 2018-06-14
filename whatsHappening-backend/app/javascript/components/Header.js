import React from 'react';
import {
  Collapse,
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


export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    
    this.state = {
      isOpen: false,
      user: {}
    };
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
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <Navbar color="light" light expand="lg">
        <NavbarBrand href="/#/">What's Happening?</NavbarBrand>
        <Nav className="ml-auto" navbar>
          {this.state.user ? 
            <NavItem>
              <NavLink className="inline floatRight" href="/logout">Logout</NavLink>
              <NavLink className="inline floatRight" href="/#/profile">Profile</NavLink>
            </NavItem>
            : <NavLink href="/login">Login</NavLink>}
        </Nav>
      </Navbar>
    );
  }
}

