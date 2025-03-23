import React, { useState } from "react";
import { Image, Navbar } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions, cartActions } from "../Store/redux";
import UserMenu from "./UserMenu";
import Cart from "./Cart";
import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";

const UserInterface = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const history = useHistory();
    const dispatch = useDispatch();
    const showCart = useSelector(state => state.cart.showCart);
    const menuItems = useSelector(state => state.menu.items);
    const adminMail = localStorage.getItem('adminMail').replace(/[.@]/g, '_');

    const filteredItems = menuItems.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const logoutHandler = () => {
        dispatch(authActions.logout());
        history.push('/');
    };

    const toggleCartHandler = () => {
        dispatch(cartActions.toggleCart());
    };

    const showOrderHandler = () => {
        history.push('/userorders');
    };

    return (
        <div style={{ position: "relative", width: "100%", height: "100vh" }}>
            <Navbar style={{ position: 'absolute', color: 'white', padding: '10px', width: '100%', display: 'flex', justifyContent: 'space-between', fontFamily: 'Cascadia Code Light', fontSize: '18px' }}>
                <div style={{ paddingLeft: '60px', paddingTop: '15px' }}>
                    <Image style={{ width: '7.5%' }} roundedCircle src="https://i.pinimg.com/736x/b0/5f/8d/b05f8d2080e9f42c50eaf81f1170d9cd.jpg" />
                    <div style={{ marginTop: '-6%' }}>
                        <SearchBar onSearch={setSearchTerm} />
                    </div>
                </div>
                <div style={{ color: 'whitesmoke', width: '25%', display: 'flex', gap: '10%', marginRight: '5%' }}>
                    <div onClick={showOrderHandler}>My Orders</div>
                    <div onClick={toggleCartHandler} style={{ fontSize: '20px', marginTop: '2.5%' }}>🛒</div>
                    <div style={{ marginTop: '2.5%' }}>|</div>
                    <div style={{ marginTop: '2.5%' }} onClick={logoutHandler}>Logout</div>
                    <NavLink to='/profile'><Image style={{ width: '50%', height: '80%', marginTop: '2.5%' }} src='https://i.pinimg.com/736x/be/94/e6/be94e6323f277445d135d5025c0d41d2.jpg' roundedCircle /></NavLink>
                </div>
            </Navbar>
            <div style={{ position: 'absolute', color: 'white', padding: '10px', marginTop: '5%', width: '100%', display: 'flex', justifyContent: 'space-between', fontFamily: 'Cascadia Code Light', fontSize: '18px' }}>
                <UserMenu />
            </div>
            <div style={{ position: 'absolute', marginTop: '15%', textAlign: "center", width: "80%" }}>
                {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                        <li key={item.id} style={{ fontSize: "20px", margin: "10px 0" }}>
                            {item.name}
                        </li>
                    ))
                ) : (
                    <p style={{ color: "gray" }}>No items found</p>
                )}
            </div>
            <div style={{ position: 'absolute' }}>
                {showCart && <Cart />}
            </div>
            <Image style={{ width: '100%', height: '700vh' }} src="https://i.pinimg.com/736x/db/e8/fa/dbe8fac33fce30410d98d47740cd150c.jpg" />
        </div>
    )
};

export default UserInterface;