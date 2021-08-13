import React, { ChangeEvent, useEffect, useState } from 'react';
import { enumToStringArray, ProductType } from '../../enums';
import { Modal, Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import connection from '../../services/connection';

export default function ProductModal(props: ProductModalProps) {
    const [validations, setValidations] = useState<ValidationDetail[]>([]);
    const [product, setProduct] = useState<Product>({
        job: props.defaultProduct.job,
        delivery: false,
        name: "",
        type: "Item",
        price: 0,
        unit: 1,
        description: "",
    });

    function returnValidation(target: string) {
        for (let i in validations) {
            if (validations[i].message.includes(target)) {
                return {
                    message: validations[i].message.split("|")[1],
                    value: false
                };
            };
        };

        return {
            message: "",
            value: true
        };
    };

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

    useEffect(() => {
        setProduct(props.defaultProduct);
    }, [props.defaultProduct]);

    useEffect(() => {
        setTimeout(() => {
            connection.post(`products/${product.id !== undefined ? 'update' : 'create'}/check`, product)
                .then((res) => {
                    setValidations(res.data);
                }).catch(() => { });
        }, 500);
    }, [product]);

    return (
        <Modal
            show={props.show}
            onHide={props.onClose}
            backdrop="static"
            keyboard={false}
            size="lg"
        >
            <Modal.Header closeButton aria-label="" closeLabel="">
                <Modal.Title>{product.id ? "Produto existente" : "Novo produto"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={e => e.preventDefault()}>
                    <Row className="mb-3 wrap-group">
                        <Form.Group as={Col} md="3">
                            <Form.Label>Tipo</Form.Label>
                            <Form.Control
                                value={product.type}
                                as="select" name="type"
                                aria-label="Floating label select example"
                                onChange={changeProduct}
                                isInvalid={!returnValidation("type").value}
                            >
                                {enumToStringArray(ProductType).map((v, i) => {
                                    return (
                                        <option key={`product-type-option-${i}`} value={v}>{v}</option>
                                    );
                                })}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">{returnValidation("type").message}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="9">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="name"
                                value={product.name}
                                placeholder={product.type === "Item" ? "Ex: Bolo, brigadeiro, cadeira..." : "Ex: Limpar um carro"}
                                onChange={changeProduct}
                                isInvalid={!returnValidation("name").value}
                            />
                            <Form.Control.Feedback type="invalid">{returnValidation("name").message}</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3 wrap-group">
                        <Form.Group as={Col} md="6">
                            <Form.Label>Valor</Form.Label>
                            <InputGroup hasValidation>
                                <InputGroup.Text id="price">R$</InputGroup.Text>
                                <Form.Control
                                    value={product.price}
                                    type="number"
                                    name="price"
                                    placeholder="0.00"
                                    defaultValue={0.00}
                                    aria-describedby="price"
                                    onChange={changeProduct}
                                    required
                                    isInvalid={!returnValidation("price").value}
                                />
                                <Form.Control.Feedback type="invalid">{returnValidation("price").message}</Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        {
                            product.type === "Item" &&
                            <Form.Group as={Col} md="6">
                                <Form.Label>Unidade(s)</Form.Label>
                                <Form.Control
                                    name="unit"
                                    type="number"
                                    value={product.unit}
                                    placeholder="1"
                                    required
                                    onChange={changeProduct}
                                    isInvalid={!returnValidation("unit").value}
                                />
                                <Form.Control.Feedback type="invalid">{returnValidation("unit").message}</Form.Control.Feedback>
                            </Form.Group>
                        }
                    </Row>
                    <Row>
                        {
                            product.type === "Item" &&
                            <Form.Group as={Col} md="3">
                                <Form.Check
                                    name="delivery"
                                    checked={product.delivery}
                                    type="checkbox"
                                    label="Delivery?"
                                    onChange={changeProductDelivery}
                                />
                            </Form.Group>
                        }
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="12">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control value={product.description} name="description" as="textarea" onChange={changeProduct}
                                isInvalid={!returnValidation("description").value}
                            />
                            <Form.Control.Feedback type="invalid">{returnValidation("description").message}</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onClose}>
                    Fechar
                </Button>
                <Button variant="danger" onClick={() => {
                    if (props.onFinish && props.onClose) {
                        props.onFinish(product)
                        props.onClose();
                    }
                }}>Enviar</Button>
            </Modal.Footer>
        </Modal >
    );
};