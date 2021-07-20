import React, { ChangeEvent, useEffect, useState } from 'react';
import { enumToStringArray, ProductType } from '../../enums';
import { Modal, Button, Col, Form, InputGroup, Row } from 'react-bootstrap';

export default function ProductModal(props: ProductModalProps) {
    const [product, setProduct] = useState<Product>({
        job: -1,
        delivery: false,
        name: "",
        type: "Item",
        price: 0,
        unit: 1,
    });

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
                            onChange={changeProduct}>
                                {enumToStringArray(ProductType).map((v, i) => {
                                    return (
                                        <option key={`product-type-option-${i}`} value={v}>{v}</option>
                                    );
                                })}
                            </Form.Control>
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
                            />
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
                                />
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
                                />
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
                            <Form.Control value={product.description} name="description" as="textarea" onChange={changeProduct}/>
                        </Form.Group>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onClose}>
                    Fechar
                </Button>
                <Button variant="danger" onClick={() => {
                    if(props.onFinish && props.onClose){
                        props.onFinish(product)
                        props.onClose();
                    }
                }}>Enviar</Button>
            </Modal.Footer>
        </Modal >
    );
};