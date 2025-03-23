import React, { useEffect, useState } from "react";

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch("https://restaurant-delivery-app-10419-default-rtdb.firebaseio.com/orders.json")
            .then(res => res.json())
            .then(data => setOrders(Object.entries(data)))
            .catch(err => console.error("Error fetching orders:", err));
    }, []);

    const updateOrderStatus = (orderId, newStatus) => {
        fetch(`https://restaurant-delivery-app-10419-default-rtdb.firebaseio.com/orders/${orderId}.json`, {
            method: "PATCH",
            body: JSON.stringify({ status: newStatus }),
        }).then(() => {
            setOrders(prevOrders => prevOrders.map(([id, order]) => id === orderId ? [id, { ...order, status: newStatus }] : [id, order]));
        });
    };

    return (
        <div>
            <h2>Admin Order Management</h2>
            {orders.map(([id, order]) => (
                <div key={id}>
                    <p><strong>Customer:</strong> {order.customer}</p>
                    <p><strong>Total:</strong> ${order.total}</p>
                    <p><strong>Status:</strong> {order.status}</p>
                    <button onClick={() => updateOrderStatus(id, "Delivered")}>Mark as Delivered</button>
                    <button onClick={() => updateOrderStatus(id, "Failed")}>Mark as Failed</button>
                </div>
            ))}
        </div>
    );
};

export default AdminOrders;