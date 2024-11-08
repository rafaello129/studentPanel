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
    <form onSubmit={handleSubmit} className="bg-white p-5 rounded shadow-sm max-w-lg mx-auto">
      <h2 className="text-center text-2xl font-semibold mb-4 text-gray-800">
        Crear Nuevo Nivel Académico
      </h2>
      <hr className="mb-4" />
      <div className="mb-3">
        <label htmlFor="name" className="form-label font-medium text-gray-700">
          Nombre del Nivel Académico
        </label>
        <input
          id="name"
          type="text"
          className="form-control border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-100"
          placeholder="Ingrese el nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>
      <div className="text-center mt-4">
        <button
          type="submit"
          className={`btn w-full font-semibold rounded-md transition-all duration-300 ${
            isLoading ? 'btn-secondary cursor-not-allowed' : 'btn-primary'
          }`}
          disabled={isLoading}
        >
          {isLoading ? 'Creando...' : 'Crear Nivel Académico'}
        </button>
      </div>
    </form>
  );
};

export default CreateAcademicLevelForm;
