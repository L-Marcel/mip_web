import { useUser } from '../hooks/useUser';
import { Container, Row, Col, Form, Button, ButtonGroup, ButtonToolbar, Alert } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';
import { ChangeEvent, useEffect, useState } from 'react';
import connection from '../services/connection';

export default function LoginPage() {
  const history = useHistory();
  const email = useLocation().state as string | undefined;
  const { setUser } = useUser();
  const [alert, setAlert] = useState(false);
  const [keep, setKeep] = useState(true);
  const [credentials, setCredentials] = useState<Credentials>({
    email: email ? email : "",
    password: ""
  });

  useEffect(() => {
    let loadedUser = sessionStorage.getItem("mip@user");
    if (
      loadedUser !== undefined && loadedUser !== null) {
      try {
        let u = JSON.parse(loadedUser) as User;
        if (
          u.email !== undefined &&
          u.id !== undefined &&
          u.phone !== undefined &&
          u.name !== undefined
        ) {
          setUser(u, true);
        } else {
          setUser(undefined, false);
        };
      } catch (err) { }
    };
  }, [setUser]);

  function changeCredentials(e: ChangeEvent<any>) {
    setCredentials({
      ...credentials,
      [e.currentTarget.name]: e.target.value
    });
  };

  function login() {
    connection.post('/login', credentials).then((res) => {
      setUser(res.data, keep);
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
              <Form.Group className="mb-3">
                <Form.Label>E-mail</Form.Label>
                <Form.Control type="email" name="email"
                  value={credentials.email} placeholder="Digite seu e-mail"
                  onChange={changeCredentials} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Senha</Form.Label>
                <Form.Control type="password" name="password"
                  value={credentials.password} placeholder="Digite sua senha"
                  onChange={changeCredentials} />
                <Form.Text className="text-muted">
                  Nunca compartilhe sua senha com alguém!!!
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Check type="checkbox" checked={keep} label="Manter conectado" onChange={e => setKeep(e.currentTarget.checked)} />
              </Form.Group>
              {alert && <Alert variant="danger">
                Não foi possivel encontrar o usuário!!!
              </Alert>}
              <ButtonToolbar>
                <ButtonGroup className="me-2">
                  <Button variant="danger" onClick={login}>Entrar</Button>
                </ButtonGroup>
                <ButtonGroup>
                  <Button variant="dark" onClick={() => history.push("/register")}>Cadastrar</Button>
                </ButtonGroup>
              </ButtonToolbar>
            </Form>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};