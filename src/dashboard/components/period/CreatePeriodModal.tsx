import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

interface CreatePeriodModalProps {
  show: boolean;
  onHide: () => void;
  onSave: (newPeriodData: { name: string; key: string; startDate: string; endDate: string }) => Promise<void>;
}

const CreatePeriodModal: React.FC<CreatePeriodModalProps> = ({ show, onHide, onSave }) => {
  const [periodData, setPeriodData] = useState({
    name: '',
    key: '',
    startDate: '',
    endDate: ''
  });

  const handleSave = () => {
    onSave(periodData);
    setPeriodData({ name: '', key: '', startDate: '', endDate: '' }); // Limpia el formulario
    onHide();
  };

  const handleInputChange = (field: string, value: string) => {
    setPeriodData({ ...periodData, [field]: value });
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Crear Periodo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Nombre del Periodo</Form.Label>
            <Form.Control
              type="text"
              value={periodData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Clave</Form.Label>
            <Form.Control
              type="text"
              value={periodData.key}
              onChange={(e) => handleInputChange('key', e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Fecha de Inicio</Form.Label>
            <Form.Control
              type="date"
              value={periodData.startDate}
              onChange={(e) => handleInputChange('startDate', e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Fecha de Fin</Form.Label>
            <Form.Control
              type="date"
              value={periodData.endDate}
              onChange={(e) => handleInputChange('endDate', e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Guardar Periodo
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreatePeriodModal;
