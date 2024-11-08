// src/components/AcademicLevelPaginatedList.tsx

import React, { useState } from 'react';
import { useGetPaginatedAcademicLevelsQuery } from '../../../services/api/providers/academicLevelApi';

const AcademicLevelPaginatedList: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data, error, isLoading } = useGetPaginatedAcademicLevelsQuery({ page, limit: 10 });

  const totalPages = data ? Math.ceil(data.total / data.limit) : 1;

  if (isLoading) return <div>Cargando niveles académicos...</div>;
  if (error) return <div>Error al cargar los niveles académicos.</div>;

  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <h2 className="text-xl font-semibold mb-4 text-center">Lista de Niveles Académicos (Paginada)</h2>
      <ul className="list-group list-group-flush mb-3">
        {data?.data?.map((level) => (
          <li key={level.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{level.name}</span>
          </li>
        ))}
      </ul>
      <div className="d-flex justify-content-between align-items-center">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="btn btn-primary"
        >
          Anterior
        </button>
        <span>
          Página {page} de {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => (data && prev < totalPages ? prev + 1 : prev))}
          disabled={data && page >= totalPages}
          className="btn btn-primary"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default AcademicLevelPaginatedList;
