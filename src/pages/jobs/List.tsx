import React, { useEffect, useState, useCallback, ChangeEvent } from 'react';
import { Container, ListGroup, Button, ButtonToolbar, ButtonGroup, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import connection from '../../services/connection';
import { Menu } from '../components/Menu';

export default function JobsListPage() {
    const { user, isAdm } = useUser();
    const history = useHistory();
    const [jobsResult, setJobsResult] = useState<Job[]>([]);
    const [search, setSearch] = useState<string>("");
    const [jobs, setJobs] = useState<Job[]>([]);

    const handleUpdateList = useCallback(async () => {
        if (!isAdm) {
            await connection.get(`jobs?user=${user?.id}`)
                .then((res) => {
                    setJobs(res.data);
                })
                .catch(() => { });
        } else {
            await connection.get(`jobs`)
                .then((res) => {
                    setJobs(res.data);
                })
                .catch(() => { });
        }
    }, [user, isAdm]);

    useEffect(() => {
        if (!isAdm) {
            connection.get(`jobs?user=${user?.id}`)
                .then((res) => {
                    setJobs(res.data);
                })
                .catch(() => { });
        } else {
            connection.get(`jobs`)
                .then((res) => {
                    setJobs(res.data);
                    setJobsResult(res.data);
                })
                .catch(() => { });
        }
    }, [user, isAdm]);

    useEffect(() => {
        handleUpdateList();
    }, [handleUpdateList]);

    async function deleteProduct(j: Job) {
        await connection.delete(`jobs/delete?id=${j.id}`)
            .then(() => {
                handleUpdateList();
            })
            .catch(() => { });
    };




    useEffect(() => {
        let _jobs = [...jobs].filter((j, i) => {
            if (j.name.includes(search)) {
                return true;
            }
            return false;
        });
        setJobsResult([..._jobs]);
    }, [jobs, search]);


    return (
        <div>
            <Menu />
            <Container fluid className="page-with-menu">
                <ListGroup>
                    <ListGroup.Item style={{ 
                        display: "flex", 
                        justifyContent: "space-between", 
                        alignItems: "center", 
                        flexWrap: "wrap",
                        paddingBottom: 0,
                    }}>
                        <div onDoubleClick={(e) => e.stopPropagation()} style={{ marginBottom: ".5rem" }}>
                            <Form.Control
                                type="text"
                                name="search"
                                value={search}
                                placeholder="Pesquisar pelo nome"
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.currentTarget.value)}
                            />
                        </div>
                        <Button key={`jobs-add`} variant="danger" style={{ marginBottom: ".5rem" }} onClick={() => {
                            history.push('/jobs/register');
                        }}>Adicionar novo trabalho</Button>
                    </ListGroup.Item>
                    {
                        jobsResult.map((j, i) => {
                            let t = j.icon.split(":")[2];
                            return (
                                <ListGroup.Item key={`jobs-${i}`}>
                                    <div>
                                        <h5>{j.name} | {t}</h5>
                                        {j.description && <p className="margin-bottom">{j.description}</p>}
                                    </div>

                                    <ButtonToolbar>
                                        <ButtonGroup className="me-2">
                                            <Button variant="secondary" onClick={() => history.push({ pathname: "/jobs/info", state: j })} >Abrir</Button>
                                        </ButtonGroup>
                                        <ButtonGroup className="me-2">
                                            <Button variant="secondary" onClick={() => history.push({ pathname: "/jobs/register", state: j })} >Editar</Button>
                                        </ButtonGroup>
                                        <ButtonGroup>
                                            <Button variant="danger" onClick={() => deleteProduct(j)} >Excluir</Button>
                                        </ButtonGroup>
                                    </ButtonToolbar>
                                </ListGroup.Item>
                            );
                        })
                    }
                </ListGroup>
            </Container>
        </div >
    );

};