// src/pages/AcademicLevelPage.tsx

import React, { useState } from 'react';
import { AcademicLevel } from '../../../interfaces/academic-level';
import AcademicLevelList from '../../components/academic-level/AcademicLevelList';
import CreateAcademicLevelForm from '../../components/academic-level/CreateAcademicLevelForm';
import UpdateAcademicLevelForm from '../../components/academic-level/UpdateAcademicLevelForm';

const AcademicLevelPage: React.FC = () => {
  const [selectedAcademicLevel, setSelectedAcademicLevel] = useState<AcademicLevel | null>(null);

  const handleEdit = (academicLevel: AcademicLevel) => {
    setSelectedAcademicLevel(academicLevel);
  };

  const handleUpdateSuccess = () => {
    setSelectedAcademicLevel(null);
  };

  return (
    <div className="min-h-screen py-8 px-4 bg-light">
      <div className="container">
        <h1 className="text-3xl font-semibold text-center mb-6">
          Gestión de Niveles Académicos
        </h1>

        {/* Formulario para crear un nuevo nivel académico */}
        <div className="card p-4 mb-4 shadow-sm">
          <CreateAcademicLevelForm />
        </div>

        {/* Lista de niveles académicos */}
        <div className="card p-4 mb-4 shadow-sm">
          <AcademicLevelList onEdit={handleEdit} />
        </div>

        {/* Formulario para actualizar un nivel académico */}
        {selectedAcademicLevel && (
          <div className="card p-4 shadow-sm">
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
