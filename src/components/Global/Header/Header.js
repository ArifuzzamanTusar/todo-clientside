import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import Customlink from '../../Utilities/Customlink';
import { FaPowerOff } from "react-icons/fa";

import './Header.css'
import { signOut } from 'firebase/auth';
import auth from '../../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';

const Header = () => {
    const [user] = useAuthState(auth);
    const username = user?.displayName;

    const handleSignOut = () => {
        signOut(auth);
    }

    return (
        
            <Navbar collapseOnSelect expand="lg" className='bg-teal' sticky="top"  variant="dark">
                <Container className=''>
                    <Navbar.Brand >
                        <Customlink to={'/'}>TO DO </Customlink>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">


                        </Nav>
                        <Nav>
                            {
                                user ?
                                    <NavDropdown title={username ? "Welcome! " + username : "Welcome!"} id="collasible-nav-dropdown">

                                        <NavDropdown.Item > <Customlink to={'/'}>My Tasks</Customlink> </NavDropdown.Item>
                                        <NavDropdown.Divider />

                                        <div onClick={() => handleSignOut()} className="btn text-center text-white dropdown-item "><FaPowerOff /> Log Out</div>
                                    </NavDropdown>

                                    :
                                    <Link to={'/login'} className='btn btn-outline-light'> Get Started Now</Link>


                            }


                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
       
    );
};

export default Header;