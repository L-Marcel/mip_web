import React, { ChangeEvent, useEffect, useState } from 'react';
import { Form, Modal, Row, Button } from 'react-bootstrap';

export default function UserModal(props: UserModalProps) {
    const [altSenha, setAltSenha] = useState<boolean>(false);
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
        setAltSenha(false);
    }, [props.show]);

    function changeUser(e: ChangeEvent<any>) {
        setUser({
            ...user,
            [e.currentTarget.name]: e.target.value
        });
    };

    return (
        <>
            <Modal
                show={props.show}
                onHide={props.onClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton aria-label="" closeLabel="">
                    <Modal.Title>{ user.id === undefined? "Adicionar usuário":"Atualizar usuário" }</Modal.Title>
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
                                    onChange={changeUser}
                                    placeholder={ user.id === undefined? "Informe o nome":"Informe o novo nome" }
                                />
                            </Form.Group>
                        </Row><Row className="mb-3 wrap-group">
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    name="email"
                                    autoComplete="off"
                                    value={user.email}
                                    onChange={changeUser}
                                    placeholder={ user.id === undefined? "Informe o e-mail":"Informe o novo e-mail" }
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
                                    placeholder={ user.id === undefined? "Informe o número":"Informe o novo número" }
                                />
                            </Form.Group>
                        </Row>
                        { user.id !== undefined && <Form.Group className="mb-3">
                            <Form.Check type="checkbox" checked={altSenha} label="Alterar senha" onChange={e => setAltSenha(e.currentTarget.checked)} />
                        </Form.Group> }
                        {
                            (altSenha === true || user.id === undefined) &&
                            <Form.Group className="mb-3">
                                <Form.Label>Senha</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    name="password"
                                    autoComplete="off"
                                    value={user.password}
                                    onChange={changeUser}
                                    placeholder={ user.id === undefined? "Informe a senha":"Informe a nova senha" }
                                />
                                <Form.Text className="text-muted">
                                    Guarde está senha, ela será usada para efetuar o login
                                </Form.Text>
                            </Form.Group>
                        }
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onClose}>
                        Fechar
                    </Button>
                    <Button variant="danger" onClick={() => {
                        if (props.onFinish && props.onClose) {
                            props.onFinish(user);
                            props.onClose();
                        }
                    }
                    }>Enviar</Button>
                </Modal.Footer>
            </Modal >
        </>
    );
};