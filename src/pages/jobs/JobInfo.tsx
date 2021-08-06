
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { MarkerIcon } from "../../enums";
import { Menu } from "../components/Menu";
import { Container, Col, Row, ListGroup, ButtonToolbar, ButtonGroup, Button } from "react-bootstrap";



export default function JobPageInfo() {
    const history = useHistory();
    let _j = useLocation().state as Job | undefined;
    if (_j === undefined) {
        _j = {
            name: "",
            CNPJ: "",
            description: "",
            lat: -5.1133,
            lng: -36.6348,
            icon: MarkerIcon[14],
        };
    }

    const [job, setJob] = useState(_j);
    const t = job.icon.split(":")[2];

    return (
        <>
            <Menu />
            <Container className="jobinfo">
                <Row>
                    <Col>
                        <Row>
                            <h1>{job.name}</h1>
                        </Row>
                        <ListGroup>
                            <ListGroup.Item><Row>
                                <p><b>CNPJ/CPf: </b> {job.CNPJ}</p>
                            </Row></ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <p ><b>Tipo de trabalho: </b>{t}</p>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <p><b>Id do proprietario: </b>{job.user}</p>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row><p><b>Descrição: </b>{job.description}</p></Row></ListGroup.Item>
                        </ListGroup>
                        <ButtonToolbar>
                            <ButtonGroup className="me-2">
                                <Button variant="danger" onClick={() => { history.goBack(); }}>
                                    Voltar
                                </Button>
                            </ButtonGroup>
                        </ButtonToolbar>
                    </Col>
                </Row>
            </Container>
        </>
    );

}
