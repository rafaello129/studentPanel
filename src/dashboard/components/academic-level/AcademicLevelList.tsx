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
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <hr />
      <hr />
  <h2 className="text-center text-2xl font-semibold text-gray-800 mb-4">
    Lista de Niveles Académicos
  </h2>
  <hr />
  <hr />
  
  <ul className="space-y-4">
    {data?.data?.map((level) => (
      


      <li
        key={level.id}
        className="d-flex flex-row align-items-center items-center justify-content-evenly bg-gray-100 p-4 rounded-lg shadow-sm"
      >
        <hr />
        <p className=" font-bold text-gray-700 font-medium">{level.name}</p>
        <hr />
        
          <button
            onClick={() => onEdit(level)}
            className="  text-sm font-semibold  bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Editar
          </button>
          
          <DeleteAcademicLevelButton id={level.id} />

      </li>
    ))}
  </ul>
</div>
  );
};

export default AcademicLevelList;
