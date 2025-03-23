import React, { useState } from "react";
import ReactDOM from "react-dom";
import './Login.css';
import { Alert, Button, Card, Form, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../Store/redux";
import { useHistory } from "react-router-dom";

const Backdrop = (props) => {
    const [enteredMail, setEnteredMail] = useState('');
    const [enteredPass, setEnteredPass] = useState('');
    const [enteredConfirmPass, setEnteredConfirmPass] = useState('');
    const [error, setError] = useState('');

    const history = useHistory();

    const isLogin = useSelector(state => state.auth.isLogin);
    const dispatch = useDispatch();

    const url = isLogin ? 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA7C4ACvRyBZAw-sfFLXaKRhUnP86a6zMQ' : 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA7C4ACvRyBZAw-sfFLXaKRhUnP86a6zMQ';

    const switchModeHandler = () => {
        dispatch(authActions.toggle());
    }

    const mailChangeHandler = (event) => {
        setEnteredMail(event.target.value);
    };

    const passChangeHandler = (event) => {
        setEnteredPass(event.target.value);
    };

    const confirmPassChangeHandler = (event) => {
        setEnteredConfirmPass(event.target.value);
    };

    const closeHandler = () => {
        props.closeLogin();
    }

    const formSubmitHandler = (event) => {
        event.preventDefault();

        if (!enteredMail || !enteredPass) {
            setError("All fields are required to be filled");
            return;
        };

        fetch('https://firestore.googleapis.com/v1/projects/restaurant-delivery-app-10419/databases/(default)/documents/admin/adminId').then((res) => {
            if (res.ok) {
                return res.json();
            }
            else {
                return res.json().then((data) => {
                    alert(data.error.message);
                })
            }
        }).then((data) => {
            console.log(data.fields.email.stringValue);
            localStorage.setItem('adminMail', data.fields.email.stringValue);
        }).catch((err) => {
            alert(err.message);
        })

        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: enteredMail,
                password: enteredPass,
                returnSecureToken: true,
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => {
            if (res.ok) {
                console.log('User has successfully signed up');
                return res.json();
            }
            else {
                return res.json().then((data) => {
                    alert(data.error.message);
                    console.log(data.error.message);
                })
            }
        }).then((data) => {
            localStorage.setItem('email', enteredMail.replace(/[@.]/g, '_'));
            if (isLogin) {
                dispatch(authActions.login({ token: data.idToken, userId: data.localId }));
            }
            else {
                dispatch(authActions.signup({ token: data.idToken, userId: data.localId }));
            }
            console.log(data);

            { enteredMail === localStorage.getItem('adminMail') ? history.push('/admin') : history.push('/users') };
        }).catch((err) => {
            alert(err.message);
        });

        setEnteredMail('');
        setEnteredPass('');
        setEnteredConfirmPass('');
        setError('');

        closeHandler();
    };

    const signup = <Form className="form" onSubmit={formSubmitHandler}>
        <h1>Register</h1>
        <Form.Group>
            <Form.Label className="loginFormlabel">Email Id:</Form.Label>
            <Form.Control style={{ backgroundColor: '#efebeb' }} className="loginForminput" type="email" value={enteredMail} onChange={mailChangeHandler} placeholder="Enter your mail Id" />
        </Form.Group>
        <Form.Group>
            <Form.Label className="loginFormlabel">Password:</Form.Label>
            <Form.Control style={{ backgroundColor: '#efebeb' }} className="loginForminput" type="password" value={enteredPass} onChange={passChangeHandler} placeholder="Enter Password" />
        </Form.Group>
        <Form.Group>
            <Form.Label className="loginFormlabel">Confirm Password:</Form.Label>
            <Form.Control style={{ backgroundColor: '#efebeb' }} className="loginForminput" type="password" value={enteredConfirmPass} onChange={confirmPassChangeHandler} placeholder="Confirm your Password" />
        </Form.Group>
        {error && <Alert variant="danger">{error}</Alert>}
        <div className="formBtn">
            <Button type="submit" variant="outline-dark">Sign Up</Button>
        </div>
    </Form>

    const login = <Form className="loginForm1" onSubmit={formSubmitHandler}>
        <Form.Group>
            <Form.Label className="loginFormlabel">Email Id:</Form.Label>
            <Form.Control style={{ backgroundColor: '#efebeb' }} className="loginForminput" type="email" value={enteredMail} onChange={mailChangeHandler} placeholder="Enter your mail Id" />
        </Form.Group>
        <Form.Group>
            <Form.Label className="loginFormlabel">Password:</Form.Label>
            <Form.Control style={{ backgroundColor: '#efebeb' }} className="loginForminput" type="password" value={enteredPass} onChange={passChangeHandler} placeholder="Enter your Password" />
        </Form.Group>
        <div className="formBtn">
            <div>
                <NavLink to="/forgot-password">Forgot Password</NavLink>
            </div>
            <Button type="submit" variant="outline-dark">Login</Button>
        </div>
    </Form>

    return (
        <div className="backdrop">
            <Navbar style={{ position: "fixed", top: "10px", left: "40px", width: "100%", zIndex: "1000", backgroundColor: "transparent", color: "whitesmoke" }}>
                <div onClick={props.closeLogin} style={{ textDecoration: 'none', color: 'white', fontSize: '30px' }}>←</div>
            </Navbar>
            <Card className="card">
                <Card.Body className="cardbody">
                    {!isLogin ? <div className="body">
                        <div className="bodyItems">
                            <h1>Welcome!</h1>
                            <h5>Sign up to create an account</h5>
                            <Button onClick={switchModeHandler} variant="outline-dark">{isLogin ? "Don't have an account? Sign up" : " Already have an account? Login"}</Button>
                        </div>
                    </div> :
                        <div className="body1">
                            <div className="bodyItems1">
                                <h1>Welcome Back!</h1>
                                <h5>Log In to proceed to your account</h5>
                                <Button onClick={switchModeHandler} variant="outline-dark">{isLogin ? "Don't have an account? Sign up" : " Already have an account? Login"}</Button>
                            </div>
                        </div>}
                    <div className="signupform">
                        {isLogin ? login : signup}
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

const Login = (props) => {
    return (
        <React.Fragment>
            {ReactDOM.createPortal(
                <Backdrop closeLogin={props.closeLogin} />, document.getElementById("backdrop-root")
            )}
        </React.Fragment>
    )
}

export default Login;