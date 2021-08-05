import React, { useEffect, useState } from 'react';
import { Container, ListGroup, Button, ButtonToolbar, ButtonGroup } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import connection from '../../services/connection';
import { Menu } from '../components/Menu';

export default function JobsListPage() {
    const history = useHistory();
    const [jobs, setJobs] = useState<Job[]>([]);
   
    useEffect(() => {
        handleUpdateList();
    }, []);

    async function handleUpdateList() {
        await connection.get('products')
            .then((res) => {
                setJobs(res.data);
            })
            .catch(() => { });
    };

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
                            return (
                                <ListGroup.Item key={`jobs-${i}`}>
                                    <div>
                                        <h5>{j.name} - R$ {j.description}</h5>
                                    </div>

                                    <ButtonToolbar>
                                        <ButtonGroup className="me-2">
                                            <Button variant="secondary" >Editar</Button>
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
                        <Button  variant="danger" onClick={() => {
                            history.push('jobs/register');
                        }}>Adicionar novo produto</Button>
                    </ListGroup.Item>
                </ListGroup>
            </Container>
        </div>
    );

};