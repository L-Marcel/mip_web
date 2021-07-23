import { ChangeEvent, useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, ButtonGroup, ButtonToolbar, Alert } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import connection from '../services/connection';

export default function RegisterPage(props: UserModalProps) {
  const history = useHistory();
  const [alert, setAlert] = useState(false);
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

  function create() {
    connection.post('/users/create', user).then(() => {
      history.push('/login', user.email);
    }).catch(() => {
      setAlert(true);
    });
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
                  placeholder="Informe seu e-mail"
                  onChange={changeUser} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Senha</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={user?.password}
                  placeholder="Informe sua senha"
                  onChange={changeUser} />
                <Form.Text className="text-muted">
                  Atenção! Não compartilhe sua senha!
                </Form.Text>
              </Form.Group>
              {alert && <Alert variant="danger">
                Não foi possivel criar o usuário
              </Alert>}
              <ButtonToolbar>
                <ButtonGroup className="me-2">
                  <Button variant="dark" onClick={() => history.goBack()}>Voltar</Button>
                </ButtonGroup>
                <ButtonGroup>
                  <Button variant="danger" type="submit"
                    onClick={create}
                  >Cadastrar</Button>
                </ButtonGroup>
              </ButtonToolbar>
            </Form>
          </Row>
        </Col >
      </Row >
    </Container >
  );
};