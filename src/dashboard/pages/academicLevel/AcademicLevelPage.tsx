// src/pages/AcademicLevelPage.tsx

import React, { useState } from 'react';
import { AcademicLevel } from '../../../interfaces/academic-level';
import AcademicLevelList from '../../components/academic-level/AcademicLevelList';
import CreateAcademicLevelForm from '../../components/academic-level/CreateAcademicLevelForm';
import UpdateAcademicLevelForm from '../../components/academic-level/UpdateAcademicLevelForm';

const AcademicLevelPage: React.FC = () => {
  const [selectedAcademicLevel, setSelectedAcademicLevel] = useState<AcademicLevel | null>(null);

  // Handler para cuando se selecciona un nivel académico para actualizar
  const handleEdit = (academicLevel: AcademicLevel) => {
    setSelectedAcademicLevel(academicLevel);
  };

  // Handler para limpiar la selección después de actualizar
  const handleUpdateSuccess = () => {
    setSelectedAcademicLevel(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <hr />
        <hr />
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Gestión de Niveles Académicos
        </h1>
        <hr />
  
        {/* Formulario para crear un nuevo nivel académico */}
        <div className="mb-8">
          <CreateAcademicLevelForm />
        </div>
  
        {/* Lista de niveles académicos */}
        <div className="mb-8">
          <AcademicLevelList onEdit={handleEdit} />
        </div>
  
        {/* Formulario para actualizar un nivel académico */}
        {selectedAcademicLevel && (
          <div className="mt-6">
            <UpdateAcademicLevelForm
              id={selectedAcademicLevel.id}
              onUpdateSuccess={handleUpdateSuccess}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AcademicLevelPage;
