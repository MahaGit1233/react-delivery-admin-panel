import React, { useEffect, useState } from "react";
import { Button, Card, Image } from "react-bootstrap";

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const color = {
        pending: 'orange',
        Delivered: 'green',
        Failed: 'red'
    };

    useEffect(() => {
        fetch("https://restaurant-delivery-app-10419-default-rtdb.firebaseio.com/orders.json")
            .then(res => res.json())
            .then(data => {
                if (!data || typeof data !== "object") {
                    console.error("Invalid data format:", data);
                    setOrders([]);
                    return;
                }
                console.log(data);

                const allOrders = Object.entries(data).flatMap(([userEmail, userOrders]) =>
                    userOrders && typeof userOrders === "object"
                        ? Object.entries(userOrders).map(([id, order]) => ({
                            id,
                            ...order
                        }))
                        : []
                );

                setOrders(allOrders);
            })
            .catch(err => console.error("Error fetching orders:", err));
    }, []);

    const updateOrderStatus = (orderId, newStatus) => {
        const orderToUpdate = orders.find(order => order.id === orderId);
        const loggedEmail = orderToUpdate.customer.replace(/[@.]/g, '_');
        console.log(loggedEmail);
        const updatedOrder = { ...orderToUpdate, status: newStatus };
        console.log(orderId);

        fetch(`https://restaurant-delivery-app-10419-default-rtdb.firebaseio.com/orders/${loggedEmail}/${orderId}.json`, {
            method: "PUT",
            body: JSON.stringify(updatedOrder),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(() => {
            setOrders(prevOrders => prevOrders.map((order) => order.id === orderId ? { ...order, status: newStatus } : order));
        });
    };

    return (
        <div style={{ position: "relative", width: "100%", height: "100vh" }}>
            <div style={{ position: 'absolute', width: "100%", height: "100vh" }}>
                <h2 style={{ textAlign: 'center', paddingTop: '15px', color: 'gray', fontFamily: 'cursive' }}>Admin Order Management</h2>
                {orders.map((order) => (
                    <Card key={order.id} style={{ width: '50%', marginLeft: '25%', borderRadius: '10px', marginBottom: '-2%' }}>
                        <p style={{ marginLeft: '3%', marginTop: '2%' }}><strong>Date:</strong> {order.timestamp}</p>
                        <div style={{ display: 'flex', gap: '15%', marginLeft: '15%' }}>
                            <div>
                                <p><strong>Customer:</strong> {order.customer}</p>
                                <p><strong>Total:</strong> ₹{order.totalPrice}</p>
                                <p><strong>Status:</strong> <span style={{ color: color[order.status] }}>{order.status}</span></p>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8%' }}>
                                <Button variant="success" onClick={() => updateOrderStatus(order.id, "Delivered")}>Mark as Delivered</Button>
                                <Button variant="danger" onClick={() => updateOrderStatus(order.id, "Failed")}>Mark as Failed</Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
            <Image style={{ width: '100%', height: '300vh' }} src="https://i.pinimg.com/736x/da/9f/81/da9f811bc56e10479b7fcc060629f2a2.jpg" />
        </div>
    );
};

export default AdminOrders;