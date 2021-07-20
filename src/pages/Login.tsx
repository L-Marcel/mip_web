//import { useUser } from '../hooks/useUser';
import { Container, Row, Col, Form, Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  //const { setUser } = useUser();

  function login(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();

    console.log(e);
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
            <Form onSubmit={login}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>E-mail</Form.Label>
                <Form.Control type="email" placeholder="Digite seu e-mail" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Senha</Form.Label>
                <Form.Control type="password" placeholder="Digite sua senha" />
                <Form.Text className="text-muted">
                  Nunca compartilhe sua senha com alguém!!!
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Manter conectado" />
              </Form.Group>
              <ButtonToolbar>
                <ButtonGroup className="me-2">
                  <Button type="submit" variant="danger">Entrar</Button>
                </ButtonGroup>
                <ButtonGroup>
                  <Button variant="dark"><Link to="/register">Cadastrar</Link></Button>
                </ButtonGroup>
              </ButtonToolbar>
            </Form>
          </Row>
        </Col>
      </Row>

    </Container>




  );
};