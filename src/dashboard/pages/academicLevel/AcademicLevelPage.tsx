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
    <div>
      <h1>Gestión de Niveles Académicos</h1>

      {/* Formulario para crear un nuevo nivel académico */}
      <CreateAcademicLevelForm />

      {/* Lista de niveles académicos */}
      <AcademicLevelList onEdit={handleEdit} />

      {/* Formulario para actualizar un nivel académico */}
      {selectedAcademicLevel && (
        <UpdateAcademicLevelForm
          id={selectedAcademicLevel.id}
          onUpdateSuccess={handleUpdateSuccess}
        />
      )}
    </div>
  );
};

export default AcademicLevelPage;
