// src/components/MyEvaluationItem.tsx
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ListItem,
  Typography,
  Divider,
  Grid,
  Chip,
  Box,
  Tooltip,
  Avatar,
  IconButton,
  CircularProgress,
  Button,
  Card,
  LinearProgress,
  Stack,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SchoolIcon from '@mui/icons-material/School';
import EditIcon from '@mui/icons-material/Edit';
import { useGetEvaluationQuery } from '../../../services/api/providers/evaluationApi';
import { useGetUserResponsesByEvaluationQuery } from '../../../services/api/providers/userResponseApi';
import { Question } from '../../../interfaces/question-type';
import { AnswerOption } from '../../../interfaces/answer-option';
import { Section } from '../../../interfaces/section';
import { EvaluationWithClassDto } from '../../../interfaces/class';
import { UserResponse } from '../../../interfaces/user-response';

interface MyEvaluationItemProps {
  item: EvaluationWithClassDto;
  index: number;
  total: number;
}

const MyEvaluationItem: React.FC<MyEvaluationItemProps> = ({ item, index, total }) => {
  const evaluationId = item.evaluation.id;
  const classId = item.class.id;

  // Obtener los detalles adicionales de la evaluación si es necesario
  const {
    data: evaluationDetails,
    error: evaluationError,
    isLoading: evaluationLoading,
  } = useGetEvaluationQuery(evaluationId);

  // Obtener las respuestas del usuario
  const {
    data: responsesData,
    error: responsesError,
    isLoading: responsesLoading,
    refetch,
  } = useGetUserResponsesByEvaluationQuery({ evaluationId, idClass: classId });

  // Uso de useMemo para memorizar el cálculo de answeredSections
  const answeredSections = useMemo(() => {
    if (
      responsesData?.data &&
      Array.isArray(responsesData.data) &&
      item.evaluation.sections &&
      evaluationDetails?.data?.sections
    ) {
      const responsesMap = new Map<number, UserResponse>();
      responsesData.data.forEach((response) => {
        responsesMap.set(response.question.id, response);
      });

      let count = 0;

      evaluationDetails.data.sections.forEach((section: Section) => {
        const allQuestionsAnswered = section.questions.every((question: Question) => {
          const response = responsesMap.get(question.id);
          if (!response) return false;

          switch (question.questionType.name) {
            case 'OPEN_ENDED':
              return response.openEndedResponse !== null && response.openEndedResponse.trim() !== '';
            case 'MULTIPLE_CHOICE':
              return (
                response.selectedOption !== null ||
                (response.selectedOptions && response.selectedOptions.length > 0)
              );
            default:
              return false; // Otros tipos de preguntas pueden manejarse aquí
          }
        });

        if (allQuestionsAnswered) {
          count += 1;
        }
      });

      return count;
    }
    return 0;
  }, [responsesData, item.evaluation.sections, evaluationDetails]);

  const isCompleted = answeredSections === (item.evaluation.sections.length || 0);

  // Manejo de estados de carga y error
  if (evaluationLoading || responsesLoading) {
    return (
      <ListItem alignItems="flex-start" sx={{ mb: 2 }}>
        <Box display="flex" alignItems="center">
          <CircularProgress size={24} />
          <Typography sx={{ ml: 2 }}>Cargando...</Typography>
        </Box>
      </ListItem>
    );
  }

  if (evaluationError || responsesError) {
    return (
      <ListItem alignItems="flex-start" sx={{ mb: 2 }}>
        <Typography color="error">Error al cargar la evaluación o las respuestas.</Typography>
      </ListItem>
    );
  }

  if (!item.evaluation) {
    return (
      <ListItem alignItems="flex-start" sx={{ mb: 2 }}>
        <Typography color="error">No se encontró la evaluación.</Typography>
      </ListItem>
    );
  }

  return (
    <React.Fragment key={`${evaluationId}-${classId}-${index}`}>
    <ListItem alignItems="flex-start" sx={{ mb: 2, padding: 0 }}>
  <Card
    elevation={4}
    sx={{
      width: '100%',
      borderRadius: 3,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: { xs: 'column', sm: 'row' },
    }}
  >
    {/* Información de la Asignatura y Profesor */}
    <Grid container spacing={2} sx={{ flex: 1 }}>
      <Grid item xs={12} sm={4}>
        <Box sx={{ padding: 3, backgroundColor: '#f5f5f5', height: '100%' }}>
         
          {/* Información del Profesor */}
          <Box display="flex" alignItems="center" mb={2}>
            <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
              {item.class.teacher.user?.name.charAt(0).toUpperCase() || 'P'}
            </Avatar>
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">
                {item.class.teacher.user
                  ? `${item.class.teacher.user.name} ${item.class.teacher.user.lastName}`
                  : 'Información del profesor no disponible'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.class.teacher.user?.fullName || ''}
              </Typography>
            </Box>
          </Box>
          {/* Separador */}
          <Divider sx={{ my: 2 }} />
         
          {/* Información de la Asignatura */}
          <Box display="flex" alignItems="center" mb={2}>
            <SchoolIcon color="secondary" sx={{ fontSize: 30, mr: 1 }} />
            <Typography variant="h6" component="div">
              {item.class.subject.name}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Clave: {item.class.subject.clave}
          </Typography>
          <Typography variant="body2" color={item.class.subject.isActive ? 'green' : 'red'} gutterBottom>
            {item.class.subject.isActive ? 'Activo' : 'Inactivo'}
          </Typography>
          
         
          
         
        </Box>
      </Grid>
      
      {/* Información de la Evaluación */}
      <Grid item xs={12} sm={8}>
        <Box sx={{ padding: 3 }}>
          {/* Encabezado con Icono y Título */}
          <Box display="flex" alignItems="center" mb={2}>
            <AssignmentIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
            <Typography variant="h5" component="div" fontWeight="bold">
              {item.evaluation.title}
            </Typography>
          </Box>
          
          {/* Descripción de la Evaluación */}
          <Typography variant="body1" color="text.secondary" gutterBottom>
            {item.evaluation.description}
          </Typography>
          
          {/* Estado de Secciones Contestadas y Barra de Progreso */}
          <Box mt={3}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Chip
                icon={<AssignmentIcon />}
                label={`${answeredSections} de ${item.evaluation.sections.length} secciones contestadas`}
                color={isCompleted ? 'success' : 'warning'}
                size="medium"
                sx={{ fontWeight: 'bold' }}
              />
              {isCompleted && (
                <Tooltip title="Evaluación completada">
                  <CheckCircleIcon color="success" fontSize="medium" />
                </Tooltip>
              )}
            </Stack>
            
            {/* Barra de Progreso */}
            <Box mt={2}>
              <LinearProgress
                variant="determinate"
                value={(answeredSections / item.evaluation.sections.length) * 100}
                color={isCompleted ? 'success' : 'primary'}
                sx={{ height: 12, borderRadius: 6 }}
              />
            </Box>
            
            {/* Texto de Feedback */}
            <Typography variant="body2" color="text.secondary" mt={1}>
              {isCompleted 
                ? '¡Has completado todas las secciones!' 
                : `Avance: ${(answeredSections / item.evaluation.sections.length * 100).toFixed(0)}%`}
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
    
    {/* Botones de Acción */}
  {!isCompleted&&  <Box
      sx={{
        padding: 2,
        backgroundColor: '#fafafa',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderLeft: { sm: '1px solid #e0e0e0' },
      }}
    >
      <Tooltip title="Responder Evaluación">
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to={`/evaluation/${evaluationId}/${item.class.id}`}
          startIcon={<AssignmentIcon />}
          sx={{
            textTransform: 'none',
            fontWeight: 'bold',
            boxShadow: 3,
            '&:hover': {
              boxShadow: 6,
            },
          }}
        >
          Responder
        </Button>
      </Tooltip>
    </Box>}
  </Card>
  
  {/* Renderizar Divider si no es el último elemento */}
  {index < total - 1 && <Divider />}
</ListItem>


    </React.Fragment>
  );
};

export default MyEvaluationItem;
