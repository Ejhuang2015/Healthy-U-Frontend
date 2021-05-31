import React from "react";
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './footer.css';


function Footer() {
    return (
        <footer className="mt-auto footer">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col text-center"><p className="mb-0">Encouraging Better Health</p></div>
                    <div className="col text-center"><img src="./images/healthy_u_logo22.png" alt="logo" className="img-fluid" /></div>
                    <div className="col text-center"><p className="mb-0">© Healthy U 2021</p></div>
                </div>
            </div>
        </footer>
    )
}


export default Footer;
