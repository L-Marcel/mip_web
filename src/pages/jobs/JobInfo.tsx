
import React, { useCallback, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { MarkerIcon } from "../../enums";
import { Menu } from "../components/Menu";
import { Container, ListGroup, ButtonGroup, Button } from "react-bootstrap";
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
    });

    if (job === undefined) {
        job = {
            name: "",
            CNPJ: "",
            description: "",
            lat: -5.1133,
            lng: -36.6348,
            icon: MarkerIcon[14],
        };
    };

    const selectUserById = useCallback(async(id: number) => {
        await connection.get(`users?id=${id}`)
            .then((res) => {
                setUser(res.data);
            })
            .catch(() => { });
    }, []);

    useEffect(() => {
        if (job?.user !== undefined) {
            selectUserById(job.user)
        }
    }, [job.user, selectUserById]);

    const t = job.icon.split(":")[2];

    return (
        <div>
            <Menu />
            <Container fluid className="page-with-menu">
                <ListGroup variant="flush">
                    <ListGroup.Item style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <h1 className="job-info-title">{job.name}</h1>
                        <ButtonGroup>
                            <Button style={{ margin: "6px 0px" }} variant="danger" onClick={() => { history.goBack(); }}>
                                Voltar
                            </Button>
                        </ButtonGroup>
                    </ListGroup.Item>
                    { job.CNPJ && <ListGroup.Item>
                        <p><b>CNPJ/CPf: </b>{job.CNPJ}</p>
                    </ListGroup.Item> }
                    <ListGroup.Item>
                        <p><b>Tipo de trabalho: </b>{t}</p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <p><b>Proprietario: </b>{user.name} - {user.phone} </p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <p>{job.description}</p>
                    </ListGroup.Item>
                    <Products withinContainer title={"Produtos"}/>
                </ListGroup>
            </Container>
        </div>
    );

}
