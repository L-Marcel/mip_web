import React from 'react';
import { Link } from "react-router-dom";
import Menu from '../components/Nav';
import { useUser } from "../hooks/useUser";

export default function HomePage() {
    const { user } = useUser();

    return (

        <div>
            <Menu />

            <Link to="/users">Usuários</Link>

            <h5>{user?.email}</h5>
            <h5>{user?.name}</h5>
            <h5>{user?.phone}</h5>
        </div>
       
    );
};