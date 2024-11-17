// src/components/MyQuestion.tsx
import React from 'react';
import { Box, Alert, Typography } from '@mui/material';
import { Question as QuestionType, QuestionTypeEnum } from '../../../interfaces/question-type';
import MyMultipleChoiceQuestion from './MyMultipleChoiceQuestion';
import MyOpenEndedQuestion from './MyOpenEndedQuestion';

interface QuestionProps {
  question: QuestionType;
  onChange: (answer: any) => void;
  existingAnswer: any;
}

const MyQuestion: React.FC<QuestionProps> = ({
  question,
  onChange,
  existingAnswer,
}) => {
  // Función para renderizar el contenido basado en el tipo de pregunta
  const renderQuestionContent = () => {
    switch (question.questionType.name) {
      case QuestionTypeEnum.SINGLE_CHOICE:
      case QuestionTypeEnum.MULTIPLE_CHOICE:
        return (
          <MyMultipleChoiceQuestion
            question={question}
            onChange={onChange}
            existingAnswer={existingAnswer}
          />
        );
      case QuestionTypeEnum.OPEN_ENDED:
        return (
          <MyOpenEndedQuestion
            question={question}
            onChange={onChange}
            existingAnswer={existingAnswer}
          />
        );
      default:
        return (
          <Alert severity="warning">
            Tipo de pregunta no soportado: <strong>{question.questionType.name}</strong>
          </Alert>
        );
    }
  };

  return (
    <Box mb={4}>
      {/* Opcional: Mostrar el número de la pregunta si está disponible */}
    

      {/* Contenido de la Pregunta */}
      {renderQuestionContent()}
    </Box>
  );
};

export default MyQuestion;
