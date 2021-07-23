import React, { useEffect, useState } from 'react';
import Menu from '../components/Menu';
import connection from '../../services/connection';
import ProductModal from './Modal';
import { Button, ListGroup, Container, ButtonGroup, ButtonToolbar } from 'react-bootstrap';

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
    <div>
      <Menu />
      <ProductModal
        {...modalProps}
        onClose={handleHideModal}
        onFinish={async (p) => {
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
                  </div>

                  <ButtonToolbar>
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
    </div>
  );
};