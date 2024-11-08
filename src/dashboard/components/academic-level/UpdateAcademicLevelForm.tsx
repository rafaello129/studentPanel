// src/components/UpdateAcademicLevelForm.tsx

import React, { useState, useEffect } from 'react';
import { useGetAcademicLevelByIdQuery, useUpdateAcademicLevelMutation } from '../../../services/api/providers/academicLevelApi';

interface Props {
  id: number;
  onUpdateSuccess: () => void;
}

const UpdateAcademicLevelForm: React.FC<Props> = ({ id, onUpdateSuccess }) => {
  const { data, isLoading } = useGetAcademicLevelByIdQuery(id);
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

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-sm">
      <h2 className="text-xl font-semibold mb-3">Actualizar Nivel Académico</h2>
      <div className="form-group">
        <label className="form-label">Nombre</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={isUpdating}
        />
      </div>
      <button type="submit" className="btn btn-primary mt-3" disabled={isUpdating}>
        {isUpdating ? 'Actualizando...' : 'Actualizar'}
      </button>
    </form>
  );
};

export default UpdateAcademicLevelForm;
