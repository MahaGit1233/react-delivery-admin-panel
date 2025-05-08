import React, { useState } from "react";
import { Button, Card, Form, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const ForgotPassword = () => {
    const [enteredMail, setEnteredMail] = useState('');

    const mailChangeHandler = (event) => {
        setEnteredMail(event.target.value);
    }

    const forgotPasswordHandler = (event) => {
        event.preventDefault();

        fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDH-EyAyyknxTa5hCgJ-ZZEFnrKoB1K4Uw', {
            method: 'POST',
            body: JSON.stringify({
                requestType: 'PASSWORD_RESET',
                email: enteredMail,
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
            console.log(data.email);
        }).catch((err) => {
            alert(err.message);
        })
    }

    return (
        <Card className="card" style={{ width: '30%',marginLeft:'35%',marginTop:'10%' }}>
            <Card.Body className="cardbody">
                <Navbar className="header" style={{ position: "fixed", top: "0", left: "0", width: "100%", zIndex: "1000", backgroundColor: "gray", color: "whitesmoke" }}>
                    <NavLink to='/' style={{ color: 'white', textDecoration: 'none', fontSize: '30px', marginLeft: '1rem', marginTop: '-0.5rem' }}>←</NavLink>
                </Navbar>
                <div className="signupform" style={{ marginTop: "5%" }}>
                    <Form style={{ marginLeft: '-100%' }}>
                        <Form.Group>
                            <Form.Label className="formlabel" style={{color:'black'}} >Enter your Email Id:</Form.Label>
                            <Form.Control className="forminput" style={{ backgroundColor: '#efebeb' }} type="email" placeholder="Enter your mail Id" value={enteredMail} onChange={mailChangeHandler} />
                        </Form.Group>
                        <div className="formBtn">
                            <Button onClick={forgotPasswordHandler} variant="outline-dark">Send Link</Button>
                        </div>
                    </Form>
                </div>
            </Card.Body>
        </Card>
    )
}

export default ForgotPassword;