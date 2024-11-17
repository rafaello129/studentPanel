// src/components/MyEvaluationDetail.tsx
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  Button,
  Stack,
  Divider,
} from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useDispatch, useSelector } from 'react-redux';
import {
  useGetEvaluationQuery
} from '../../../services/api/providers/evaluationApi';
import {
  setEvaluationId,
  resetResponses,
  setAnswer,
} from '../../../store/slices/responseSlice';
import { RootState } from '../../../store/store';
import MySection from './MySection';
import { useGetUserResponsesByEvaluationQuery, useSubmitEvaluationMutation } from '../../../services/api/providers/userResponseApi';
import { Snackbar, Alert } from '@mui/material';

const MyEvaluationDetail: React.FC = () => {

  const [snackbar, setSnackbar] = React.useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({ open: false, message: '', severity: 'success' });
  
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  const { id, idClass } = useParams<{ id: string; idClass: string }>();
  const classId = Number(idClass);
  const evaluationId = Number(id);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Hooks de RTK Query para obtener datos de la evaluación y respuestas del usuario
  const { data: evaluationData, error, isLoading } = useGetEvaluationQuery(evaluationId);
  const { data: responsesData, refetch } = useGetUserResponsesByEvaluationQuery({
    evaluationId,
    idClass: classId,
  });
  const [submitEvaluation, { isLoading: isSubmitting }] = useSubmitEvaluationMutation();

  // Acceder al estado de las respuestas desde el store de Redux
  const answers = useSelector((state: RootState) => state.responses.answers);

  // Estado local para manejar las preguntas contestadas
  const [answeredQuestions, setAnsweredQuestions] = React.useState<Set<number>>(new Set());

  // Efecto para establecer el ID de la evaluación en el store y limpiar respuestas al desmontar
  useEffect(() => {
    dispatch(setEvaluationId(evaluationId));
    return () => {
      dispatch(resetResponses());
    };
  }, [dispatch, evaluationId]);

  // Efecto para mapear las respuestas existentes y verificar si todas las secciones han sido contestadas
  useEffect(() => {
    if (responsesData?.data) {
      const updatedAnsweredQuestions = new Set<number>();
      responsesData.data.forEach((response) => {
        updatedAnsweredQuestions.add(response.question.id);
      });
      setAnsweredQuestions(updatedAnsweredQuestions);

      // Verificar si todas las secciones han sido contestadas
      const allAnswered = evaluationData?.data.sections.every((section) =>
        section.questions.every((question) => updatedAnsweredQuestions.has(question.id))
      );

      if (allAnswered) {
        navigate('/'); // Redirigir al inicio si todo está contestado
      }
    }
  }, [responsesData, evaluationData, navigate]);

  // Manejar cambios en las respuestas de las preguntas
  const handleAnswerChange = (questionId: number, answer: any) => {
    dispatch(setAnswer({ questionId, answer }));
  };

  // Manejar el envío de una sección
  const handleSectionSubmit = async (sectionId: number) => {
    const section = evaluationData?.data.sections.find((sec) => sec.id === sectionId);
    if (!section) return;

    // Obtener las respuestas de la sección
    const sectionAnswers = section.questions.map((question) => ({
      questionId: question.id,
      ...answers[question.id],
    }));

    const submission = {
      evaluationId,
      classId: classId,
      answers: sectionAnswers,
    };

    try {
      console.log('Enviando respuestas de la sección:', submission);
      await submitEvaluation(submission).unwrap();
      // Mostrar mensaje de éxito utilizando Snackbar o similar
      // Aquí, por simplicidad, seguimos usando alert, pero se recomienda usar Snackbar
      setSnackbar({
        open: true,
        message: 'Sección enviada correctamente.',
        severity: 'success',
      });
      // Refrescar las respuestas después del envío
      await refetch();
    } catch (err) {
      console.error('Error al enviar la sección:', err);
      setSnackbar({
        open: true,
        message: 'Error al enviar la sección.',
        severity: 'error',
      });
      // Mostrar mensaje de error de manera más profesional
      // Aquí reemplazamos el alert con una redirección a una página de error o un componente de error
      // Por simplicidad, mostramos una alerta estilizada
      navigate(`/error?message=${encodeURIComponent('Error al enviar la sección.')}`);
    }
  };

  // Renderizar estados de carga y error utilizando componentes de MUI
  if (isLoading) {
    return (
      <Container maxWidth="md" sx={{ textAlign: 'center', mt: 10 }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Cargando evaluación...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      
      <Container maxWidth="md" sx={{ mt: 10 }}>
    
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          p={4}
          borderRadius={2}
          boxShadow={3}
          bgcolor="#fff3f3"
        >
          <ErrorOutlineIcon color="error" sx={{ fontSize: 60, mb: 2 }} />
          <Typography variant="h5" color="error" gutterBottom>
            Ocurrió un error al cargar la evaluación
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>
            Por favor, inténtalo de nuevo más tarde.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => refetch()}
            startIcon={<AssignmentIcon />}
          >
            Reintentar
          </Button>
        </Box>
      </Container>
    );
  }

  if (!evaluationData?.data) {
    return (
      <Container maxWidth="md" sx={{ mt: 10 }}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          p={4}
          borderRadius={2}
          boxShadow={3}
          bgcolor="#fffbe6"
        >
          <WarningAmberIcon color="warning" sx={{ fontSize: 60, mb: 2 }} />
          <Typography variant="h5" color="warning.main" gutterBottom>
            Evaluación no encontrada
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>
            La evaluación que buscas no existe o ha sido eliminada.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/')}
            startIcon={<AssignmentIcon />}
          >
            Volver al Inicio
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
          <Snackbar
  open={snackbar.open}
  autoHideDuration={6000}
  onClose={handleCloseSnackbar}
  anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
>
  <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
    {snackbar.message}
  </Alert>
</Snackbar>
      {/* Encabezado de la Evaluación */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box display="flex" alignItems="center" mb={2}>
            <AssignmentIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
            <Typography variant="h4" component="h1" fontWeight="bold">
              {evaluationData.data.title}
            </Typography>
          </Box>
          <Typography variant="body1" color="text.secondary">
            {evaluationData.data.description}
          </Typography>
        </CardContent>
      </Card>

      {/* Listado de Secciones */}
      <Grid container spacing={4}>
        {evaluationData.data.sections.map((section) => (
          <Grid item xs={12} key={section.id}>
            <MySection
              section={section}
              onAnswerChange={handleAnswerChange}
              existingAnswers={answers}
              answeredQuestions={answeredQuestions}
              onSubmitSection={handleSectionSubmit}
              isSubmitting={isSubmitting}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MyEvaluationDetail;
