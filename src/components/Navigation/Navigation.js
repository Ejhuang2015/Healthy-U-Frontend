import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.css';
import './Nav.css';
import MainNav from './main-nav';
import AuthNav from '../auth/auth-nav';

class Navigation extends Component {
    render () {
        return (
            <div className="navibar">
                <Navbar className="navibar" expand="lg" sticky="top" variant="light">
                    <Navbar.Brand href="/" className="heading">Healthy-U</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <MainNav />
                            <AuthNav />
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

export default Navigation;
