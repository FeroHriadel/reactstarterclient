import React, { useContext, useEffect } from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';



const MainNav: React.FC = () => {
  //VALUES
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();



  //LOGOUT
  const logoutHandler = () => {
    logout();
  }


  //LOGGED-IN USER WATCHER



  //RENDER
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
            <Navbar.Brand>
                <Link to="/">LOGO</Link>
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#link">Link</Nav.Link>
                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                    {
                        user && user.user
                        ?
                        <Nav.Link onClick={logoutHandler}>Log out</Nav.Link>
                        :
                        <Nav.Link onClick={() => navigate('/login')}>Log in</Nav.Link>
                    }
                </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
  )
}

export default MainNav;