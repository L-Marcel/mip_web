import React from 'react';
import { Link } from "react-router-dom";
import { useUser } from "../hooks/useUser";

export default function HomePage(){
 const { user } = useUser();
 
 return(
  <div>
   <h1>MIP</h1>
   <ul>
    <li><Link to="/products">Produtos</Link></li>
    <li><Link to="/users">Usuários</Link></li>
   </ul>
   <h5>{user?.email}</h5>
   <h5>{user?.name}</h5>
   <h5>{user?.phone}</h5>
  </div>
 );
};