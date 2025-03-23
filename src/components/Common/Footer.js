import React from "react";
import { Image, Nav, Navbar } from "react-bootstrap";

const Footer = () => {
    return (
        <footer style={{ position: 'fixed', bottom: '0',height:'10vh', width: '100%', backgroundColor: '#56CCF2', padding: '1rem', textAlign: 'center', zIndex: 1000 }}>
            <Navbar style={{ backgroundColor: "#56CCF2" }}>
                <Navbar.Brand style={{ color: "white", fontFamily: "Times New Roman", padding: "1%", fontSize: "25px", marginLeft: "2%",marginTop:'-1.5%' }}>RSR Delivery</Navbar.Brand>
            </Navbar>
        </footer>
    )
}

export default Footer;