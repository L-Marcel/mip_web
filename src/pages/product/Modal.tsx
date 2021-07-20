import React, { ChangeEvent, useEffect, useState } from 'react';
import { enumToStringArray, ProductType } from '../../enums';
import { FaTimes } from 'react-icons/fa';
import { Modal, Button, Col,  Form, InputGroup, Row } from 'react-bootstrap';

export default function ProductModal(props: ProductModalProps) {
    const [product, setProduct] = useState<Product>({
        job: -1,
        delivery: false,
        name: "",
        type: "Item",
        price: 0,
        unit: 1,

    });
    const [validated, setValidated] = useState(false);

    const handleSubmit = (e: { currentTarget: any; preventDefault: () => void; stopPropagation: () => void; }) => {
      const form = e.currentTarget;
      if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
      }
  
      setValidated(true);
    };


    useEffect(() => {
        setProduct(props.defaultProduct);
    }, [props.defaultProduct]);

    function changeProduct(e: ChangeEvent<any>) {
        setProduct({
            ...product,
            [e.currentTarget.name]: e.target.value
        });
    };

    function changeProductDelivery(e: ChangeEvent<HTMLInputElement>) {
        setProduct({
            ...product,
            [e.currentTarget.name]: e.currentTarget.checked
        });
    };

    if (props.show) {
        return (

            <Modal
                show={props.show}
                onHide={props.onClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{product.id ? "Produto existente" : "Novo produto"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="4" controlId="validationCustom01">
                            {enumToStringArray(ProductType).map((v, i) => {
           return (
            <option key={`product-type-option-${i}`} value={v}>{v}</option>
           );
          })}

                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="validationCustom02">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder={product.type === "Item"? "Ex: Bolo, brigadeiro, cadeira...":"Ex: Limpar um carro"}
                                    defaultValue="Otto"
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                                <Form.Label>Valor</Form.Label>
                                <Form.Text className="text-muted">Apenas em R$</Form.Text>
                                <InputGroup hasValidation>
                                    <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                    <Form.Control
                                        type="text"
                                        placeholder="Username"
                                        aria-describedby="inputGroupPrepend"
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please choose a username.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" controlId="validationCustom03">
                                <Form.Label>City</Form.Label>
                                <Form.Control type="text" placeholder="City" required />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid city.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="3" controlId="validationCustom04">
                                <Form.Label>State</Form.Label>
                                <Form.Control type="text" placeholder="State" required />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid state.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="3" controlId="validationCustom05">
                                <Form.Label>Zip</Form.Label>
                                <Form.Control type="text" placeholder="Zip" required />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid zip.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="3" controlId="validationCustom06">
                                <Form.Label>Tipo</Form.Label>
                                <Form.Control type="text" placeholder="type" required />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid zip.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onClose}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit">Enviar</Button>
                </Modal.Footer>
            </Modal>
        );
    } else {
        return (null);
    };
};