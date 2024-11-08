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
    <form
  onSubmit={handleSubmit}
  className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg"
>
    <hr />
    <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
      <hr />Crear Nuevo Nivel Académico <hr />
    </h2>
    <hr />
  <div className=' d-flex justify-content-evenly align-content-center'>
    
    <div className="">

      <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
        <h4>
          Nombre: 
        </h4>
      </label>
      <input
        id="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        disabled={isLoading}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200"
      />
    </div>

    <button
      type="submit"
      disabled={isLoading}
      className={` font-semibold rounded-md transition-all duration-300 ${
        isLoading
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500'
        }`}
        >
      {isLoading ? 'Creando...' : 'Crear Nivel Académico'}
    </button>
  </div>
  <hr />
  <hr />
</form>
  );
};

export default CreateAcademicLevelForm;
