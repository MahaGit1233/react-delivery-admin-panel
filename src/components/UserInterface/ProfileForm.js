import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import ReactDOM from "react-dom";
import './ProfileForm.css';
import { useDispatch, useSelector } from "react-redux";
import { profileActions } from "../Store/redux";

const Backdrop1 = (props) => {
    const [enteredURL, setEnteredURL] = useState('');
    const [enteredName, setEnteredName] = useState('');
    const [enteredPhNo, setEnteredPhNo] = useState('');
    const [enteredSummary, setEnteredSummary] = useState('');

    const token = useSelector(state => state.auth.token);
    const dispatch = useDispatch();

    useEffect(() => {
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyA7C4ACvRyBZAw-sfFLXaKRhUnP86a6zMQ', {
            method: 'POST',
            body: JSON.stringify({
                idToken: token,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => {
            if (res.ok) {
                console.log(res.users);
                return res.json();
            }
            else {
                return res.json().then((data) => {
                    alert(data.error.message);
                    console.log(data.error.message);
                })
            }
        }).then((data) => {
            console.log(data.users);
            const user = data.users[0];
            setEnteredName(user.displayName);
            setEnteredURL(user.photoUrl);
            console.log(enteredName);
            console.log(enteredURL);
        }).catch(err => {
            console.log(err);
        })
    }, [token]);

    const nameChangeHandler = (event) => {
        setEnteredName(event.target.value);
    };

    const urlChangeHandler = (event) => {
        setEnteredURL(event.target.value);
    };

    const phNoChangeHandler = (event) => {
        setEnteredPhNo(event.target.value);
    };

    const summaryChangeHandler = (event) => {
        setEnteredSummary(event.target.value);
    };

    const submitHandler = (event) => {
        event.preventDefault();

        if (enteredName.length === 0 || enteredURL.length === 0 || enteredSummary.length === 0 || enteredPhNo.length === 0) {
            alert('Fill all the credentials');
        };

        fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyA7C4ACvRyBZAw-sfFLXaKRhUnP86a6zMQ', {
            method: 'POST',
            body: JSON.stringify({
                idToken: token,
                displayName: enteredName,
                photoUrl: enteredURL,
                deleteAttribute: [],
                returnSecureToken: true,
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((res) => {
            if (res.ok) {
                console.log('ok');
                return res.json();
            }
            else {
                return res.json().then((data) => {
                    alert(data.error.message);
                    console.log(data.error.message);
                })
            }
        }).then((data) => {
            console.log(data);
            console.log(data.idToken);
            dispatch(profileActions.addDetails({
                username: enteredName,
                photoUrl: enteredURL,
                summary: enteredSummary,
                phoneNumber: enteredPhNo,
                mail: data.email,
            }));
            localStorage.setItem('photoUrl', enteredURL);
            props.onClose();
        }).catch((err) => {
            alert(err.message);
        });

        setEnteredName('');
        setEnteredURL('');
        setEnteredSummary('');
        setEnteredPhNo('');
    };

    return (
        <div className="backdrop">
            <div className="profile">
                <div className="profilesignupform">
                    <Form className="profileform" onSubmit={submitHandler}>
                        <Form.Group>
                            <Form.Label className="formlabel">Username</Form.Label>
                            <Form.Control style={{ backgroundColor: '#efebeb' }} className="forminput" placeholder="Enter your name" type="text" value={enteredName} onChange={nameChangeHandler} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="formlabel">Profile Photo URL</Form.Label>
                            <Form.Control style={{ backgroundColor: '#efebeb' }} className="forminput" placeholder="Enter your profile url" type="url" value={enteredURL} onChange={urlChangeHandler} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="formlabel">Summary</Form.Label>
                            <Form.Control style={{ backgroundColor: '#efebeb' }} className="forminput" placeholder="Enter your bio" type="text" value={enteredSummary} onChange={summaryChangeHandler} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="formlabel">Phone Number</Form.Label>
                            <Form.Control style={{ backgroundColor: '#efebeb' }} className="forminput" placeholder="Enter your ph.no" type="number" value={enteredPhNo} onChange={phNoChangeHandler} />
                        </Form.Group>
                        <div className="formBtn" style={{ display: "flex", gap: "3%", flexDirection: 'row-reverse' }}>
                            <Button onClick={props.onUpdate} type="submit" variant="outline-dark" >Update</Button>
                            <Button onClick={props.onClose} variant="outline-dark" >Close</Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
};

const ProfileForm = (props) => {
    return (
        <React.Fragment>
            {ReactDOM.createPortal(
                <Backdrop1 onUpdate={props.onUpdate} onClose={props.onClose} />,
                document.getElementById("backdrop-root1")
            )}
        </React.Fragment>
    )
}

export default ProfileForm;