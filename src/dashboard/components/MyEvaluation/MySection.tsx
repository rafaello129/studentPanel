// src/components/MySection.tsx
import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Stack,
  Divider,
  Tooltip,
  CircularProgress,
} from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Section as SectionType } from '../../../interfaces/section';
import MyQuestion from './MyQuestion';

interface SectionProps {
  section: SectionType;
  onAnswerChange: (questionId: number, answer: any) => void;
  existingAnswers: { [questionId: number]: any };
  answeredQuestions: Set<number>;
  onSubmitSection: (sectionId: number) => void;
  isSubmitting: boolean;
}

const MySection: React.FC<SectionProps> = ({
  section,
  onAnswerChange,
  existingAnswers,
  answeredQuestions,
  onSubmitSection,
  isSubmitting,
}) => {
  // Verificar si la sección ya ha sido contestada
  const isSectionAnswered = section.questions.every((question) =>
    answeredQuestions.has(question.id)
  );

  // Verificar si todas las preguntas han sido respondidas en el frontend
  const isSectionComplete = section.questions.every(
    (question) => existingAnswers[question.id]
  );

  // Estilos condicionales según el estado de la sección
  const cardBgColor = isSectionAnswered ? '#e0f7fa' : '#ffffff';
  const borderColor = isSectionAnswered ? 'success.main' : 'grey.300';

  return (
    <Card
      sx={{
        backgroundColor: cardBgColor,
        border: `1px solid ${borderColor}`,
        borderRadius: 2,
        mb: 4,
        boxShadow: isSectionAnswered ? 3 : 1,
        transition: 'box-shadow 0.3s ease-in-out',
      }}
      elevation={isSectionAnswered ? 3 : 1}
    >
      <CardContent>
        {/* Título de la Sección */}
        <Box display="flex" alignItems="center" mb={2}>
          <AssignmentIcon color="primary" sx={{ mr: 1, fontSize: 30 }} />
          <Typography variant="h5" component="h2" fontWeight="bold">
            {section.title}
          </Typography>
          {isSectionAnswered && (
            <Tooltip title="Sección Completada">
              <CheckCircleIcon color="success" sx={{ ml: 1 }} />
            </Tooltip>
          )}
        </Box>

        {/* Descripción de la Sección */}
        <Typography variant="body1" color="text.secondary" mb={3}>
          {section.description}
        </Typography>

        {/* Preguntas de la Sección */}
        {!isSectionAnswered && (
          <Stack spacing={1}> {/* Reducir el espaciado de 4 a 2 */}
            {section.questions.map((question) => (
              <MyQuestion
                key={question.id}
                question={question}
                onChange={(answer) => onAnswerChange(question.id, answer)}
                existingAnswer={existingAnswers[question.id]}
              />
            ))}
          </Stack>
        )}

        {/* Separador */}
        {!isSectionAnswered && <Divider sx={{ my: 1 }} />} {/* Reducir el margen vertical */}

        {/* Botón de Envío */}
        {!isSectionAnswered && (
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              startIcon={<AssignmentIcon />}
              onClick={() => onSubmitSection(section.id)}
              disabled={!isSectionComplete || isSubmitting}
              sx={{
                textTransform: 'none',
                fontWeight: 'bold',
                px: 4,
                py: 1.5,
                boxShadow: 3,
                '&:hover': {
                  boxShadow: 6,
                },
              }}
            >
              {isSubmitting ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Enviar Sección'
              )}
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default MySection;
