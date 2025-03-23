import React, { useState } from "react";
import { Button, Card, Container, Image, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import store, { authActions, cartActions } from "../Store/redux";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import Cart from "./Cart";
import SearchBar from "./SearchBar";

const UsersRecipe = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const history = useHistory();
    const dispatch = useDispatch();
    const adminMail = localStorage.getItem('adminMail').replace(/[.@]/g, '_');
    const showCart = useSelector(state => state.cart.showCart);

    const logoutHandler = () => {
        dispatch(authActions.logout());
        history.push('/');
    };

    const toggleCartHandler = () => {
        dispatch(cartActions.toggleCart());
    };

    const addToCartHandler = (item) => {

        fetch('https://restaurant-delivery-app-10419-default-rtdb.firebaseio.com/cart.json', {
            method: 'PUT',
            body: JSON.stringify(item),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => {
            if (!res.ok) {
                throw new Error('Failed to post');
            }
            return res.json();
        }).then((data) => {
            dispatch(cartActions.addItemToCart(data));
        }).catch((err) => {
            console.log(err);
        });

    };

    const { category, itemName } = useParams();
    const items = useSelector(state => state.items.items);
    console.log(items);
    const selectedItem = items.find(i => i.name === itemName);
    console.log(selectedItem);

    return (
        <div style={{ position: "relative", width: "100%", height: "100vh" }}>
            <Navbar style={{ position: 'absolute', color: 'white', padding: '10px', width: '100%', display: 'flex', justifyContent: 'space-between', fontFamily: 'Cascadia Code Light', fontSize: '18px' }}>
                <div style={{ paddingLeft: '60px', paddingTop: '15px' }}>
                    <Image style={{ width: '7.5%' }} roundedCircle src="https://i.pinimg.com/736x/b0/5f/8d/b05f8d2080e9f42c50eaf81f1170d9cd.jpg" />
                    <div style={{marginTop:'-6%'}}>
                        <SearchBar onSearch={setSearchTerm} />
                    </div>
                </div>
                <div style={{ color: 'whitesmoke', width: '20%', display: 'flex', gap: '15%', marginRight: '15%' }}>
                    <div onClick={toggleCartHandler} style={{ fontSize: '20px' }}>🛒</div>
                    <div>|</div>
                    <div onClick={logoutHandler}>Logout</div>
                </div>
            </Navbar>
            <div style={{ position: 'absolute', color: 'white', padding: '10px', marginTop: '5%', width: '100%', display: 'flex', justifyContent: 'space-between', fontFamily: 'Cascadia Code Light', fontSize: '18px' }}>
                <Card style={{ backgroundColor: 'rgba(249, 244, 244, 0.28)', marginLeft: '25%', color: 'whitesmoke' }}>
                    <Navbar>
                        <NavLink to={`/users/${category}`} style={{ textDecoration: 'none', color: 'white', fontSize: '25px', paddingLeft: '20px' }}>←</NavLink>
                    </Navbar>
                    <h1 style={{ textAlign: 'center' }}>{selectedItem.category}</h1>
                    <div>
                        <div style={{ marginLeft: '15%' }}>
                            <h2>{selectedItem.name}</h2>
                            <Image src={selectedItem.image} roundedCircle style={{ width: '20%', height: '30%' }} />
                        </div>
                        <div style={{ marginLeft: '55%', marginTop: '-23%' }}>
                            <h3>Ingredients:</h3>
                            <ul>
                                {selectedItem.ingredients.split(', ').map((ingredient) => (
                                    <li>{ingredient}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '20px' }}>
                        <h3 style={{ marginLeft: '5%' }}>Price: ₹{selectedItem.price}</h3>
                        <div style={{ marginRight: '5%', display: 'flex', gap: '5%' }}>
                            <Button onClick={() => { addToCartHandler(selectedItem) }} variant="outline-light">Add to Cart</Button>
                        </div>
                    </div>
                </Card>
            </div>
            <div style={{ position: 'absolute' }}>
                {showCart && <Cart />}
            </div>
            <Image style={{ width: '100%', height: '700vh' }} src="https://i.pinimg.com/736x/db/e8/fa/dbe8fac33fce30410d98d47740cd150c.jpg" />
        </div>
    )
};

export default UsersRecipe;