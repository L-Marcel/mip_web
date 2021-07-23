import React, { ChangeEvent, useEffect, useState } from 'react';
import { Form, InputGroup, Modal, Row, Col, Button } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';

import connection from '../../services/connection';

export default function UserModal2(props: UserModalProps) {

    const [user, setUser] = useState<User>({
        name: "",
        email: "",
        password: "",
        phone: "",

    });
    useEffect(() => {
        setUser(props.defaultUser);
    }, [props.defaultUser]);
    
    useEffect(() => {
        setASenha(false);
    }, [props.show]);

    function changeUser(e: ChangeEvent<any>) {
        setUser({
            ...user,
            [e.currentTarget.name]: e.target.value
        });
    };
    function alterarSenha() {
        return (<Form.Group>
            <Form.Label>Senha</Form.Label>
            <Form.Control
                required
                type="text"
                name="password"
                value={user.password}
                onChange={changeUser}
            />
        </Form.Group>);
    }
    const [aSenha, setASenha] = useState<boolean>(false)


    return (
        <>

            <Modal
                show={props.show}
                onHide={props.onClose}
                backdrop="static"
                keyboard={false}

            >
                <Modal.Header closeButton aria-label="" closeLabel="">
                    <Modal.Title>Atualizar dados</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form onSubmit={e => e.preventDefault()}>
                        <Row className="mb-3 wrap-group">
                            <Form.Group >
                                <Form.Label>Nome</Form.Label>
                                <Form.Control
                                    value={user.name}
                                    name="name"
                                    type="text"
                                    onChange={changeUser}>
                                </Form.Control>
                            </Form.Group>
                        </Row><Row className="mb-3 wrap-group">
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    name="email"
                                    value={user.email}
                                    onChange={changeUser}
                                />
                            </Form.Group>
                        </Row><Row className="mb-3 wrap-group">

                            <Form.Group>
                                <Form.Label>Telefone</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    name="phone"
                                    value={user.phone}
                                    onChange={changeUser}
                                />
                            </Form.Group>
                        </Row>
                        <br />
                        <Button variant="dark" onClick={() => { setASenha(true) }}>Alterar senha</Button>
                        {
                            aSenha === true &&
                            <>
                                <br />
                                <Row className="mb-3 wrap-group">
                                    <Form.Group>
                                        <Form.Label>Senha</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            name="password"
                                            value={user.password}
                                            onChange={changeUser}
                                        />
                                        <Form.Text className="text-muted">
                                            Guarde está senha, ela será usada para efetuar o login
                                        </Form.Text>
                                    </Form.Group>
                                </Row>

                            </>
                        }




                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onClose}>
                        Fechar
                    </Button>
                    <Button variant="danger" onClick={() => {
                        if (props.onFinish && props.onClose) {
                            props.onFinish(user)
                            props.onClose();
                        }
                    }
                    }>Enviar</Button>
                </Modal.Footer>
            </Modal >

        </>
    );
};