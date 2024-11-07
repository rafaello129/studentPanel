import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useCreateSubperiodMutation } from '../../../services/api/providers/periodApi';

const CreateSubperiodModal = ({ show, onHide, periodId, onSave }) => {
  const [subperiodData, setSubperiodData] = useState({
    name: '',
    key: '',
    startDate: '',
    endDate: ''
  });
  const [createSubperiod] = useCreateSubperiodMutation();

  const handleSave = async () => {
    try {
      // Llama a la API para crear el subperiodo con periodId
      const newSubperiod = await createSubperiod({ ...subperiodData, periodId }).unwrap();
      onSave(newSubperiod);  // Llama a la función onSave con los datos creados para actualizar la UI o realizar acciones adicionales

      // Limpia el formulario después de guardar
      setSubperiodData({ name: '', key: '', startDate: '', endDate: '' });
      onHide();
    } catch (error) {
      console.error('Error al crear el subperiodo:', error);
    }
  };

  const handleInputChange = (field, value) => {
    setSubperiodData({ ...subperiodData, [field]: value });
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Crear Subperiodo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Nombre del Subperiodo</Form.Label>
            <Form.Control
              type="text"
              value={subperiodData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Clave</Form.Label>
            <Form.Control
              type="text"
              value={subperiodData.key}
              onChange={(e) => handleInputChange('key', e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Fecha de Inicio</Form.Label>
            <Form.Control
              type="date"
              value={subperiodData.startDate}
              onChange={(e) => handleInputChange('startDate', e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Fecha de Fin</Form.Label>
            <Form.Control
              type="date"
              value={subperiodData.endDate}
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
          Guardar Subperiodo
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateSubperiodModal;
