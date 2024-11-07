// src/components/AcademicLevelList.tsx

import React from 'react';
import DeleteAcademicLevelButton from './DeleteAcademicLevelButton';
import { AcademicLevel } from '../../../interfaces/academic-level';
import { useGetAllAcademicLevelsQuery } from '../../../services/api/providers/academicLevelApi';


interface AcademicLevelListProps {
  onEdit: (academicLevel: AcademicLevel) => void;
}

const AcademicLevelList: React.FC<AcademicLevelListProps> = ({ onEdit }) => {
  const { data, error, isLoading } = useGetAllAcademicLevelsQuery();

  if (isLoading) return <div>Cargando niveles académicos...</div>;
  if (error) return <div>Error al cargar los niveles académicos.</div>;

  return (
    <div>
      <h2>Lista de Niveles Académicos</h2>
      <ul>
        {data?.data?.map((level) => (
          <li key={level.id}>
            <p>{level.name}</p>
            <button onClick={() => onEdit(level)}>Editar</button>
            <DeleteAcademicLevelButton id={level.id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AcademicLevelList;
