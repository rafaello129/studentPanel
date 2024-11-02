import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useCreateQuestionMutation } from '../../../services/api/providers/questionApi';
export enum QuestionTypeEnum {
    SINGLE_CHOICE = 'SINGLE_CHOICE',
    MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
    OPEN_ENDED = 'OPEN_ENDED',
    // Agrega otros tipos de pregunta según tu definición
  }

interface CreateQuestionComponentProps {
  sectionId: number;
  refetchQuestions: () => void;
}

const CreateQuestionComponent: React.FC<CreateQuestionComponentProps> = ({ sectionId, refetchQuestions }) => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [questionType, setQuestionType] = useState<QuestionTypeEnum>(QuestionTypeEnum.OPEN_ENDED);

  const [createQuestion] = useCreateQuestionMutation();

  const handleCreate = async () => {
    try {
      await createQuestion({
        text,
        questionType,
        sectionId,
      }).unwrap();
      setOpen(false);
      setText('');
      setQuestionType(QuestionTypeEnum.OPEN_ENDED);
      refetchQuestions();
    } catch (error) {
      console.error('Error al crear la pregunta:', error);
    }
  };

  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Crear Pregunta
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Nueva Pregunta</DialogTitle>
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
              onChange={(e) => setQuestionType(e.target.value as QuestionTypeEnum)}
            >
              <MenuItem value={QuestionTypeEnum.OPEN_ENDED}>Abierta</MenuItem>
              <MenuItem value={QuestionTypeEnum.SINGLE_CHOICE}>Selección Única</MenuItem>
              <MenuItem value={QuestionTypeEnum.MULTIPLE_CHOICE}>Selección Múltiple</MenuItem>
              {/* Agrega más tipos si es necesario */}
            </Select>
          </FormControl>
          {/* Si el tipo de pregunta requiere opciones de respuesta, puedes agregar campos aquí */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={handleCreate} variant="contained">
            Crear
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateQuestionComponent;
