import { ChangeEvent, useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';


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

  return (
    <Container fluid className="page center">
      <Row>
        <Col>
          <Row>
            <p>Macau</p>
            <h1><span className="danger">Independent</span> Points</h1>
          </Row>
          <Row>
            <Form>

              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Nome</Form.Label>
                <Form.Control type="nome"   onChange={changeUser} placeholder="Digite seu nome" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="phone">
                <Form.Label>Telefone</Form.Label>
                <Form.Control type="phone"  onChange={changeUser} placeholder="Digite seu telefone" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="email">
                <Form.Label>E-mail</Form.Label>
                <Form.Control type="email"  onChange={changeUser} placeholder="Digite seu e-mail" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Senha</Form.Label>
                <Form.Control type="password"  onChange={changeUser} placeholder="Digite sua senha" />
                <Form.Text className="text-muted">
                  Atenção! Não compartilhe sua senha!
                </Form.Text>
              </Form.Group>

              <ButtonToolbar>
                <ButtonGroup className="me-2">
                  <Button variant="dark"><Link to="/login">Voltar</Link></Button>
                </ButtonGroup>
                <ButtonGroup>
                  <Button variant="danger" type="submit" onClick={() => {
                  if (props.onFinish && props.onClose) {
                    props.onFinish(user)
                    props.onClose();
                  }
                }}>Cadastrar</Button>
                </ButtonGroup>
              </ButtonToolbar>
              
            </Form>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};