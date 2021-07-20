import React from "react";
import { Navbar, Container, Nav } from 'react-bootstrap';

export default function Menu() {
    return (

        <Navbar bg="dark" variant="dark" >
            <Container>
                <Navbar.Brand href="/">
                    <h1>M<span className="danger">I</span>P</h1></Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/">Inicio</Nav.Link>
                    <Nav.Link href="http://localhost:3000/products">Produtos</Nav.Link>
                  
                </Nav>
            </Container>
        </Navbar>

    );
};