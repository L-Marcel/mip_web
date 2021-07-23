import React, { useEffect, useState } from "react";
import { Container, Col, Row, Nav } from 'react-bootstrap';
import { FaUserCog } from 'react-icons/fa';
import { useHistory, useLocation } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import connection from "../../services/connection";
import UserModal2 from "../user/Modal2";

export default function Menu() {
    const history = useHistory();
    const location = useLocation();

    const { user, setUser } = useUser();

    function logout() {
        setUser(undefined, false);
        sessionStorage.removeItem("mip@user");
    };
    const [modalProps, setModalProps] = useState<UserModalProps>({
        show: false,
        defaultUser: {
            name: "",
            email: "",
            password: "",
            phone: "",
        }
    });

    function handleHideModal() {
        setModalProps({
            ...modalProps,
            show: false,
        });
    };
    function handleShowModal() {
        if (user?.id !== undefined) {
            setModalProps({
                defaultUser: user,
                show: true,
            });
            ;
        }
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
                    <Nav.Item className={location.pathname === "/" ? "no-border-top-left" : ""}>
                        <UserModal2 {...modalProps}
                            onClose={handleHideModal}
                            onFinish={async (u) => {
                                await connection.post('/users/update', u).then(() => {
                                    setUser({
                                        id: u.id,
                                        name: u.name,
                                        email: u.email,
                                        phone: u.phone,
                                        //todos menos o passwkrd
                                    }, true);
                                }).catch(() => { });
                            }}

                        />
                        <Nav.Link active onClick={handleShowModal}
                        > <FaUserCog size={18}></FaUserCog>
                        </Nav.Link>
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
        </Container >
    );
};