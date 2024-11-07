import React from 'react';
import { Button, Badge } from 'react-bootstrap';
import { useActivateSubperiodMutation, useDeactivateSubperiodMutation } from '../../../services/api/providers/periodApi';

const SubperiodRow = ({ subperiods, isPeriodActive }) => {
  const [activateSubperiod] = useActivateSubperiodMutation();
  const [deactivateSubperiod] = useDeactivateSubperiodMutation();

  const handleActivate = async (id: number) => {
    try {
      await activateSubperiod(id).unwrap();
    } catch (error) {
      console.error('Error al activar el subperiodo:', error);
    }
  };

  const handleDeactivate = async (id: number) => {
    try {
      await deactivateSubperiod(id).unwrap();
    } catch (error) {
      console.error('Error al desactivar el subperiodo:', error);
    }
  };

  return (
    <>
      {subperiods.map((subperiod) => (
        <tr key={subperiod.id}>
          <td>
            <strong>{subperiod.name}</strong>{' '}
            <Badge bg={subperiod.isCurrent ? 'success' : 'danger'}>
              {subperiod.isCurrent ? 'Activo' : 'Inactivo'}
            </Badge>
          </td>
          <td>{subperiod.key}</td>
          <td>{new Date(subperiod.startDate).toLocaleDateString()}</td>
          <td>{new Date(subperiod.endDate).toLocaleDateString()}</td>
          <td>
            <Button
              variant="outline-success"
              size="sm"
              onClick={() => handleActivate(subperiod.id)}
              disabled={!isPeriodActive || subperiod.isCurrent}
              className="me-2 rounded-pill"
              style={{ minWidth: '90px' }}
            >
              <i className="fa-solid fa-check-circle me-1"></i> Activar
            </Button>
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => handleDeactivate(subperiod.id)}
              disabled={!isPeriodActive || !subperiod.isCurrent}
              className="rounded-pill"
              style={{ minWidth: '90px' }}
            >
              <i className="fa-solid fa-times-circle me-1"></i> Desactivar
            </Button>
          </td>
        </tr>
      ))}
    </>
  );
};

export default SubperiodRow;
