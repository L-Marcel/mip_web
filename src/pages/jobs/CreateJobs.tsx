import "leaflet/dist/leaflet.css";
import { Menu } from '../components/Menu';
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { Col, Container, Form, Row } from "react-bootstrap";
import { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { marker } from "leaflet";
import L from "leaflet";



export default function RegisterJobPage(props: JobsPageProps) {

    const [draggable, setDraggable] = useState(false)
    const [position, setPosition] = useState({lat: 51.505,
        lng: -0.09});
    const markerRef = useRef(null);
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current
          if (marker != null) {
            //setPosition(L.marker.getLatLng());
          }
        },
      }),
      [],
    )
    const toggleDraggable = useCallback(() => {
      setDraggable((d) => !d)
    }, [])

    const [job, setJob] = useState<Job>({
        name: "",
        CNPJ: "",
        description: "",
        lat: -5.1133,
        lng: -36.6348,
        icon: "cadetblue:address-card:Outros",
    });

    useEffect(() => {
        setJob(props.defaultJob);
    }, [props.defaultJob]);



    function changeJob(e: ChangeEvent<any>) {
        setJob({
            ...job,
            [e.currentTarget.name]: e.target.value
        });
    };

    return (
        <>
            <Menu />
                <Row style={{width:'100vw', height: '39vw'}}>
                    <Col>
                        <MapContainer id="map"
                            style={{ width: '73,5vw', height: '40vw' }}
                            center={[50.5, 30.5]}
                            zoom={15}
                            scrollWheelZoom={true}
                        >
                            <TileLayer
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            return(
                            <Marker position={[50.5, 30.5]}
                            >Teste

                            </Marker>
                            );
                        </MapContainer>
                    </Col>
                    <Col  xs lg="3">
                        <Form onSubmit={e => e.preventDefault()}>
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
                    </Col>
                </Row>
        </>
    )
};