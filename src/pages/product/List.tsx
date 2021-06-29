import React, { useState } from 'react';
import ProductModal from './Modal';

export default function ProductListPage() {
 const [modalProps, setModalProps] = useState<ProductModalProps>({
  edit: false,
  show: false,
  defaultProduct: {
   job: -1,
   delivery: false,
   name: "",
   tag: "",
   type: "Item",
   price: 0,
   unit: 1,
  }
 });

 function handleShowModal() {
  setModalProps({
   ...modalProps,
   show: true,
  });
 };

 function handleHideModal() {
  setModalProps({
   ...modalProps,
   show: false,
  });
 };

 return(
  <div>
   <ProductModal
    {...modalProps}
    onClose={handleHideModal}
   />
   <button onClick={handleShowModal}>Adicionar</button>
   <ul>
   
   </ul>
  </div>
 );
};