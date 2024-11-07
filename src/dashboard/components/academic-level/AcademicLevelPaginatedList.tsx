// src/components/AcademicLevelPaginatedList.tsx

import React, { useState } from 'react';
import { useGetPaginatedAcademicLevelsQuery } from '../../../services/api/providers/academicLevelApi';

const AcademicLevelPaginatedList: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data, error, isLoading } = useGetPaginatedAcademicLevelsQuery({ page, limit: 10 });

  if (isLoading) return <div>Cargando niveles académicos...</div>;
  if (error) return <div>Error al cargar los niveles académicos.</div>;

  const totalPages = data ? Math.ceil(data.total / data.limit) : 1;

  return (
    <div>
      <h2>Lista de Niveles Académicos (Paginada)</h2>
      <ul>
        {data?.data?.map((level) => (
          <li key={level.id}>
            <p>{level.name}</p>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
          Anterior
        </button>
        <span>
          Página {page} de {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => (data && prev < totalPages ? prev + 1 : prev))}
          disabled={data && page >= totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default AcademicLevelPaginatedList;
