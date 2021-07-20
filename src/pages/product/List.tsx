import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Menu from '../../components/Nav';
import connection from '../../services/connection';
import ProductModal from './Modal';

export default function ProductListPage() {
 const [products, setProducts] = useState<Product[]>([]);
 const [modalProps, setModalProps] = useState<ProductModalProps>({
  show: false,
  defaultProduct: {
   job: -1,
   delivery: false,
   name: "",
   type: "Item",
   price: 0,
   unit: 1,
  }
 });

 useEffect(() => {
  handleUpdateList();
 }, []);

 //Atualiza a lista de produtos
 async function handleUpdateList() {
  await connection.get('products')
   .then((res) => {
    setProducts(res.data);
   })
   .catch(() => { });
 };

 async function callEditModal(p: Product) {
  setModalProps({
   defaultProduct: p,
   show: true,
  });
 };

 async function deleteProduct(p: Product) {
  await connection.delete(`products/delete?id=${p.id}`)
  .then(() => {
   handleUpdateList();
  })
  .catch(() => {});
 };

 function handleShowModal() {
  setModalProps({
   defaultProduct: {
    job: -1,
    delivery: false,
    name: "",
    type: "Item",
    price: 0,
    unit: 1,
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
    <Menu/>
  
   <ProductModal
    {...modalProps}
    onClose={handleHideModal}
    onFinish={async (p) => {
     //Se tiver o ID, quer dizer que é para alterar...

     if (p.id === undefined) {
      await connection.post('/products/create', p).then(() => { }).catch(() => { });
     } else {
      await connection.post('/products/update', p).then(() => { }).catch(() => { });
     }
     handleUpdateList();
    }}
   />
   <button onClick={handleShowModal}>Adicionar novo produto</button>
   <ul>
    {
     products.map((p, i) => {
      return (
       <li key={`products-${i}`}>
        <h3>{p.name} - R$ {p.price.toFixed(2)}</h3>
        <button onClick={() => callEditModal(p)}>Editar</button>
        <button onClick={() => deleteProduct(p)}>Excluir</button>
       </li>
      );
     })
    }
   </ul>
  </div>
 );
};