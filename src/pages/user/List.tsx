import React, { useEffect, useState } from "react";
import { Menu } from "../components/Menu";
import UserAltModal from "./Modal";
import { Button, ListGroup, Container, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import connection from "../../services/connection";

export default function UserListPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [modalProps, setModalProps] = useState<UserModalProps>({
        show: false,
        defaultUser: {
            name: "",
            email: "",
            password: "",
            phone: "",
        }
    });

    useEffect(() => {
        handleUpdateList();
    }, []);

    async function handleUpdateList() {
        await connection.get('users')
            .then((res) => {
                for(let i in res.data){
                    res.data[i].password = undefined; 
                };
                setUsers(res.data);
            })
            .catch(() => { });
    };

    async function callEditModal(u: User) {
        setModalProps({
            defaultUser: u,
            show: true,
        });
    };

    async function deleteUser(u: User) {
        await connection.delete(`users/delete?id=${u.id}`)
            .then(() => {
                handleUpdateList();
            })
            .catch(() => { });
    };

    function handleShowModal() {
        setModalProps({
            defaultUser: {
                name: "",
                email: "",
                password: "",
                phone: "",
            },
            show: true,
        });
    };
    
    function handleHideModal() {
        setModalProps({
            ...modalProps,
            show: false,
        });
    };

    return (
        <div>
            <Menu />
            <UserAltModal
                {...modalProps}
                onClose={handleHideModal}
                onFinish={async (u) => {
                    //Se tiver o ID, quer dizer que é para alterar...

                    if (u.id === undefined) {
                        await connection.post('/users/create', u).then(() => {}).catch(() => { });
                    } else {
                        await connection.post('/users/update', u).then(() => {}).catch(() => { });
                    }
                    handleUpdateList();
                }}
            />
            <Container fluid className="page-with-menu">
                <ListGroup>
                {
                    users.map((u, i) => {
                    return (
                        <ListGroup.Item key={`products-${i}`}>
                            <div>
                                <h5 className="no-margin-bottom">{u.name} - {u.email}</h5>
                                <p className="margin-bottom">{u.phone}</p>
                            </div>

                            <ButtonToolbar>
                                <ButtonGroup className="me-2">
                                    <Button variant="secondary" onClick={() => callEditModal(u)} >Editar</Button>
                                </ButtonGroup>
                                { u.id !== undefined && u.id > 1 && <ButtonGroup>
                                    <Button variant="danger" onClick={() => deleteUser(u)} >Excluir</Button>
                                </ButtonGroup> }
                            </ButtonToolbar>
                        </ListGroup.Item>
                    );
                    })
                }
                <ListGroup.Item key={`products-add`}>
                    <Button onClick={handleShowModal} variant="danger">Adicionar novo usuário</Button>
                </ListGroup.Item>
                </ListGroup>
            </Container>
        </div>
    );
};



