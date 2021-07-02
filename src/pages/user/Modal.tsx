import React, { ChangeEvent, useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';

export default function UserModal(props: UserModalProps) {
    const [user, setUser] = useState<User>({
        name: "",
        email: "",
        password: "",
        phone: "",

    });

    useEffect(() => {
        setUser(props.defaultUser);
    }, [props.defaultUser]);

    function changeUser(e: ChangeEvent<any>) {
        setUser({
            ...user,
            [e.currentTarget.name]: e.target.value
        });
    };




    if (props.show) {
        return (
            <div className="background-modal">
                <div>
                    <div className="modal">
                        <div className="modal-header">
                            <h2>{user.id ? "Usuário existente" : "Novo Usuário"}</h2>
                            <button onClick={props.onClose}>
                                <FaTimes />
                            </button>
                        </div>
                        <form onSubmit={(e) => e.preventDefault()}>
                        <div className="form-group">
                                <label>
                                    Id<br />
                                    <h2>{user.id}</h2>
                                        
                                    
                                </label>
                            </div>
                            <div className="form-group">
                                <label>
                                    Nome<br />
                                    <input
                                        type="text" name="name"
                                        value={user.name} onChange={changeUser}
                                    />
                                </label>
                            </div>
                            <div className="form-group">
                                <label>
                                    Email<br />
                                   
                                    <input
                                        type="text" name="email"
                                        value={user.email} onChange={changeUser}
                                    />
                                </label>
                            </div>
                            <div className="form-group">
                                <label>
                                    Telefone<br />
                                    
                                    <input
                                        type="text" name="phone"
                                        value={user.phone} onChange={changeUser}
                                    />
                                </label>
                            </div>
                            <div className="form-group">
                                <label>
                                    Senha<br />
                                    <input
                                        type="password" name="password"
                                        value={user.password} onChange={changeUser}
                                    />
                                </label>
                            </div>
                        </form>
                    </div>
                    <button type="submit" onClick={() => {
                        if (props.onFinish && props.onClose) {
                            props.onFinish(user)
                            props.onClose();
                        }
                    }}>Salvar</button>
                </div>
            </div>
        );
    } else {
        return (null);
    };


};