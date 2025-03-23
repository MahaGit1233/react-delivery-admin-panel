import React, { useState } from "react";
import { Button, Col, Container, Image, Navbar, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Login from "../UserInterface/Login";

const Dessert = () => {
    const [showLogin, setShowLogin] = useState(false);

    const showLoginHandler = () => {
        setShowLogin(true);
    };

    const closeLoginHandler = () => {
        setShowLogin(false);
    };

    const items = useSelector(state => state.items.items);
    const desserts = items.filter(item => item.category === 'Dessert');

    return (
        <div style={{ position: "relative", width: "100%", height: "100vh" }}>
            <Navbar style={{ position: 'absolute', color: 'white', padding: '10px', width: '100%', display: 'flex', justifyContent: 'space-between', fontFamily: 'Cascadia Code Light', fontSize: '18px' }}>
                <div style={{ paddingLeft: '60px', paddingTop: '15px' }}>
                    <Image style={{ width: '7.5%' }} roundedCircle src="https://i.pinimg.com/736x/b0/5f/8d/b05f8d2080e9f42c50eaf81f1170d9cd.jpg" />
                </div>
                <div style={{ color: 'whitesmoke', display: 'flex', gap: '15%', marginRight: '15%' }}>
                    <NavLink style={{ textDecoration: 'none', color: 'whiteSmoke' }} to='/menu'>Menu</NavLink>
                    <div>|</div>
                    <div onClick={showLoginHandler}>Login</div>
                </div>
            </Navbar>
            <div style={{ position: 'absolute', marginTop: '-7%', top: '30%', width: '80%', height: '60%', color: '#81ddf4', fontFamily: 'Cascadia Code Light', textAlign: 'center', marginLeft: '10%' }}>
                <h1 style={{ color: 'whitesmoke', paddingBottom: '20px' }}>Desserts</h1>
                <Container style={{ color: 'whitesmoke' }}>
                    <Row>
                        {desserts.map((dessert) => (
                            <Col key={dessert.id} xs={3}>
                                <div style={{ paddingBottom: '10px' }}>{dessert.name}</div>
                                <Image style={{ width: '50%', height: '50%' }} roundedCircle src={dessert.image} />
                                <div style={{ paddingTop: '15px', display: 'flex', gap: '5%', justifyContent: 'center' }}>
                                    <Button onClick={showLoginHandler} variant="outline-info">See Recipe</Button>
                                    <Button onClick={showLoginHandler} variant="outline-info">Order</Button>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>
            {showLogin && <Login closeLogin={closeLoginHandler} />}
            <Image style={{ width: '100%', height: '300vh' }} src="https://i.pinimg.com/736x/ec/57/8c/ec578c2176de8dc4de0fc3170fbbb85e.jpg" />
        </div>
    )
};

export default Dessert;