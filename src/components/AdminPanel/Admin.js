import React, { useEffect, useState } from "react";
import { Image, Navbar } from "react-bootstrap";
import AddItemsForm from "./AddItemsForm";
import { useDispatch, useSelector } from "react-redux";
import { authActions, itemsActions } from "../Store/redux";
import { useHistory } from "react-router-dom";
import ItemsList from "./ItemsList";

const Admin = () => {
    const [showItemForm, setShowItemForm] = useState(false);

    const history = useHistory();
    const dispatch = useDispatch();
    const items = useSelector(state => state.items.items);
    const adminMail = localStorage.getItem('adminMail').replace(/[.@]/, '_');

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

    const logoutHandler = () => {
        dispatch(authActions.logout());
        history.push('/');
    };

    const showItemFormHandler = () => {
        setShowItemForm(true);
    };

    const closeItemformHandler = () => {
        setShowItemForm(false);
    };

    const addItemHandler = async (item) => {
        setShowItemForm(false);
        const response = await fetch(`https://restaurant-delivery-app-10419-default-rtdb.firebaseio.com/${adminMail}.json`, {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        console.log(data);
        dispatch(itemsActions.addItem(item))
    };

    const showOrderHandler = () => {
        history.push('/adminorders');
    };

    return (
        <div style={{ position: "relative", width: "100%", height: "100vh" }}>
            <Navbar style={{ position: 'absolute', color: 'white', padding: '10px', width: '100%', display: 'flex', justifyContent: 'space-between', fontFamily: 'Cascadia Code Light', fontSize: '18px' }}>
                <div style={{ paddingLeft: '60px', paddingTop: '15px' }}>
                    <Image style={{ width: '7.5%' }} roundedCircle src="https://i.pinimg.com/736x/b0/5f/8d/b05f8d2080e9f42c50eaf81f1170d9cd.jpg" />
                </div>
                <div style={{ color: 'whitesmoke', width: '20%', display: 'flex', gap: '15%', marginRight: '15%' }}>
                    <div onClick={showOrderHandler}>Orders</div>
                    <div onClick={showItemFormHandler}>Add Items</div>
                    <div>|</div>
                    <div onClick={logoutHandler}>Logout</div>
                </div>
            </Navbar>
            {showItemForm && <AddItemsForm onAddItem={addItemHandler} closeForm={closeItemformHandler} />}
            <div style={{ position: 'absolute', color: 'white', padding: '10px', marginTop: '5%', width: '100%', display: 'flex', justifyContent: 'space-between', fontFamily: 'Cascadia Code Light', fontSize: '18px' }}>
                <ItemsList items={items} />
            </div>
            <Image style={{ width: '100%', height: '700vh' }} src="https://i.pinimg.com/736x/db/e8/fa/dbe8fac33fce30410d98d47740cd150c.jpg" />
        </div>
    )
};

export default Admin;