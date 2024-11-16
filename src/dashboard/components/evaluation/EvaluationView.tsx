// src/components/EvaluationView.tsx

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  useGetEvaluationQuery,
} from '../../../services/api/providers/evaluationApi';
import {
  School as SchoolIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Description as DescriptionIcon,
  Title as TitleIcon,
  Description as TemplateIcon,
  Description as NotTemplateIcon,
  ExpandMore,
  RadioButtonChecked,
  CheckBox as CheckBoxIcon,
  ShortText,
  ArrowBack,
} from '@mui/icons-material';
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Paper,
  Card,
  CardContent,
  Divider,
  Grid,
  Chip,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
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
   
   <Card sx={{ maxWidth: "100vw", margin: '0 auto', mt: 4 }}>
      <CardContent>
        {/* Título principal */}
        <Typography variant="h4" component="h1" gutterBottom textAlign="center">
          Detalles de la Evaluación
        </Typography>

        {/* Información de la evaluación */}
        <Grid container spacing={2}>
          {/* Título de la evaluación */}
          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              <TitleIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h5" component="h2">
                {evaluation.title}
              </Typography>
            </Box>
          </Grid>

          {/* Descripción */}
          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              <DescriptionIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="body1">
                {evaluation.description}
              </Typography>
            </Box>
          </Grid>

          {/* Nivel Académico */}
          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center">
              <SchoolIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="body2">
                Nivel Académico:
              </Typography>
              <Typography variant="body2" sx={{ ml: 1, fontWeight: 'bold' }}>
                {evaluation.academicLevel?.name || 'N/A'}
              </Typography>
            </Box>
          </Grid>

          {/* Es Plantilla */}
          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center">
              {evaluation.isTemplate ? (
                <TemplateIcon color="warning" sx={{ mr: 1 }} />
              ) : (
                <NotTemplateIcon color="disabled" sx={{ mr: 1 }} />
              )}
              <Typography variant="body2">
             Tipo:
              </Typography>
              <Typography variant="body2" sx={{ ml: 1, fontWeight: 'bold' }}>
                {evaluation.isTemplate ? 'Plantilla' : 'Evaluación'}
              </Typography>
            </Box>
          </Grid>

          {/* Está Activa */}
          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center">
              {evaluation.isActive ? (
                <CheckCircleIcon color="success" sx={{ mr: 1 }} />
              ) : (
                <CancelIcon color="error" sx={{ mr: 1 }} />
              )}
              <Typography variant="body2">
                Está Activa:
              </Typography>
              <Typography variant="body2" sx={{ ml: 1, fontWeight: 'bold' }}>
                {evaluation.isActive ? 'Sí' : 'No'}
              </Typography>
            </Box>
          </Grid>

          {/* Estado con Chip */}
          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center">
              <Typography variant="body2" sx={{ mr: 1 }}>
                Estado:
              </Typography>
              <Chip
                label={evaluation.isActive ? 'Activa' : 'Inactiva'}
                color={evaluation.isActive ? 'success' : 'default'}
                icon={
                  evaluation.isActive ? (
                    <CheckCircleIcon />
                  ) : (
                    <CancelIcon />
                  )
                }
              />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>

      {/* Renderizar las secciones y preguntas */}
      {evaluation.sections.map((section) => (
        <Paper key={section.id} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          {section.title}
        </Typography>
        {section.description && (
          <Typography variant="body1" gutterBottom>
            {section.description}
          </Typography>
        )}
      
        <Divider sx={{ my: 2 }} />
      
        {/* Lista de preguntas */}
        {section.questions.map((question) => (
          <Accordion key={question.id} sx={{ mb: 2 }}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls={`panel${question.id}-content`}
              id={`panel${question.id}-header`}
            >
              <Typography variant="subtitle1">
                {question.text}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
            
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Permite Múltiples Respuestas: {question.allowMultipleAnswers ? 'Sí' : 'No'}
              </Typography>
      
              {/* Mostrar opciones de respuesta si no es una pregunta abierta */}
              {question.questionType.name !== QuestionTypeEnum.OPEN_ENDED ? (
                <>
                  <Typography variant="subtitle2" sx={{ mt: 2 }}>
                    Opciones de Respuesta:
                  </Typography>
                  <List>
                    {question.answerOptions.map((option) => (
                      <ListItem key={option.id}>
                        <ListItemIcon>
                          {question.questionType.name === QuestionTypeEnum.SINGLE_CHOICE ? (
                            <RadioButtonChecked />
                          ) : (
                            <CheckBoxIcon />
                          )}
                        </ListItemIcon>
                        <ListItemText
                          primary={option.text}
                          secondary={`Puntuación: ${option.score}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </>
              ) : (
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                  <ShortText sx={{ mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    Esta es una pregunta abierta. No hay opciones de respuesta.
                  </Typography>
                </Box>
              )}
            </AccordionDetails>
          </Accordion>
        ))}
      </Paper>
      ))}

      {/* Botón para regresar a la lista de evaluaciones */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
        >
          Volver a la Lista de Evaluaciones
        </Button>
      </Box>
    </Box>
  );
};

export default EvaluationView;
