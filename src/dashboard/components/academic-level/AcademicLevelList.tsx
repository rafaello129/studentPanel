// src/components/AcademicLevelList.tsx

import React from 'react';
import { AcademicLevel } from '../../../interfaces/academic-level';
import { useGetAllAcademicLevelsQuery } from '../../../services/api/providers/academicLevelApi';
import DeleteAcademicLevelButton from './DeleteAcademicLevelButton';

interface AcademicLevelListProps {
  onEdit: (academicLevel: AcademicLevel) => void;
}

const AcademicLevelList: React.FC<AcademicLevelListProps> = ({ onEdit }) => {
  const { data, error, isLoading } = useGetAllAcademicLevelsQuery();

  if (isLoading) return <div>Cargando niveles académicos...</div>;
  if (error) return <div>Error al cargar los niveles académicos.</div>;

  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <h2 className="text-xl font-semibold mb-3">Lista de Niveles Académicos</h2>
      <ul className="list-group list-group-flush">
        {data?.data?.map((level) => (
          <li key={level.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{level.name}</span>
            <div className="d-flex gap-2">
              <button className="btn btn-sm btn-info" onClick={() => onEdit(level)}>
                Editar
              </button>
              <DeleteAcademicLevelButton id={level.id} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AcademicLevelList;
