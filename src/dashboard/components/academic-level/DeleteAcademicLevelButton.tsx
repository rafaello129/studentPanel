// src/components/DeleteAcademicLevelButton.tsx

import React from 'react';
import { useDeleteAcademicLevelMutation } from '../../../services/api/providers/academicLevelApi';

interface Props {
  id: number;
}

const DeleteAcademicLevelButton: React.FC<Props> = ({ id }) => {
  const [deleteAcademicLevel, { isLoading }] = useDeleteAcademicLevelMutation();

  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este nivel académico?')) {
      try {
        await deleteAcademicLevel(id).unwrap();
        alert('Nivel académico eliminado exitosamente');
      } catch (error) {
        alert('Error al eliminar el nivel académico');
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isLoading}
      className={`btn btn-sm ${isLoading ? 'btn-secondary' : 'btn-danger'} ms-2`}
    >
      {isLoading ? 'Eliminando...' : 'Eliminar'}
    </button>
  );
};

export default DeleteAcademicLevelButton;
