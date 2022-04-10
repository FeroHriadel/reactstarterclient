import React, { useContext } from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';



const MainNav: React.FC = () => {
  //VALUES
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();



  //PREVENT PAGE RELOAD WHEN BOOTSTRAP LINKS GET CLICKED
    //I will never ever ever use Bootstrap NavBar template again. You need the 'href' in <Nav.Link> for SEO, but you don't want to reload page on click. You cannot just remove the href and wrap it in <Link> because that would result in 2 <a>s wrapped inside each other. Never never never using Bootstrap Navbar template again. Not to mention the hooves you have to jump thru trying to move the links to the right.
  const preventReload = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      const elementHref = (e.currentTarget.attributes[0].value)
      navigate(elementHref);
  }



  //LOGOUT
  const logoutHandler = () => {
    logout();
  }



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
                    
                    <Nav.Link onClick={preventReload} href="/">Home</Nav.Link>
                    
                    <Nav.Link onClick={preventReload} href="/admin">Admin</Nav.Link>
                    
                    {
                        user && user.user && user.user.email
                        &&
                        <NavDropdown title="My Account" id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={preventReload} href="/userdetails">My details</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={logoutHandler}>Log out</NavDropdown.Item>
                        </NavDropdown>
                    }
                    
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