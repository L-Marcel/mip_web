import "leaflet/dist/leaflet.css";
import { Menu } from '../components/Menu';
import { Form, Row } from "react-bootstrap";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import JobsMap from "../components/JobsMap";
import { useDimensions } from "../../hooks/useDimensions";
import { MarkerIcon } from "../../enums";

export default function RegisterJobPage(props: JobsPageProps) {
    const dimensions = useDimensions();

    const [mh, setMh] = useState(0);
    const [ph, setPh] = useState(0);
    const [job, setJob] = useState<Job>({
        name: "",
        CNPJ: "",
        description: "",
        lat: -5.1133,
        lng: -36.6348,
        icon: MarkerIcon[14],
    });

    const menuRef = useRef<HTMLDivElement>(null);
    const pageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(menuRef.current && pageRef.current){
            let _mh = menuRef.current?.clientHeight;
            let _ph = pageRef.current?.clientHeight;

            if(_ph !== dimensions.h){
                _ph = dimensions.h;
            };

            setMh(_mh);
            setPh(_ph);
        };
    }, [dimensions]);

    function changeJob(e: ChangeEvent<any>) {
        setJob({
            ...job,
            [e.currentTarget.name]: e.target.value
        });
    };

    return (
        <div style={{ width: dimensions.w, height: dimensions.h }} ref={pageRef}>
            <Menu ref={menuRef}/>
            <Form onSubmit={e => e.preventDefault()} className="jobs-form">
                <Row className="mb-3 wrap-group">
                    <Form.Group >
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            value={job?.name}
                            name="name"
                            type="text"
                            onChange={changeJob}
                            placeholder="Informe o nome"
                        />
                    </Form.Group>
                </Row><Row className="mb-3 wrap-group">
                    <Form.Group>
                        <Form.Label>CNPJ/CPF</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="cnpj"
                            value={job?.CNPJ}
                            onChange={changeJob}
                            placeholder="Informe o CNPJ ou CPF" />
                    </Form.Group>
                </Row><Row className="mb-3 wrap-group">
                    <Form.Group>
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control value={job?.description} name="description" as="textarea" onChange={changeJob} />
                    </Form.Group>
                </Row>
            </Form>
            <JobsMap onChangeLatLng={(p) => { 
                setJob({ ...job, ...p });
                console.log({ ...p });
            }} job={job} dimensions={dimensions} mh={mh} ph={ph}/>
        </div>
    )
};