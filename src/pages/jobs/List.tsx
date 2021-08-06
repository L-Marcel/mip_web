import React, { useEffect, useState, useCallback } from 'react';
import { Container, ListGroup, Button, ButtonToolbar, ButtonGroup } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import connection from '../../services/connection';
import { Menu } from '../components/Menu';

export default function JobsListPage() {
    const { user, isAdm } = useUser();
    const history = useHistory();
    const [jobs, setJobs] = useState<Job[]>([]);

    const handleUpdateList = useCallback(async() => {
        if(!isAdm) {
            await connection.get(`jobs?user_id=${user?.id}`)
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
        handleUpdateList();
    }, [handleUpdateList]);

    async function deleteProduct(j: Job) {
        await connection.delete(`jobs/delete?id=${j.id}`)
            .then(() => {
                handleUpdateList();
            })
            .catch(() => { });
    };

    return (
        <div>
            <Menu />
            <Container fluid className="page-with-menu">
                <ListGroup>
                    {
                        jobs.map((j, i) => {
                            let t = j.icon.split(":")[2];
                            return (
                                <ListGroup.Item key={`jobs-${i}`}>
                                    <div>
                                        <h5>{j.name} | {t}</h5>
                                        <p>{j.description}</p>
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
                    <ListGroup.Item key={`jobs-add`}>
                        <Button variant="danger" onClick={() => {
                            history.push('/jobs/register');
                        }}>Adicionar novo trabalho</Button>
                    </ListGroup.Item>
                </ListGroup>
            </Container>
        </div >
    );

};