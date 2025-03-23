import React, { useEffect, useState } from "react";
import { Col, Container, Image, Navbar, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Login from "./Login";
import { useDispatch } from "react-redux";
import { itemsActions } from "../Store/redux";

const categoriesArray = [
    { name: 'Starters', path: "/users/starters", image: 'https://i.pinimg.com/736x/27/e3/fa/27e3faaab02bdaef757a152f6fc157b5.jpg' },
    { name: 'Main Courses', path: "/users/maincourse", image: 'https://i.pinimg.com/736x/5c/0b/90/5c0b9065cfc8fe7ac68965528ea0c51d.jpg' },
    { name: 'Desserts', path: "/users/dessert", image: 'https://i.pinimg.com/736x/b3/19/75/b319752be7ed79bd7ffedd8036e997ca.jpg' },
];

const UserMenu = () => {
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
            const itemsArray = Object.values(data);
            dispatch(itemsActions.setItem(itemsArray));
        }).catch((err) => {
            console.log(err);
        })
    })

    const showLoginHandler = () => {
        setShowLogin(true);
    };

    const closeLoginHandler = () => {
        setShowLogin(false);
    };

    return (
        <div style={{ position: 'absolute', paddingTop: '10%', top: '100%', width: '80%', height: '60%', color: '#81ddf4', fontFamily: 'Cascadia Code Light', textAlign: 'center', marginLeft: '10%' }}>
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
    )
};

export default UserMenu;