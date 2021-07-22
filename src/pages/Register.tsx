import { ChangeEvent, useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import connection from '../services/connection';


export default function RegisterPage(props: UserModalProps) {
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
  function send(u : User){

  };



  return (
    <Container fluid className="page center">
      <Row>
        <Col>
          <Row>
            <p>Macau</p>
            <h1><span className="danger">Independent</span> Points</h1>
          </Row>
          <Row>
            <Form onSubmit={e => e.preventDefault()}>

              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Nome</Form.Label>

                <Form.Control
                  type="text"
                  name="name"
                  value={user?.name}
                  placeholder="Informe seu nome"
                  onChange={changeUser} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="phone">
                <Form.Label>Telefone</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={user?.phone}
                  placeholder="Informe seu telefone"
                  onChange={changeUser} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="email">
                <Form.Label>E-mail</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  value={user?.email}
                  placeholder="teste@teste.com"
                  onChange={changeUser} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Senha</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={user?.password}
                  placeholder="Senha.1234"
                  onChange={changeUser} />
                <Form.Text className="text-muted">
                  Atenção! Não compartilhe sua senha!
                </Form.Text>
              </Form.Group>

              <ButtonToolbar>
                <ButtonGroup className="me-2">
                  <Button variant="dark"><Link to="/login">Voltar</Link></Button>
                </ButtonGroup>
                <ButtonGroup>
                  <Button variant="danger" type="submit" 
                  onClick={async (User) => {await connection.post('/users/create', user).then(() => { }).catch(() => { });
                  }}
                  ><a href="http://localhost:3000/login">Cadastrar</a></Button>
                </ButtonGroup>
              </ButtonToolbar>

            </Form>
          </Row>
        </Col >
      </Row >
    </Container >
  );
};