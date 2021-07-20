import { ChangeEvent, useEffect, useState } from 'react';
import { useUser } from '../hooks/useUser';
import { Container, Row, Col, Form, Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';


export default function (props: UserModalProps) {
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

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Nome</Form.Label>
                <Form.Control type="nome"   onChange={changeUser} placeholder="Maria Clara Fernandes" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Telefone</Form.Label>
                <Form.Control type="phone"  onChange={changeUser} placeholder="DDDNNNNNNNNN" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email"  onChange={changeUser} placeholder="maria@gmail.com" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Senha</Form.Label>
                <Form.Control type="password"  onChange={changeUser} placeholder="Senha.873" />
                <Form.Text className="text-muted">
                  Atenção! Não compartilhe sua senha!
                </Form.Text>
              </Form.Group>

              <Button variant="dark" type="submit" onClick={() => {
                if (props.onFinish && props.onClose) {
                  props.onFinish(user)
                  props.onClose();
                }
              }}>Cadastrar</Button>
            </Form>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};