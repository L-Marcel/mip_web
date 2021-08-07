import "leaflet/dist/leaflet.css";
import { Menu } from '../components/Menu';
import { Button, ButtonGroup, ButtonToolbar, Col, Form, Row } from "react-bootstrap";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import JobsMap from "../components/JobsMap";
import { useDimensions } from "../../hooks/useDimensions";
import { enumToStringArray, MarkerIcon } from "../../enums";
import connection from "../../services/connection";
import { useLocation, useHistory } from "react-router-dom";
import { useUser } from "../../hooks/useUser";

export default function RegisterJobPage() {
    const { user, isAdm } = useUser();
    const [users, setUsers] = useState<User[]>(user !== undefined ? [user] : []);
    const history = useHistory();
    const dimensions = useDimensions();
    const [mh, setMh] = useState(0);
    const [ph, setPh] = useState(0);

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

    const menuRef = useRef<HTMLDivElement>(null);
    const pageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (menuRef.current && pageRef.current) {
            let _mh = menuRef.current?.clientHeight;
            let _ph = pageRef.current?.clientHeight;

            if (_ph !== dimensions.h) {
                _ph = dimensions.h;
            };

            setMh(_mh);
            setPh(_ph);
        };
    }, [dimensions]);

    useEffect(() => {
        if (isAdm) {
            connection.get('users').then((res) => {
                setUsers(res.data);
            }).catch(() => { });
        };
    }, [isAdm]);


    function changeJob(e: ChangeEvent<any>) {
        setJob({
            ...job,
            [e.currentTarget.name]: e.target.value
        });
    };

    return (
        <div style={{ width: dimensions.w, height: dimensions.h }} ref={pageRef}>
            <Menu ref={menuRef} />
            <Form onSubmit={e => e.preventDefault()} className="jobs-form">
                <Row className="mb-3 wrap-group">
                    <Form.Group as={Col}>
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            value={job?.name}
                            name="name"
                            type="text"
                            onChange={changeJob}
                            placeholder="Informe o nome"
                        />
                    </Form.Group>
                    {isAdm && job?.user !== undefined && <Form.Group as={Col}>
                        <Form.Label>Usuário</Form.Label>
                        <Form.Control
                            value={job?.user}
                            as="select" name="user"
                            onChange={changeJob}>
                            {users.map((u, i) => {
                                return (
                                    <option key={`user-id-option-${i}`} value={u?.id}>{u.name}</option>
                                );
                            })}
                        </Form.Control>
                    </Form.Group>}
                </Row>
                <Row className="mb-3 wrap-group">
                    <Form.Group as={Col}>
                        <Form.Label>CNPJ/CPF</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="CNPJ"
                            value={job?.CNPJ}
                            onChange={changeJob}
                            placeholder="Informe o CNPJ ou CPF" />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Classificação</Form.Label>
                        <Form.Control
                            value={job?.icon}
                            as="select" name="icon"
                            onChange={changeJob}>
                            {enumToStringArray(MarkerIcon).map((m, i) => {
                                const array = m.split(":");
                                return (
                                    <option key={`marker-icon-option-${i}`} value={m}>{array[2]}</option>
                                );
                            })}
                        </Form.Control>
                    </Form.Group>
                </Row>
                <Row className="mb-3 wrap-group">
                    <Form.Group>
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control value={job?.description} name="description" as="textarea" onChange={changeJob} />
                    </Form.Group>
                </Row>
                <ButtonToolbar>
                    <ButtonGroup className="me-2">
                        <Button variant="secondary" onClick={() => { history.goBack(); }}>
                            Voltar
                        </Button>
                    </ButtonGroup>
                    <ButtonGroup>
                        <Button variant="danger" onClick={() => {
                            if (job?.id === undefined) {
                                connection.post('/jobs/create', { ...job, user: user?.id }).then(() => { }).catch(() => { });
                            } else {
                                connection.post('/jobs/update', { ...job, user: job?.user }).then(() => { }).catch(() => { });
                            }
                            history.push(isAdm? '/adm/jobs':'/jobs');
                        }}>Enviar</Button>
                    </ButtonGroup>
                </ButtonToolbar>
            </Form>
            <JobsMap onChangeLatLng={(p) => {
                setJob({ ...job, ...p });
            }} job={job} dimensions={dimensions} mh={mh} ph={ph} />
        </div>
    )
};