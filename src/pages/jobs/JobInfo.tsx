
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { MarkerIcon } from "../../enums";
import { Menu } from "../components/Menu";
import { Container, Col, Row, ListGroup, ButtonToolbar, ButtonGroup, Button } from "react-bootstrap";
import Products from "../product/Products";
import connection from "../../services/connection";

export default function JobPageInfo() {
    const history = useHistory();
    let job = useLocation().state as Job | undefined;
    const [user, setUser] = useState<User>({
        name: "",
        email: "",
        password: "",
        phone: "",
    })
    if (job === undefined) {
        job = {
            name: "",
            CNPJ: "",
            description: "",
            lat: -5.1133,
            lng: -36.6348,
            icon: MarkerIcon[14],
        };
    }
    useEffect(() => {
        if (job?.user !== undefined) {
            selectUserById(job.user)
        }
    }, []);



    async function selectUserById(id: number) {
        await connection.get(`users?id=${id}`)
            .then((res) => {

                console.log("entrou aqui")
                setUser(res.data);
                console.log({ user, id })
            })
            .catch(() => { });
    };
    const t = job.icon.split(":")[2];

    return (
        <>
            <Menu />
            <div className="jobinfo">
                <Container fluid className="page-with-menu ">
                    <Row>
                        <Col>
                            <Row>
                                <h1>{job.name}</h1>
                            </Row>
                            <ListGroup >
                                <ListGroup.Item>
                                    <Row>
                                        <Col><p><b>CNPJ/CPf: </b> {job.CNPJ}</p></Col>
                                        <Col> <p ><b>Tipo de trabalho: </b>{t}</p></Col>

                                        <Col><p><b>Proprietario: </b>{user.name} - {user.phone} </p></Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row><p>{job.description}</p></Row></ListGroup.Item>
                            </ListGroup>


                        </Col>
                    </Row>


                </Container>
                <Container fluid className="page-with-menu " ><Row><h1>Produtos</h1></Row></Container>
                <Products />
                <Container fluid className="page-with-menu ">
                    <ButtonToolbar>
                        <ButtonGroup className="me-2">
                            <Button variant="danger" onClick={() => { history.goBack(); }}>
                                Voltar
                            </Button>
                        </ButtonGroup>
                    </ButtonToolbar >
                </Container>
            </div >

        </>
    );

}
