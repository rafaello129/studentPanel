import React from 'react';
import { Badge } from 'react-bootstrap';

const StatusToggle = ({ isActive }) => {
  return (
    <Badge bg={isActive ? 'success' : 'secondary'}>
      {isActive ? 'Activo' : 'Inactivo'}
    </Badge>
  );
};

export default StatusToggle;
