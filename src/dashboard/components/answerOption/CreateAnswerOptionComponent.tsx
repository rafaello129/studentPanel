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
} from '@mui/material';
import { useCreateAnswerOptionMutation } from '../../../services/api/providers/answerOptionApi';

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
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Crear Opción de Respuesta
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Nueva Opción de Respuesta</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Texto"
            fullWidth
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
          <TextField
            margin="dense"
            label="Puntuación"
            type="number"
            fullWidth
            value={score}
            onChange={(e) => setScore(Number(e.target.value))}
            required
          />
          <TextField
            margin="dense"
            label="Orden"
            type="number"
            fullWidth
            value={order}
            onChange={(e) => setOrder(Number(e.target.value))}
            required
          />
          {/* Puedes agregar más campos si es necesario */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={handleCreate} variant="contained" disabled={isLoading}>
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
