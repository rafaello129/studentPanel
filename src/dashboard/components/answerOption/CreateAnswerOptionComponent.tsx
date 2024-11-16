// src/components/answerOption/CreateAnswerOptionComponent.tsx

import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Snackbar,
  Alert,
  Typography,
  CircularProgress,
  Grid,
  InputAdornment,
} from '@mui/material';
import { useCreateAnswerOptionMutation } from '../../../services/api/providers/answerOptionApi';
import {
  AddCircle,
  TextFields as TextFieldsIcon,
  Score as ScoreIcon,
  Reorder as ReorderIcon,
} from '@mui/icons-material';

interface CreateAnswerOptionComponentProps {
  questionId: number;
  refetchAnswerOptions: () => void;
}

const CreateAnswerOptionComponent: React.FC<CreateAnswerOptionComponentProps> = ({
  questionId,
  refetchAnswerOptions,
}) => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [score, setScore] = useState<number>(0);
  const [order, setOrder] = useState<number>(0);

  const [createAnswerOption, { isLoading }] = useCreateAnswerOptionMutation();

  // Estados para notificaciones
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  const handleCreate = async () => {
    try {
      await createAnswerOption({
        text,
        score,
        order,
        questionId,
      }).unwrap();
      setOpen(false);
      setText('');
      setScore(0);
      setOrder(0);
      setSuccessOpen(true);
      refetchAnswerOptions();
    } catch (error) {
      console.error('Error al crear la opción de respuesta:', error);
      setErrorOpen(true);
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
        Crear Opción de Respuesta
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Nueva Opción de Respuesta</DialogTitle>
        <br />
        <DialogContent>
          <form id="create-answer-option-form" onSubmit={handleCreate}>
            <Grid container spacing={2}>
              {/* Campo Texto */}
              <Grid item xs={12}>
                <TextField
                  label="Texto"
                  fullWidth
                  required
                  variant="outlined"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <TextFieldsIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              {/* Campo Puntuación */}
              <Grid item xs={12} >
                <TextField
                  label="Puntuación"
                  type="number"
                  fullWidth
                  required
                  variant="outlined"
                  value={score}
                  onChange={(e) => setScore(Number(e.target.value))}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <ScoreIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              {/* Campo Orden */}
              {/* <Grid item xs={12} sm={6}>
                <TextField
                  label="Orden"
                  type="number"
                  fullWidth
                  required
                  variant="outlined"
                  value={order}
                  onChange={(e) => setOrder(Number(e.target.value))}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <ReorderIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid> */}

              {/* Campos adicionales si es necesario */}
              {/* ... */}
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancelar
          </Button>
          <Button
            type="submit"
            form="create-answer-option-form"
            variant="contained"
            color="primary"
            disabled={isLoading}
            startIcon={isLoading ? <CircularProgress size={20} /> : null}
          >
            {isLoading ? 'Creando...' : 'Crear'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar para éxito */}
      <Snackbar
        open={successOpen}
        autoHideDuration={6000}
        onClose={() => setSuccessOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSuccessOpen(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          Opción de respuesta creada exitosamente.
        </Alert>
      </Snackbar>

      {/* Snackbar para error */}
      <Snackbar
        open={errorOpen}
        autoHideDuration={6000}
        onClose={() => setErrorOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setErrorOpen(false)}
          severity="error"
          sx={{ width: '100%' }}
        >
          Error al crear la opción de respuesta.
        </Alert>
      </Snackbar>
    </>
  );
};

export default CreateAnswerOptionComponent;
