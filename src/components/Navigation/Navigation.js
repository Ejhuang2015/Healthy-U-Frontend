import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.css';
import './Nav.css';
import MainNav from '../main-nav';
import AuthNav from '../auth/auth-nav';
// import Form from 'react-bootstrap/Form';
// import FormControl from 'react-bootstrap/FormControl';
// import Button from 'react-bootstrap/Button';

class Navigation extends Component {
    render () {
        return (
            <div>
                <Navbar bg="success" expand="lg" sticky="top" variant="light">
                    <Navbar.Brand href="#home" className="heading">Healthy-U</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            {/* <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#link">Login</Nav.Link> */}
                            <MainNav />
                            <AuthNav />
                        </Nav>
                        {/* <Form inline>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                            <Button variant="outline-success">Search</Button>
                        </Form> */}
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

export default Navigation;
