import React, { useEffect, useState } from "react";

const UserOrders = ({ userId }) => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch("https://restaurant-delivery-app-10419-default-rtdb.firebaseio.com/orders.json")
            .then(res => res.json())
            .then(data => {
                const userOrders = Object.entries(data).filter(([id, order]) => order.userId === userId);
                setOrders(userOrders);
            });
    }, [userId]);

    return (
        <div>
            <h2>Your Orders</h2>
            {orders.length === 0 ? <p>No orders placed yet.</p> : orders.map(([id, order]) => (
                <div key={id}>
                    <p><strong>Total:</strong> ${order.total}</p>
                    <p><strong>Status:</strong> {order.status}</p>
                </div>
            ))}
        </div>
    );
};

export default UserOrders;