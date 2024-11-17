// src/components/MyEvaluation.tsx
import React from 'react';

import { Link } from 'react-router-dom';
import { EvaluationWithClassDto } from '../../../interfaces/class';
import { useGetUserEvaluationsQuery } from '../../../services/api/providers/evaluationApi';

const MyEvaluations: React.FC = () => {
  const { data, error, isLoading } = useGetUserEvaluationsQuery();

  console.log('Evaluaciones del usuario:', data);

  if (isLoading) {
    return <div>Cargando evaluaciones...</div>;
  }

  if (error) {
    return <div>Error al cargar las evaluaciones.</div>;
  }

  if (!Array.isArray(data) || data.length === 0) {
    return <div>No tienes evaluaciones asignadas.</div>;
  }

  return (
    <div>
      <h2>Tus Evaluaciones</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {data.map((item: EvaluationWithClassDto, index: number) => (
          <li
            key={`${item.evaluation.id}-${item.class.id}-${index}`}
            style={{
              marginBottom: '20px',
              border: '1px solid #ccc',
              padding: '15px',
              borderRadius: '5px',
            }}
          >
            <h3>{item.evaluation.title}</h3>
            <p>{item.evaluation.description}</p>
            <p>
              <strong>Fecha Programada:</strong>{' '}
              {item.evaluation.scheduledDate
                ? new Date(item.evaluation.scheduledDate).toLocaleDateString()
                : 'No programada'}
            </p>
            <p>
              <strong>Asignatura:</strong> {item.class.subjectName}
            </p>
            <p>
              <strong>Nombre de la Asignatura:</strong> {item.class.subject.name}
            </p>
            <p>
              <strong>Clave de la Asignatura:</strong> {item.class.subject.clave}
            </p>
            <p>
              <strong>Asignatura Activa:</strong>{' '}
              {item.class.subject.isActive ? 'Sí' : 'No'}
            </p>
            <p>
              <strong>Profesor:</strong>{' '}
              {item.class.teacher.user
                ? `${item.class.teacher.user.name} ${item.class.teacher.user.lastName}`
                : 'Información del profesor no disponible'}
            </p>
            <Link to={`/evaluation/${item.evaluation.id}`}>
              <button>Responder Evaluación</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyEvaluations;
