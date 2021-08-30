import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import connection from '../../services/connection';
import ProductModal from './Modal';
import { Button, ListGroup, Container, ButtonGroup, ButtonToolbar, Form } from 'react-bootstrap';
import { useUser } from '../../hooks/useUser';
import { useLocation } from 'react-router-dom';

export default function Products(props: ProductProps) {
  let job = useLocation().state as Job | undefined;

  const { user, isAdm } = useUser();
  const [products, setProducts] = useState<Product[]>([]);
  const [productsResult, setProductsResult] = useState<Product[]>([]);
  const [search, setSearch] = useState<string>("");
  const [propriet, setPropriet] = useState<boolean>(false);
  const [modalProps, setModalProps] = useState<ProductModalProps>({
    show: false,
    defaultProduct: {
      job: job?.id || -1,
      delivery: false,
      name: "",
      type: "Item",
      price: 0,
      unit: 1,
    },
  });

  const handleUpdateList = useCallback(async () => {
    if (isAdm && job === undefined) {
      await connection.get('products')
        .then((res) => {
          setProducts(res.data);
          setProductsResult(res.data);
        })
        .catch(() => { });
    } else if (job !== undefined) {
      await connection.get(`products?job=${job.id}`)
        .then(async (res) => {
          setProducts(res.data);
        })
        .catch(() => { });
    }
  }, [isAdm, job]);

  useEffect(() => {
    handleUpdateList();;
  }, [handleUpdateList]);

  async function callEditModal(p: Product) {
    console.log(p);
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
        job: job?.id || -1,
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
  useEffect(() => {
    let _products = [...products].filter((p, i) => {
      if (p.name.includes(search)) {
        return true;
      }
      return false;
    });
    setProductsResult([..._products]);
  }, [products, search]);
  useEffect(() => {
    if (job?.user == user?.id) {
      setPropriet(true);
    }
  }, [productsResult, products])


  const ListInfo = () => {
    return (
      <>
        {props.title && <ListGroup.Item>
          <h1 className="job-info-title">{props.title}</h1>
        </ListGroup.Item>}
        <ListGroup.Item style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

          {products.length > 0 &&

            <div onDoubleClick={(e) => e.stopPropagation()}>
              <Form.Control
                type="text"
                name="search"
                value={search}
                placeholder="Pesquisar pelo nome"
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.currentTarget.value)}
              />
            </div>}
          {props.withinContainer && job !== undefined && propriet === true &&
            <Button key={`products-add`} onClick={handleShowModal} variant="danger">Adicionar novo produto</Button>
          }

        </ListGroup.Item>
        {products.length <= 0 && <ListGroup.Item>
          <p>Nenhum produto registrado</p>
        </ListGroup.Item>}

        {
          productsResult.map((p, i) => {
            return (
              <ListGroup.Item key={`products-${i}`}>
                <div>
                  <h5>{p.name} - R$ {p.price.toFixed(2)}</h5>
                  {p.description && <p className="margin-bottom">{p.description}</p>}
                </div>

                <ButtonToolbar>
                  <ButtonGroup className="me-2">
                    <Button variant="success" onClick={async () => {
                      let u = user as User;
                      let name = u.name.includes(" ") ? u.name.split(" ") : u.name;
                      if (typeof name !== "string") {
                        name = name?.length > 1 ? (name[0] + name[1]) : name[0];
                      };

                      let text = `Oi, me chamo ${name}. Gostaria de solicitar o seu ${p.type.toLowerCase()}:
                        ${p.name}
                      `.replace(" ", "%20");

                      let jobUser = await connection.get(`users?id=${p.user}`);

                      window.open(`https://api.whatsapp.com/send?phone=${jobUser?.data.phone}&text=${text}`, "_blank")
                    }}>Solicitar</Button>
                  </ButtonGroup>
                  <ButtonGroup>
                    {p.user !== undefined && p.user === user?.id && <Button variant="secondary" style={{ marginRight: 8 }} onClick={() => {
                      callEditModal({ ...p, job: job?.id || -1 });
                    }} >Editar</Button>}
                  </ButtonGroup>
                  {(isAdm || (p.user !== undefined && p.user === user?.id)) && <ButtonGroup>
                    <Button variant="danger" onClick={() => deleteProduct({ ...p, job: job?.id || -1 })} >Excluir</Button>
                  </ButtonGroup>}
                </ButtonToolbar>
              </ListGroup.Item>
            );
          })
        }
      </>
    );
  };

  return (
    <>
      <ProductModal
        {...modalProps}
        onClose={handleHideModal}
        onFinish={async (p) => {
          if (p.id === undefined) {
            await connection.post('/products/create', {
              ...p, user: undefined
            }).then(() => { }).catch(() => { });
          } else {
            await connection.post('/products/update', {
              ...p, user: undefined
            }).then(() => { }).catch(() => { });
          }
          handleUpdateList();
        }}
      />
      {props.withinContainer ? <ListInfo /> : <Container fluid className="page-with-menu">
        <ListGroup>
          <ListInfo />
        </ListGroup>
      </Container>}
    </>
  );
};