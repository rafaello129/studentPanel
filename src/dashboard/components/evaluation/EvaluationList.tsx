// src/components/EvaluationList.tsx

import React from 'react';
import { useGetEvaluationsQuery } from '../../../services/api/providers/evaluationApi';

const EvaluationList: React.FC = () => {
  const { data, error, isLoading } = useGetEvaluationsQuery({
    page: 1,
    limit: 10,
    isActive: true,
    packageId: 2,
    relationCheck: true,
  });

  if (isLoading) return <div>Cargando evaluaciones...</div>;
  if (error) return <div>Error al cargar las evaluaciones.</div>;

  return (
    <div>
      <h2>Lista de Evaluaciones</h2>
      <ul>
        {data?.data.map((evaluation) => (
          <li key={evaluation.id}>
            <h3>{evaluation.title}</h3>
            <p>{evaluation.description}</p>
            {/* Otros detalles */}
          </li>
        ))}
      </ul>
      <p>Página: {data?.page} de {Math.ceil(data?.total / data?.limit)}</p>
    </div>
  );
};

export default EvaluationList;
