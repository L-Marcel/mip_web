import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Modal, Form, Row, Alert } from "react-bootstrap";

export default function AddressModal(props: AddressModalProps) {
  let loadedAddress = localStorage.getItem("mip@address");

  const [canSend, setCanSend] = useState(!props.isDelivery);
  const [address, setAddress] = useState<Address>({
    address: "",
    city: "",
    district: "",
    complement: "",
  });

  function changeAddress(e: ChangeEvent<any>) {
    setAddress({
      ...address,
      [e.currentTarget.name]: e.target.value,
    });
  }

  useEffect(() => {
    if (loadedAddress !== undefined && loadedAddress !== null) {
      setAddress(JSON.parse(loadedAddress));
    }
  }, [loadedAddress]);

  useEffect(() => {
    if (props.isDelivery) {
      setCanSend(
        address.address !== "" && address.city !== "" && address.district !== ""
      );
    } else {
      setCanSend(true);
    }
  }, [address, props.isDelivery]);

  return (
    <Modal
      show={props.show}
      onHide={props.onClose}
      backdrop="static"
      keyboard={false}
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>Informações complementares</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => e.preventDefault()} className="jobs-form">
          <Row className="mb-3 wrap-group">
            <Form.Group>
              <Form.Label>Cidade</Form.Label>
              <Form.Control
                name="city"
                type="text"
                placeholder="Informe o a sua cidade"
                onChange={changeAddress}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Bairro</Form.Label>
              <Form.Control
                name="district"
                type="text"
                placeholder="Informe o seu bairro"
                onChange={changeAddress}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3 wrap-group">
            <Form.Group>
              <Form.Label>Endereço</Form.Label>
              <Form.Control
                name="address"
                type="text"
                placeholder="Informe o seu endereço"
                onChange={changeAddress}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Complemento</Form.Label>
              <Form.Control
                name="complement"
                type="text"
                placeholder="Informe seu complemento"
                onChange={changeAddress}
              />
            </Form.Group>
          </Row>
        </Form>
        { props.isDelivery && !canSend && <Alert variant="danger">
          O vendedor precisara do seu endereço para entregar o Item
        </Alert> }
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="danger"
          onClick={() => {
            if (
              props.onFinish &&
              props.onClose &&
              (!props.isDelivery ||
              canSend)
            ) {
              props.onFinish(address);
              props.onClose();
            }
          }}
          disabled={props.isDelivery && !canSend}
        >
          Enviar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
