import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const ItemsList = (props) => {
    const starters = props.items.filter(item => item.category === "Starters");
    const mainCourse = props.items.filter(item => item.category === "Main Course");
    const desserts = props.items.filter(item => item.category === "Dessert");

    return (
        <Container style={{ padding: "10px" }}>
            <h2>Starters:</h2>
            <Row>
                {starters.map((item) => (
                    <Col xs={3} key={item.id} style={{ marginBottom: '-5%', padding: "10px" }}>
                        <NavLink style={{ textDecoration: 'none', color: 'white' }} to={`/admin/starters/${item.name}`}>
                            <div style={{ textAlign: 'center', paddingBottom: '10px' }}>{item.name}</div>
                            <Image style={{ width: "90%", height: "60%" }} roundedCircle src={item.image} />
                        </NavLink>
                    </Col>
                ))}
            </Row>

            <h2>Main Course:</h2>
            <Row>
                {mainCourse.map((item) => (
                    <Col xs={3} key={item.id} style={{ marginBottom: '-5%', padding: "10px" }}>
                        <NavLink style={{ textDecoration: 'none', color: 'white' }} to={`/admin/maincourse/${item.name}`}>
                            <div style={{ textAlign: 'center', paddingBottom: '10px' }}>{item.name}</div>
                            <Image style={{ width: "90%", height: "60%" }} roundedCircle src={item.image} />
                        </NavLink>
                    </Col>
                ))}
            </Row>

            <h2>Dessert:</h2>
            <Row>
                {desserts.map((item) => (
                    <Col xs={3} key={item.id} style={{ marginBottom: '-5%', padding: "10px" }}>
                        <NavLink style={{ textDecoration: 'none', color: 'white' }} to={`/admin/desserts/${item.name}`}>
                            <div style={{ textAlign: 'center', paddingBottom: '10px' }}>{item.name}</div>
                            <Image style={{ width: "90%", height: "60%" }} roundedCircle src={item.image} />
                        </NavLink>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ItemsList;
