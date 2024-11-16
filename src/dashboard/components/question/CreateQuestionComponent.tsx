import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, FormControl, InputLabel, Select, MenuItem, Grid, InputAdornment } from '@mui/material';
import { useCreateQuestionMutation } from '../../../services/api/providers/questionApi';
import { AddCircle, QuestionMark } from '@mui/icons-material';
export enum QuestionTypeEnum {
  SINGLE_CHOICE = 'MULTIPLE_CHOICE',
  MULTIPLE_CHOICE = 'MULTIPLE_SELECT',
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
     <Button
        variant="contained"
        color="primary"
        startIcon={<AddCircle />}
        onClick={() => setOpen(true)}
      >
        Crear Pregunta
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Nueva Pregunta</DialogTitle>
        <br />
        <DialogContent>
          <form onSubmit={handleCreate}>
            <Grid container spacing={2}>
              {/* Campo Texto de la Pregunta */}
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  label="Texto de la pregunta"
                  name="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  fullWidth
                  required
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <QuestionMark />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              {/* Campo Tipo de Pregunta */}
              <Grid item xs={12}>
                <FormControl fullWidth required variant="outlined">
                  <InputLabel>Tipo de Pregunta</InputLabel>
                  <Select
                    value={questionType}
                    label="Tipo de Pregunta"
                    onChange={(e) =>
                      setQuestionType(e.target.value as QuestionTypeEnum)
                    }
                  >
                    <MenuItem value={QuestionTypeEnum.OPEN_ENDED}>
                      Abierta
                    </MenuItem>
                    <MenuItem value={QuestionTypeEnum.SINGLE_CHOICE}>
                      Selección Única
                    </MenuItem>
                    <MenuItem value={QuestionTypeEnum.MULTIPLE_CHOICE}>
                      Selección Múltiple
                    </MenuItem>
                    {/* Agrega más tipos si es necesario */}
                  </Select>
                </FormControl>
              </Grid>

              {/* Campos adicionales según el tipo de pregunta */}
            
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleCreate} variant="contained" color="primary">
            Crear
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateQuestionComponent;
