// src/components/UpdateAcademicLevelForm.tsx

import React, { useState, useEffect } from 'react';
import { useGetAcademicLevelByIdQuery, useUpdateAcademicLevelMutation } from '../../../services/api/providers/academicLevelApi';

interface Props {
  id: number;
  onUpdateSuccess: () => void;
}

const UpdateAcademicLevelForm: React.FC<Props> = ({ id, onUpdateSuccess }) => {
  const { data, error, isLoading } = useGetAcademicLevelByIdQuery(id);
  const [updateAcademicLevel, { isLoading: isUpdating }] = useUpdateAcademicLevelMutation();
  const [name, setName] = useState('');

  useEffect(() => {
    if (data?.data) {
      setName(data.data.name);
    }
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateAcademicLevel({ id, name }).unwrap();
      alert('Nivel académico actualizado exitosamente');
      onUpdateSuccess();
    } catch (error) {
      alert('Error al actualizar el nivel académico');
    }
  };

  if (isLoading) return <div>Cargando nivel académico...</div>;
  if (error) return <div>Error al cargar el nivel académico.</div>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Actualizar Nivel Académico</h2>
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={isUpdating}
        />
      </div>
      <button type="submit" disabled={isUpdating}>
        {isUpdating ? 'Actualizando...' : 'Actualizar Nivel Académico'}
      </button>
    </form>
  );
};

export default UpdateAcademicLevelForm;
