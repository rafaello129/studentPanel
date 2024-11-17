// src/components/questions/MyMultipleChoiceQuestion.tsx
import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
} from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Question as QuestionType } from '../../../interfaces/question';
import HelpIcon from '@mui/icons-material/Help';


interface AnswerOption {
  id: number;
  text: string;
}


interface ExistingAnswer {
  selectedOptionId?: number;
  selectedOptionIds?: number[];
}

interface MyMultipleChoiceQuestionProps {
  question: QuestionType;
  onChange: (answer: any) => void;
  existingAnswer: ExistingAnswer;
}

const MyMultipleChoiceQuestion: React.FC<MyMultipleChoiceQuestionProps> = ({
  question,
  onChange,
  existingAnswer,
}) => {
  // Manejar cambios en las opciones
  const handleChange = (optionId: number, checked: boolean) => {
    if (question.allowMultipleAnswers) {
      const current = existingAnswer?.selectedOptionIds || [];
      let updatedOptions: number[];
      if (checked) {
        updatedOptions = [...current, optionId];
      } else {
        updatedOptions = current.filter((id: number) => id !== optionId);
      }
      onChange({ selectedOptionIds: updatedOptions });
    } else {
      onChange({ selectedOptionId: optionId });
    }
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
          <HelpIcon color="primary" sx={{ mr: 1 }}></HelpIcon>
          <Typography variant="h6" component="h3" fontWeight="bold">
            {question.text}
          </Typography>
        </Box>

        {/* Contenedor de Opciones */}
        <FormControl component="fieldset" fullWidth>
          {question.allowMultipleAnswers ? (
            // Para preguntas de múltiples respuestas
            <FormGroup>
              {question.answerOptions.map((option) => {
                const isChecked =
                  existingAnswer?.selectedOptionIds?.includes(option.id) || false;
                return (
                  <FormControlLabel
                    key={option.id}
                    control={
                      <Checkbox
                        checked={isChecked}
                        onChange={(e) =>
                          handleChange(option.id, e.target.checked)
                        }
                        name={`question-${question.id}-option-${option.id}`}
                        color="primary"
                      />
                    }
                    label={option.text}
                  />
                );
              })}
            </FormGroup>
          ) : (
            // Para preguntas de única respuesta
            <RadioGroup
              aria-label={question.text}
              name={`question-${question.id}`}
              value={
                existingAnswer?.selectedOptionId
                  ? existingAnswer.selectedOptionId.toString()
                  : ''
              }
              onChange={(e) =>
                handleChange(parseInt(e.target.value, 10), true)
              }
            >
              {question.answerOptions.map((option) => (
                <FormControlLabel
                  key={option.id}
                  value={option.id.toString()}
                  control={<Radio color="primary" />}
                  label={option.text}
                />
              ))}
            </RadioGroup>
          )}
        </FormControl>
      </CardContent>
    </Card>
  );
};

export default MyMultipleChoiceQuestion;
