import React from "react";
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './footer.css';


function Footer() {

    return (
        <footer className="mt-5 footer">
            {/* <Container fluid={true}> */}
                <Row lg="auto" md="auto" sm="auto" className="justify-content-between">
                    {/* <Col className="p-0 d-flex justify-content-start"> */}
                    <Col xs={4} md={4} lg={4}>
                        Healthy U 
                    </Col>
                    {/* <Col className="p-0 d-flex justify-content-center"> */}
                    <Col xs={4} md={4} lg={4}>
                        {/* <img alt="logo" src="./images/healthy_u_logo22.png"></img> */}
                        <Image src="./images/healthy_u_logo22.png" alt="logo" fluid="false" />
                    </Col>
                    {/* // <Col className="p=0 d-flex justify-content-end"> */}
                    <Col xs={4} md={4} lg={4}>
                        Encouraging Better Health
                    </Col>
                </Row>
            {/* </Container> */}
        </footer>

    )
}


export default Footer;
