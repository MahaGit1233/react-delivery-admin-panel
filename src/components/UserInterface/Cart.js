import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import './Cart.css';
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, ListGroup } from "react-bootstrap";
import { cartActions } from "../Store/redux";

const Backdrop2 = () => {
    const [showOrderForm, setShowOrderForm] = useState(false);
    const dispatch = useDispatch();
    const { cartItems, quantity, cartFetched } = useSelector((state) => state.cart);

    useEffect(() => {
        if (!cartFetched) {
            fetch('https://restaurant-delivery-app-10419-default-rtdb.firebaseio.com/cart.json', {
                method: 'GET',
            }).then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to fetch');
                }
                return res.json();
            }).then((data) => {
                const itemsArray = Object.values(data);
                itemsArray.forEach(item => {
                    dispatch(cartActions.addItemToCart(item));
                })
            }).catch(err => console.log(err));
        }
    }, [dispatch, cartFetched]);

    const orderHandler = async () => {
        if (cartItems.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        const loggedEmail = localStorage.getItem('email');

        const orderData = {
            items: cartItems,
            customer: loggedEmail.replace('_', '@').replace('_', '.'),
            totalPrice: cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
            status: "pending",
            timestamp: new Date().toISOString(),
        };

        try {
            const response = await fetch(`https://restaurant-delivery-app-10419-default-rtdb.firebaseio.com/orders/${loggedEmail}.json`, {
                method: 'POST',
                body: JSON.stringify(orderData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            console.log(data);

            if (!response.ok) {
                throw new Error('Failed to place order');
            }

            setShowOrderForm(true);
        } catch (error) {
            console.error("Error placing order:", error);
            alert("Something went wrong. Please try again.");
        }
    };

    const continueOrderHandler = () => {
        dispatch(cartActions.clearCart());
        dispatch(cartActions.toggleCart());
        alert('Order placed successfully! It will be delivered soon.');
        setShowOrderForm(false);
    };

    return (
        <div className="backdrop2" style={{ color: 'whitesmoke' }}>
            {!showOrderForm ? <div style={{ width: '70%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <h2>Your Cart ({quantity} items) </h2>
                    <div style={{ display: 'flex', gap: '5%', width: '25%' }}>
                        <Button variant="danger" onClick={() => dispatch(cartActions.toggleCart())}>Close Cart</Button>
                        <Button variant="danger" onClick={orderHandler}>Order</Button>
                    </div>
                </div>
                {cartItems.length === 0 ? (
                    <p>Cart is empty.</p>
                ) : (
                    <ListGroup>
                        {cartItems.map((item) => (
                            <Card style={{ width: '90%' }}>
                                <Card.Body>
                                    <Card.Title>{item.name}</Card.Title>
                                    <p>Price: ₹{item.price}</p>
                                    <p>Quantity: {item.quantity}</p>
                                    <div style={{ paddingLeft: '80%', marginTop: '-10%', display: 'flex', gap: '5%' }}>
                                        <Button variant="success" onClick={() => dispatch(cartActions.plus(item.name))}>+</Button>
                                        <Button variant="warning" onClick={() => dispatch(cartActions.minus(item.name))}>-</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        ))}
                    </ListGroup>
                )}
            </div> :
                <div>
                    <Card style={{ width: '50%', height: '25vh' }}>
                        <h2 style={{ paddingTop: '15px', paddingLeft: '15px' }}>Total Price: ₹{cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}</h2>
                        <h3 style={{ paddingLeft: '20px' }}>Payment Method:</h3>
                        <div style={{ paddingLeft: '45px' }}>
                            <input type="radio" /> Cash On Delivery
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'end', paddingRight: '15px' }}>
                            <Button variant="outline-dark" onClick={continueOrderHandler}>Continue Order</Button>
                        </div>
                    </Card>
                </div>}
        </div>
    );
};

const Cart = () => {
    return (
        <React.Fragment>
            {ReactDOM.createPortal(
                <Backdrop2 />, document.getElementById("backdrop-root2")
            )}
        </React.Fragment>
    )
}

export default Cart;
