import React, { ChangeEvent, useEffect, useState } from 'react';
import { enumToStringArray, ProductType } from '../../enums';
import { FaTimes } from 'react-icons/fa';

export default function ProductModal(props: ProductModalProps) {
 const [product, setProduct] = useState<Product>({
  job: -1,
  delivery: false,
  name: "",
  tag: "",
  type: "Item",
  price: 0,
  unit: 1,
 });

 useEffect(() => {
  setProduct(props.defaultProduct);
 }, [props.defaultProduct]);

 function changeProduct(e: ChangeEvent<any>) {
  setProduct({
   ...product,
   [e.currentTarget.name]: e.target.value
  });
 };

 function changeProductDelivery(e: ChangeEvent<HTMLInputElement>) {
  setProduct({
   ...product,
   [e.currentTarget.name]: e.currentTarget.checked
  });
 };

 if(props.show){
  return (
   <div className="background-modal">
    <div>
     <div className="modal">
      <div className="modal-header">
       <h2>Novo produto</h2>
       <button onClick={props.onClose}>
        <FaTimes/>
       </button>
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
       <div className="form-group">
        <label>
         Tipo<br/>
         <select name="type" value={product.type} onChange={changeProduct}>
          {enumToStringArray(ProductType).map((v, i) => {
           return (
            <option key={`product-type-option-${i}`} value={v}>{v}</option>
           );
          })}
         </select>
        </label>
        <label>
         Nome<br/>
         <input 
          type="text" name="name" 
          placeholder={product.type === "Item"? "Ex: Bolo, brigadeiro, cadeira...":"Ex: Limpar um carro"}
          value={product.name} onChange={changeProduct}
         />
        </label>
       </div>
       <div className="form-group">
        <label>
         Tags<br/>
         <p>Separadas por vírgula</p>
         <input 
          type="text" name="tag" 
          placeholder="Ex: Aniversário, comida, festa..."
          value={product.tag} onChange={changeProduct}
         />
        </label>
        <label>
         Valor<br/>
         <p>Apenas em R$</p>
         <input 
          type="number" name="price" 
          value={product.price} onChange={changeProduct}
         />
        </label>
       </div>
       {
        product.type === "Item" && <div className="form-group">
         <label>
          Unidade<br/>
          <input 
           type="number" name="unit" 
           value={product.unit} onChange={changeProduct}
          />
         </label>
         <label>
          <input type="checkbox" name="delivery" checked={product.delivery} onChange={changeProductDelivery}/>
          Delivery
         </label>
        </div>
       }
       <label>
        Descrição<br/>
        <textarea name="description" value={product.description} onChange={changeProduct}/>
       </label>
      </form>
     </div>
     <button type="submit" onClick={() => props.onFinish? props.onFinish(product):null}>Salvar</button>
    </div>
   </div>
  );
 }else{
  return(null);
 };
};