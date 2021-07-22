import React from "react";
import { Container, Col, Row, Nav } from 'react-bootstrap';
import { FaUserCog } from 'react-icons/fa';
import { useHistory, useLocation } from "react-router-dom";
import { useUser } from "../../hooks/useUser";

export default function Menu() {
    const history = useHistory();
    const location = useLocation();

    const { user, setUser } = useUser();

    function logout() {
        setUser(undefined, false);
        sessionStorage.removeItem("mip@user");
    };

    return (
        <Container fluid className="menu">
            <Row>
                <Col id="info">
                    <Row>
                        <Col>
                            <h4>M<span className="danger">I</span>P - {user?.name}</h4>
                            <p>{user?.email} / {user?.phone}</p>
                        </Col>
                    </Row>
                </Col>
                <Col md={7}></Col>
            </Row>
            <Row>
            <Nav variant="pills" activeKey={location.pathname}>
                <Nav.Item className={location.pathname === "/"? "no-border-top-left":""}>
                    <Nav.Link active onClick={() => {
                        //é aqui onde o modal do usuário deve ser chamado
                        //não se esqueça que deve ter o id do usuário para poder atualizar
                    }}><FaUserCog size={18}></FaUserCog></Nav.Link>
                </Nav.Item>
                <Nav.Item className="no-border-top-left">
                    <Nav.Link eventKey="/" onClick={() => { 
                        history.push("/");  
                    }}>Mapa</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="/jobs" onClick={() => { 
                        history.push("/jobs");
                    }}>Meus trabalhos</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="exit" onClick={logout}>
                        Sair
                    </Nav.Link>
                </Nav.Item>
                </Nav>
            </Row>
        </Container>
    );
};