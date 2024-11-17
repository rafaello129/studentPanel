// src/components/questions/MyOpenEndedQuestion.tsx
import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
} from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Question as QuestionType } from '../../../interfaces/question';

interface AnswerOption {
  id: number;
  text: string;
}


interface ExistingAnswer {
  openEndedResponse?: string;
}

interface MyOpenEndedQuestionProps {
  question: QuestionType;
  onChange: (answer: any) => void;
  existingAnswer: ExistingAnswer;
}

const MyOpenEndedQuestion: React.FC<MyOpenEndedQuestionProps> = ({
  question,
  onChange,
  existingAnswer,
}) => {
  // Manejar cambios en la respuesta abierta
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onChange({ openEndedResponse: e.target.value });
  };

  return (
    <Card
      variant="outlined"
      sx={{
        mb: 3,
        backgroundColor: '#f9f9f9',
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      <CardContent>
        {/* Título de la Pregunta */}
        <Box display="flex" alignItems="center" mb={2}>
          <AssignmentIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h6" component="h3" fontWeight="bold">
            {question.text}
          </Typography>
        </Box>

        {/* Campo de Respuesta Abierta */}
        <TextField
          label="Tu respuesta"
          variant="outlined"
          multiline
          minRows={4}
          maxRows={8}
          fullWidth
          value={existingAnswer?.openEndedResponse || ''}
          onChange={handleChange}
          placeholder="Escribe tu respuesta aquí..."
          InputProps={{
            sx: {
              backgroundColor: '#ffffff',
            },
          }}
        />
      </CardContent>
    </Card>
  );
};

export default MyOpenEndedQuestion;
