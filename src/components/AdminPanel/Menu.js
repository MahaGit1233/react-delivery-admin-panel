import React, { useEffect, useState } from "react";
import { Col, Container, Image, Navbar, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Login from "../UserInterface/Login";
import { useDispatch } from "react-redux";
import { itemsActions } from "../Store/redux";

const categoriesArray = [
    { name: 'Starters', path: "/menu/starters", image: 'https://i.pinimg.com/736x/27/e3/fa/27e3faaab02bdaef757a152f6fc157b5.jpg' },
    { name: 'Main Courses', path: "/menu/maincourse", image: 'https://i.pinimg.com/736x/5c/0b/90/5c0b9065cfc8fe7ac68965528ea0c51d.jpg' },
    { name: 'Desserts', path: "/menu/dessert", image: 'https://i.pinimg.com/736x/b3/19/75/b319752be7ed79bd7ffedd8036e997ca.jpg' },
];

const Menu = () => {
    const [showLogin, setShowLogin] = useState(false);

    const dispatch = useDispatch();
    const adminMail = localStorage.getItem('adminMail').replace(/[.@]/g, '_');

    useEffect(() => {
        fetch(`https://restaurant-delivery-app-10419-default-rtdb.firebaseio.com/${adminMail}.json`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            },
        }).then((res) => {
            if (!res.ok) {
                throw new Error("Failed to fetch items");
            }
            return res.json();
        }).then((data) => {
            console.log(data);
            const itemsArray = Object.values(data);
            dispatch(itemsActions.setItem(itemsArray));
        }).catch((err) => {
            console.log(err);
        })
    }, [dispatch]);

    const showLoginHandler = () => {
        setShowLogin(true);
    };

    const closeLoginHandler = () => {
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
            <div style={{ position: 'absolute', top: '30%', width: '80%', height: '60%', color: '#81ddf4', fontFamily: 'Cascadia Code Light', textAlign: 'center', marginLeft: '10%' }}>
                <Container>
                    <Row>
                        {categoriesArray.map((item) => (
                            <Col xs={4}>
                                <NavLink to={item.path} style={{ textDecoration: "none", color: "white" }}>
                                    <div style={{ color: 'white', fontSize: '20px', paddingBottom: '15px' }}>{item.name}</div>
                                    <Image style={{ width: '80%' }} roundedCircle src={item.image} />
                                </NavLink>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>
            {showLogin && <Login closeLogin={closeLoginHandler} />}
            <Image style={{ width: '100%', height: '100vh' }} src="https://i.pinimg.com/736x/ce/ff/01/ceff01cc6a5d215b0dc232074f24a79e.jpg" />
        </div>
    )
};

export default Menu;