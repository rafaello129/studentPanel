// src/components/EvaluationView.tsx

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  useGetEvaluationQuery,
} from '../../../services/api/providers/evaluationApi';
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Paper,
} from '@mui/material';
import { QuestionTypeEnum } from '../question/CreateQuestionComponent';

const EvaluationView: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Obtener el ID de la evaluación desde los parámetros de la ruta
  const navigate = useNavigate();

  const evaluationId = Number(id);

  // Obtener la evaluación por ID
  const { data, error, isLoading } = useGetEvaluationQuery(evaluationId);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !data?.data) {
    return (
      <Typography color="error" sx={{ mt: 4 }}>
        Error al cargar la evaluación.
      </Typography>
    );
  }

  const evaluation = data.data;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Detalles de la Evaluación
      </Typography>

      <Typography variant="h6">Título:</Typography>
      <Typography variant="body1" gutterBottom>
        {evaluation.title}
      </Typography>

      <Typography variant="h6">Descripción:</Typography>
      <Typography variant="body1" gutterBottom>
        {evaluation.description}
      </Typography>

      <Typography variant="h6">Nivel Académico:</Typography>
      <Typography variant="body1" gutterBottom>
        {evaluation.academicLevel?.name || 'N/A'}
      </Typography>

      <Typography variant="h6">Es Plantilla:</Typography>
      <Typography variant="body1" gutterBottom>
        {evaluation.isTemplate ? 'Sí' : 'No'}
      </Typography>

      <Typography variant="h6">Está Activa:</Typography>
      <Typography variant="body1" gutterBottom>
        {evaluation.isActive ? 'Sí' : 'No'}
      </Typography>

      {/* Renderizar las secciones y preguntas */}
      {evaluation.sections.map((section) => (
        <Paper key={section.id} sx={{ p: 2, mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            {section.title}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {section.description}
          </Typography>

          {/* Lista de preguntas */}
          {section.questions.map((question) => (
            <Box key={question.id} sx={{ mt: 2, ml: 2 }}>
              <Typography variant="h6">{question.text}</Typography>
              <Typography variant="body2" color="text.secondary">
                Tipo de Pregunta: {question.questionType.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Permite Múltiples Respuestas: {question.allowMultipleAnswers ? 'Sí' : 'No'}
              </Typography>

              {/* Mostrar opciones de respuesta si no es una pregunta abierta */}
              {question.questionType.name !== QuestionTypeEnum.OPEN_ENDED && (
                <Box sx={{ mt: 1, ml: 2 }}>
                  <Typography variant="subtitle1">Opciones de Respuesta:</Typography>
                  <ul>
                    {question.answerOptions.map((option) => (
                      <li key={option.id}>
                        <Typography variant="body2">
                          {option.text} (Puntuación: {option.score})
                        </Typography>
                      </li>
                    ))}
                  </ul>
                </Box>
              )}
            </Box>
          ))}
        </Paper>
      ))}

      {/* Botón para regresar a la lista de evaluaciones */}
      <Button variant="contained" color="primary" sx={{ mt: 4 }} onClick={() => navigate(-1)}>
        Volver a la Lista de Evaluaciones
      </Button>
    </Box>
  );
};

export default EvaluationView;
