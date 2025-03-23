import React, { useEffect, useState } from "react";
import { Button, Card, Container, Image, Navbar } from "react-bootstrap";
import ProfileForm from "./ProfileForm";
import { NavLink } from "react-router-dom";
import "./Profile.css";
import { useDispatch, useSelector } from "react-redux";
import { profileActions } from "../Store/redux";

const Profile = () => {
    const [showProfileForm, setShowProfileForm] = useState(false);
    const [showIndication, setShowIndication] = useState(true);

    const details = useSelector(state => state.profile.details);
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
            // setEnteredName(user.displayName);
            // setEnteredURL(user.photoUrl);
            // console.log(enteredName);
            // console.log(enteredURL);
            const user = data.users[0];

            dispatch(profileActions.addDetails({
                username: user.displayName,
                photoUrl: user.photoUrl,
                summary: user.summary,
                phoneNumber: user.phoneNumber,
                mail: user.email,
            }));
        }).catch(err => {
            console.log(err);
        })
    }, [token]);

    const showProfileFormHandler = () => {
        setShowProfileForm(true);
    };

    const closeProfileHandler = () => {
        setShowProfileForm(false);
    };

    const showIndicationHandler = () => {
        setShowIndication(false);
    };

    return (
        <div>
            <Navbar className="header" style={{ position: "fixed", top: "0", left: "0", width: "100%", zIndex: "1000", backgroundColor: "gray", color: "whitesmoke", display: 'flex', justifyContent: 'space-between' }}>
                <NavLink to='/users' style={{ color: 'white', textDecoration: 'none', fontSize: '30px', marginLeft: '1rem', marginTop: '-0.5rem' }}>←</NavLink>
                {showIndication && <div style={{ backgroundColor: "bisque", color: "black", borderRadius: "10px", padding: "7px", marginLeft: "-7%" }}>
                    <i>Your profile is incomplete. Complete Now by clicking on "Edit Profile".</i>
                </div>}
            </Navbar>
            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '-2%', width: '100%', fontFamily: 'Bahnschrift Light' }}>
                <Container>
                    <Card className="profileCard" style={{ height: '67%' }}>
                        <div>
                            <Image style={{ width: '10%', marginLeft: '3.5%', marginTop: '2%' }} src={details.photoUrl || "https://i.pinimg.com/736x/e1/e1/af/e1e1af3435004e297bc6067d2448f8e5.jpg"} roundedCircle />
                            <h1 className="username">{details.username || 'No UserName added'}</h1>
                            <p className="summary">{details.summary || 'No summary added.'}</p>
                            <Button onClick={showProfileFormHandler} style={{ marginLeft: '90%', marginTop: '-15%' }} variant="outline-dark">Edit Profile</Button>
                        </div>
                    </Card>
                </Container>
                <Container>
                    <Card style={{ width: '45%', height: '60%', marginTop: '6%' }}>
                        <h3 style={{ marginTop: '2%', marginLeft: '2%' }}>☎ Contact Details</h3>
                        <div style={{ marginTop: '2%', paddingBottom: '3%', marginLeft: '5%' }}>
                            <h5>Phone Number: {details.phoneNumber}</h5>
                            <h5>Email: {details.mail}</h5>
                        </div>
                    </Card>
                </Container>
            </div>
            {showProfileForm && <ProfileForm onUpdate={showIndicationHandler} onClose={closeProfileHandler} />}
        </div>
    )
};

export default Profile;