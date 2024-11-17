// src/components/MyEvaluation.tsx
import React from 'react';
import { useGetUserEvaluationsQuery } from '../../../services/api/providers/evaluationApi';
import { Box, Typography, List } from '@mui/material';
import { EvaluationWithClassDto } from '../../../interfaces/class';
import MyEvaluationItem from '../../components/MyEvaluation/MyEvaluationItem';

const MyEvaluation: React.FC = () => {
  const { data, error, isLoading } = useGetUserEvaluationsQuery();

  console.log('Evaluaciones del usuario:', data);

  if (isLoading) {
    return <Typography>Cargando evaluaciones...</Typography>;
  }

  if (error) {
    return <Typography color="error">Error al cargar las evaluaciones.</Typography>;
  }

  if (!Array.isArray(data) || data.length === 0) {
    return <Typography>No tienes evaluaciones asignadas.</Typography>;
  }

  const totalEvaluations = data.length;

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Tus Evaluaciones
      </Typography>
      <List>
        {data.map((item: EvaluationWithClassDto, index: number) => (
          <MyEvaluationItem
            key={`${item.evaluation.id}-${item.class.id}-${index}`}
            item={item}
            index={index}
            total={totalEvaluations}
          />
        ))}
      </List>
    </Box>
  );
};

export default MyEvaluation;
