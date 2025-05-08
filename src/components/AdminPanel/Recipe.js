import React, { useState } from "react";
import { Button, Card, Container, Image, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { authActions, itemsActions } from "../Store/redux";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import AddItemsForm from "./AddItemsForm";

const Recipe = () => {
    const [showItemForm, setShowItemForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editItem, setEditItem] = useState(null);

    const history = useHistory();
    const dispatch = useDispatch();
    const adminMail = localStorage.getItem('adminMail').replace(/[.@]/g, '_');
    const { category, itemName } = useParams();
    const items = useSelector(state => state.items.items);
    console.log(items);
    const selectedItem = items.find(i => i.name.toLowerCase() === decodeURIComponent(itemName).toLowerCase());
    console.log(selectedItem.id);

    const logoutHandler = () => {
        dispatch(authActions.logout());
        history.push('/');
    };

    const showItemFormHandler = () => {
        setShowItemForm(true);
    };

    const startEditHandler = () => {
        setEditItem(selectedItem);
        setIsEditing(true);
    };

    const deleteHandler = (id) => {
        fetch(`https://restaurant-delivery-app-10419-default-rtdb.firebaseio.com/${adminMail}/${id}.json`, {
            method: 'DELETE',
        }).then(() => {
            dispatch(itemsActions.deleteItem(id));
            history.push('/admin');
        }).catch(err => console.log(err));
    };

    return (
        <div style={{ position: "relative", width: "100%", height: "100vh" }}>
            <Navbar style={{ position: 'absolute', color: 'white', padding: '10px', width: '100%', display: 'flex', justifyContent: 'space-between', fontFamily: 'Cascadia Code Light', fontSize: '18px' }}>
                <div style={{ paddingLeft: '60px', paddingTop: '15px' }}>
                    <Image style={{ width: '7.5%' }} roundedCircle src="https://i.pinimg.com/736x/b0/5f/8d/b05f8d2080e9f42c50eaf81f1170d9cd.jpg" />
                </div>
                <div style={{ color: 'whitesmoke', width: '20%', display: 'flex', gap: '15%', marginRight: '15%' }}>
                    <div onClick={showItemFormHandler}>Add Items</div>
                    <div>|</div>
                    <div onClick={logoutHandler}>Logout</div>
                </div>
            </Navbar>
            {isEditing ? <AddItemsForm existingItem={editItem} closeForm={() => setIsEditing(false)} onAddItem={(updatedItem) => {
                dispatch(itemsActions.updateItem(updatedItem));
                setIsEditing(false);
            }} /> : <div style={{ position: 'absolute', color: 'white', padding: '10px', marginTop: '5%', width: '100%', display: 'flex', justifyContent: 'space-between', fontFamily: 'Cascadia Code Light', fontSize: '18px' }}>
                <Card style={{ backgroundColor: 'rgba(249, 244, 244, 0.28)', marginLeft: '25%', color: 'whitesmoke' }}>
                    <Navbar>
                        <NavLink to='/admin' style={{ textDecoration: 'none', color: 'white', fontSize: '25px', paddingLeft: '20px' }}>←</NavLink>
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
                    <div style={{ marginLeft: '15%',paddingTop:'15px' }}>
                        <h3>Procedure:</h3>
                        <ul>{selectedItem.procedure}</ul>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '20px' }}>
                        <h3 style={{ marginLeft: '5%' }}>Price: ₹{selectedItem.price}</h3>
                        <div style={{ marginRight: '5%', display: 'flex', gap: '5%' }}>
                            <Button onClick={startEditHandler} variant="outline-light">Edit</Button>
                            <Button onClick={() => deleteHandler(selectedItem.id)} variant="outline-light">Delete</Button>
                        </div>
                    </div>
                </Card>
            </div>}
            <Image style={{ width: '100%', height: '300vh' }} src="https://i.pinimg.com/736x/db/e8/fa/dbe8fac33fce30410d98d47740cd150c.jpg" />
        </div>
    )
};

export default Recipe;