// src/components/CreateEvaluationForm.tsx

import React, { useState } from 'react';
import { CreateEvaluation } from '../../../interfaces/evaluation';
import { useCreateEvaluationMutation } from '../../../services/api/providers/evaluationApi';

const CreateEvaluationForm: React.FC = () => {
  const [createEvaluation, { isLoading }] = useCreateEvaluationMutation();
  const [formData, setFormData] = useState<CreateEvaluation>({
    title: '',
    description: '',
    academicLevelId: 10, // Asegúrate de que este ID exista
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
  
    // Verificar si el target es un HTMLInputElement y si es un checkbox
    const newValue =
      type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : value;
  
    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createEvaluation(formData).unwrap();
      alert('Evaluación creada exitosamente');
      // Reiniciar el formulario o realizar otras acciones
    } catch (error) {
      alert('Error al crear la evaluación');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Crear Nueva Evaluación</h2>
      <div>
        <label>Título:</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} required />
      </div>
      <div>
        <label>Descripción:</label>
        <textarea name="description" value={formData.description} onChange={handleChange} />
      </div>
      <div>
        <label>¿Es Plantilla?</label>
        <input type="checkbox" name="isTemplate" checked={formData.isTemplate} onChange={handleChange} />
      </div>
      <div>
        <label>Fecha Programada:</label>
        <input type="datetime-local" name="scheduledDate" value={formData.scheduledDate} onChange={handleChange} />
      </div>
      <div>
        <label>¿Está Activa?</label>
        <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} />
      </div>
      <div>
        <label>Nivel Académico:</label>
        <select name="academicLevelId" value={formData.academicLevelId} onChange={handleChange} required>
          <option value={10}>Nivel 1</option>
          <option value={2}>Nivel 2</option>
          {/* Añade más opciones según tus niveles académicos */}
        </select>
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Creando...' : 'Crear Evaluación'}
      </button>
    </form>
  );
};

export default CreateEvaluationForm;
