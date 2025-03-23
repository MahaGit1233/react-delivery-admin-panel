import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./AddItemsForm.css";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { itemsActions } from "../Store/redux";

const Backdrop1 = (props) => {
    const [enteredItemName, setEnteredItemName] = useState('');
    const [enteredItemImage, setEnteredItemImage] = useState('');
    const [enteredItemCategory, setEnteredItemCategory] = useState('');
    const [enteredIngredients, setEnteredIngredients] = useState('');
    const [enteredPrice, setEnteredPrice] = useState('');
    const [item, setItem] = useState({
        name: "",
        ingredients: "",
        price: "",
        image: "",
    });

    const dispatch = useDispatch();

    useEffect(() => {
        if (props.existingItem) {
            setEnteredItemName(props.existingItem.name);
            setEnteredItemImage(props.existingItem.image);
            setEnteredItemCategory(props.existingItem.category);
            setEnteredIngredients(props.existingItem.ingredients);
            setEnteredPrice(props.existingItem.price);
        }
    }, [props.existingItem]);

    useEffect(() => {
        if (props.existingItem) {
            setItem(props.existingItem);
        }
    }, [props.existingItem]);

    const changeHandler = (e) => {
        setItem((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const itemNameHandler = (event) => {
        setEnteredItemName(event.target.value);
    };

    const itemImageHandler = (event) => {
        setEnteredItemImage(event.target.value);
    };

    const itemCategoryHandler = (event) => {
        setEnteredItemCategory(event.target.value);
    };

    const ingredientsHandler = (event) => {
        setEnteredIngredients(event.target.value);
    };

    const priceHandler = (event) => {
        setEnteredPrice(event.target.value);
    };

    const formSubmitHandler = (event) => {
        event.preventDefault();

        const updatedItem = {
            id: props.existingItem ? props.existingItem.id : Math.random(),
            name: enteredItemName,
            image: enteredItemImage,
            category: enteredItemCategory,
            ingredients: enteredIngredients,
            price: enteredPrice,
        };

        if (enteredItemName.length === 0 || enteredItemImage.length === 0 || enteredItemCategory === 0) {
            alert('Please fill all the fields');
        }
        if (props.existingItem) {
            dispatch(itemsActions.updateItem(updatedItem));
        } else {
            dispatch(itemsActions.addItem(updatedItem));
        }

        props.closeForm();

        setEnteredItemName('');
        setEnteredItemImage('');
        setEnteredItemCategory('');
        setEnteredIngredients('');
        setEnteredPrice('');
    };

    return (
        <div className="backdrop">
            <Form className="form1" onSubmit={formSubmitHandler}>
                <Form.Group>
                    <Form.Label className="formlabel">Item Name:</Form.Label>
                    <Form.Control style={{ backgroundColor: '#efebeb' }} className="forminput" type="text" value={enteredItemName} onChange={itemNameHandler} placeholder="Enter Item Name" />
                </Form.Group>
                <Form.Group>
                    <Form.Label className="formlabel">Image URL:</Form.Label>
                    <Form.Control style={{ backgroundColor: '#efebeb' }} className="forminput" type="url" value={enteredItemImage} onChange={itemImageHandler} placeholder="Enter Item Image" />
                </Form.Group>
                <Form.Group>
                    <Form.Label className="formlabel">Category:</Form.Label>
                    <Form.Select style={{ backgroundColor: '#efebeb' }} className="forminput" value={enteredItemCategory} onChange={itemCategoryHandler} >
                        <option value=''>--Select Category--</option>
                        <option>Starters</option>
                        <option>Main Course</option>
                        <option>Dessert</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Label className="formlabel">Ingredients:</Form.Label>
                    <Form.Control style={{ backgroundColor: '#efebeb' }} className="forminput" as="textarea" rows={5} value={enteredIngredients} onChange={ingredientsHandler} placeholder="Enter Ingredients" />
                </Form.Group>
                <Form.Group>
                    <Form.Label className="formlabel">Price:</Form.Label>
                    <Form.Control style={{ backgroundColor: '#efebeb' }} className="forminput" type="number" value={enteredPrice} onChange={priceHandler} placeholder="Enter Price" />
                </Form.Group>
                <div style={{ display: 'flex', flexDirection: 'row-reverse', gap: '20px', paddingTop: '10px' }}>
                    <Button type="submit" variant="outline-warning">{props.existingItem ? 'Update' : 'Add'}</Button>
                    <Button variant="outline-warning" onClick={props.closeForm}>Close</Button>
                </div>
            </Form>
        </div>
    )
};

const AddItemsForm = (props) => {
    return (
        <React.Fragment>
            {ReactDOM.createPortal(
                <Backdrop1 onAddItem={props.onAddItem} closeForm={props.closeForm} existingItem={props.existingItem} />, document.getElementById("backdrop-root1")
            )}
        </React.Fragment>
    )
}

export default AddItemsForm;