import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useGetQuestionByIdQuery, useUpdateQuestionMutation } from '../../../services/api/providers/questionApi';
import { QuestionTypeEnum } from './CreateQuestionComponent';
import { QuestionType } from '../../../interfaces/question-type';


interface UpdateQuestionComponentProps {
  questionId: number;
  open: boolean;
  onClose: () => void;
}

const UpdateQuestionComponent: React.FC<UpdateQuestionComponentProps> = ({ questionId, open, onClose }) => {
  const { data } = useGetQuestionByIdQuery(questionId);
  const [updateQuestion] = useUpdateQuestionMutation();

  const [text, setText] = useState('');
  const [questionType, setQuestionType] = useState<QuestionType>({id:0, name:'OPEN_ENDED'});

  useEffect(() => {
    if (data?.data) {
      setText(data.data.text);
      setQuestionType(data.data.questionType);
    }
  }, [data]);

  const handleUpdate = async () => {
    try {
      await updateQuestion({
        id: questionId,
        data: {
          text,
          questionType,
        },
      }).unwrap();
      onClose();
    } catch (error) {
      console.error('Error al actualizar la pregunta:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Editar Pregunta</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Texto de la pregunta"
          fullWidth
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>Tipo de Pregunta</InputLabel>
          <Select
            value={questionType}
            label="Tipo de Pregunta"
            onChange={(e) => setQuestionType(e.target.value as QuestionType)}
          >
            <MenuItem value={QuestionTypeEnum.OPEN_ENDED}>Abierta</MenuItem>
            <MenuItem value={QuestionTypeEnum.SINGLE_CHOICE}>Selección Única</MenuItem>
            <MenuItem value={QuestionTypeEnum.MULTIPLE_CHOICE}>Selección Múltiple</MenuItem>
            {/* Agrega más tipos si es necesario */}
          </Select>
        </FormControl>
        {/* Si el tipo de pregunta requiere opciones de respuesta, puedes manejarlo aquí */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleUpdate} variant="contained">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateQuestionComponent;
