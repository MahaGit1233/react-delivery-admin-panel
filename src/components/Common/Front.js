import React, { useState } from "react";
import { Button, Image, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Login from "../UserInterface/Login";

const Front = () => {
    const [showLogin, setShowLogin] = useState(false);

    const showLoginHandler = () => {
        setShowLogin(true);
    };

    const closeLoginHandler=()=>{
        setShowLogin(false);
    };

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
            <div style={{ position: 'absolute', top: '30%', color: '#81ddf4', fontFamily: 'Cascadia Code Light', textAlign: 'center', marginLeft: '20%' }}>
                <h3>Welcome to RSR Delivery - Delicious Food, Delivered Fast!</h3>
                <h4 style={{ padding: '10px' }}>Craving Somehting Delicious?</h4>
                <ul style={{ listStyleType: 'none', padding: '10px' }}>
                    <li style={{ padding: '5px' }}>Fast & Reliable Delivery</li>
                    <li style={{ padding: '5px' }}>Fresh & Quality Ingredients</li>
                    <li style={{ padding: '5px' }}>Wide Variety of Choices</li>
                </ul>
                <Button style={{ color: 'yellow' }} variant="outline-dark">Order Now!</Button>
            </div>
            {showLogin && <Login closeLogin={closeLoginHandler} />}
            <Image style={{ width: '100%', height: '100vh' }} src="https://i.pinimg.com/736x/ce/ff/01/ceff01cc6a5d215b0dc232074f24a79e.jpg" />
        </div>
    )
};

export default Front;