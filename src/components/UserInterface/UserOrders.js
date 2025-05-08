import React, { useEffect, useState } from "react";
import { Card, Image } from "react-bootstrap";

const UserOrders = ({ userId }) => {
    const [orders, setOrders] = useState([]);
    const loggedEmail = localStorage.getItem('email');
    console.log(loggedEmail);
    const color = {
        pending: 'orange',
        Delivered: 'green',
        Failed: 'red'
    };

    useEffect(() => {
        fetch(`https://restaurant-delivery-app-10419-default-rtdb.firebaseio.com/orders/${loggedEmail}.json`)
            .then(res => res.json())
            .then(data => {
                const userOrders = Object.entries(data).filter(([id, order]) => order.userId === userId);
                setOrders(userOrders);
            });
    }, [userId]);

    return (
        <div style={{ position: "relative", width: "100%", height: "100vh" }}>
            <div style={{ position: 'absolute', width: '100%', height: '100vh' }}>
                <h2 style={{ textAlign: 'center', paddingTop: '15px', color: 'gray', fontFamily: 'cursive' }}>Your Orders</h2>
                {orders.length === 0 ? <p>No orders placed yet.</p> : orders.map(([id, order]) => (
                    <Card style={{ width: '40rem', marginLeft: '25rem', borderRadius: '10px', marginBottom: '-2.5%', fontFamily: 'Cascadia Code Light' }}>
                        <p style={{ marginLeft: '5%', marginTop: '2%' }}><strong>Date:</strong>{order.timestamp}</p>
                        <div style={{ display: 'flex', gap: '15%', marginLeft: '25%' }}>
                            <p><strong>Total:</strong> ${order.totalPrice}</p>
                            <p><strong>Status:</strong> <span style={{ color: color[order.status] }}>{order.status}</span></p>
                        </div>
                    </Card>
                ))}
            </div>
            <Image style={{ width: '100%', height: '300vh' }} src="https://i.pinimg.com/736x/da/9f/81/da9f811bc56e10479b7fcc060629f2a2.jpg" />
        </div>
    );
};

export default UserOrders;