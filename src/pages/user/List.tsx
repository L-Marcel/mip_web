import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import connection from "../../services/connection";
import UserModal from "./Modal";

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
                id: 0,
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
            <Link to="/">Voltar</Link><br />
            <UserModal
                {...modalProps}
                onClose={handleHideModal}
                onFinish={async (u) => {
                    //Se tiver o ID, quer dizer que é para alterar...

                    if (u.id === 0) {
                        await connection.post('/users/create', u).then(() => { }).catch(() => { });
                    } else {
                        await connection.post('/users/update', u).then(() => { }).catch(() => { });
                    }
                    handleUpdateList();
                }}
            />
            <button onClick={handleShowModal}>Adicionar</button>
            <ul>
                {
                    users.map((u, i) => {
                        return (
                            <li key={`users-${i}`}>
                                <h3>{u.id} - {u.name}</h3>
                                <button onClick={() => callEditModal(u)}>Editar</button>
                                <button onClick={() => deleteUser(u)}>Excluir</button>
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
};



