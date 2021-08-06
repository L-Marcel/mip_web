import React, { useCallback, useEffect, useState } from 'react';
import connection from '../../services/connection';
import ProductModal from './Modal';
import { Button, ListGroup, Container, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import { useUser } from '../../hooks/useUser';

export default function Products(props: ProductProps) {
  const { user, isAdm } = useUser();
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

  const handleUpdateList = useCallback(async() => {
    if(isAdm && props.job === undefined){
      await connection.get('products')
      .then((res) => {
        setProducts(res.data);
      })
      .catch(() => { });
    } else if(props.job !== undefined) {
      await connection.get(`products?job=${props.job}`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch(() => { });
    }
  }, [isAdm, props.job]);

  useEffect(() => {
    handleUpdateList();
  }, [handleUpdateList]);

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
      .catch(() => { });
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
    <>
      <ProductModal
        {...modalProps}
        onClose={handleHideModal}
        onFinish={async(p) => {
          if (p.id === undefined) {
            await connection.post('/products/create', p).then(() => { }).catch(() => { });
          } else {
            await connection.post('/products/update', p).then(() => { }).catch(() => { });
          }
          handleUpdateList();
        }}
      />
      <Container fluid className="page-with-menu">
        <ListGroup>
          {
            products.map((p, i) => {
              return (
                <ListGroup.Item key={`products-${i}`}>
                  <div>
                    <h5>{p.name} - R$ {p.price.toFixed(2)}</h5>
                    { p.description && <p className="margin-bottom">{p.description}</p> }
                  </div>

                  <ButtonToolbar>
                    {
                      <ButtonGroup className="me-2">
                        <Button variant="success" onClick={() => {
                          let u = user as User;
                          let name = u.name.includes(" ")? u.name.split(" "):u.name;
                          if(typeof name !== "string"){
                            name = name?.length > 1? (name[0] + name[1]):name[0];
                          };

                          let text = `Oi, me chamo ${name}. Gostaria de solicitar o seu ${p.type.toLowerCase()}:
                            ${p.name}
                          `.replace(" ", "%20");

                          window.open(`https://api.whatsapp.com/send?phone=${u.phone}&text=${text}`, "_blank")
                        }}>Solicitar</Button>
                      </ButtonGroup>
                    }
                    <ButtonGroup className="me-2">
                      <Button variant="secondary" onClick={() => callEditModal(p)} >Editar</Button>
                    </ButtonGroup>
                    <ButtonGroup>
                      <Button variant="danger" onClick={() => deleteProduct(p)} >Excluir</Button>
                    </ButtonGroup>
                  </ButtonToolbar>
                </ListGroup.Item>
              );
            })
          }
          <ListGroup.Item key={`products-add`}>
            <Button onClick={handleShowModal} variant="danger">Adicionar novo produto</Button>
          </ListGroup.Item>
        </ListGroup>
      </Container>
    </>
  );
};