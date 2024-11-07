// src/components/CreateAcademicLevelForm.tsx

import React, { useState } from 'react';
import { useCreateAcademicLevelMutation } from '../../../services/api/providers/academicLevelApi';

const CreateAcademicLevelForm: React.FC = () => {
  const [name, setName] = useState('');
  const [createAcademicLevel, { isLoading }] = useCreateAcademicLevelMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createAcademicLevel({ name }).unwrap();
      alert('Nivel académico creado exitosamente');
      setName('');
    } catch (error) {
      alert('Error al crear el nivel académico');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Crear Nuevo Nivel Académico</h2>
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Creando...' : 'Crear Nivel Académico'}
      </button>
    </form>
  );
};

export default CreateAcademicLevelForm;
