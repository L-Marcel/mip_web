import React from "react";
import { Navbar, Container, Nav } from 'react-bootstrap';

export default function Menu() {
    return (



        <Navbar bg="dark" variant="dark" className="nav">
            <Container>
                <Navbar.Brand href="/"><p>Macau</p>
                    <h4><span className="danger">Independent</span> Points</h4></Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/">Inicio</Nav.Link>
                    <Nav.Link href="http://localhost:3000/products">Produtos</Nav.Link>
                  
                </Nav>
            </Container>
        </Navbar>

    );
};