// src/components/answerOption/UpdateAnswerOptionComponent.tsx

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Snackbar,
  Alert,
  Typography,
} from '@mui/material';
import { AnswerOption } from '../../../interfaces/answer-option';
import { useGetAnswerOptionByIdQuery, useUpdateAnswerOptionMutation } from '../../../services/api/providers/answerOptionApi';

interface UpdateAnswerOptionComponentProps {
  answerOptionId: number;
  open: boolean;
  onClose: () => void;
}

const UpdateAnswerOptionComponent: React.FC<UpdateAnswerOptionComponentProps> = ({
  answerOptionId,
  open,
  onClose,
}) => {
  const { data, isLoading: isFetching } = useGetAnswerOptionByIdQuery(answerOptionId);
  const [updateAnswerOption, { isLoading: isUpdating }] = useUpdateAnswerOptionMutation();

  const [text, setText] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  const [order, setOrder] = useState<number>(0);

  // Estados para notificaciones
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  useEffect(() => {
    if (data?.data) {
      setText(data.data.text);
      setScore(data.data.score);
      setOrder(data.data.order);
    }
  }, [data]);

  const handleUpdate = async () => {
    try {
      await updateAnswerOption({
        id: answerOptionId,
        data: {
          text,
          score,
          order,
        },
      }).unwrap();
      setSuccessOpen(true);
      onClose();
    } catch (error) {
      console.error('Error al actualizar la opción de respuesta:', error);
      setErrorOpen(true);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>Editar Opción de Respuesta</DialogTitle>
        <DialogContent>
          {isFetching ? (
            <Typography>Loading...</Typography>
          ) : (
            <>
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
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button onClick={handleUpdate} variant="contained" disabled={isUpdating || isFetching}>
            {isUpdating ? 'Guardando...' : 'Guardar'}
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
          Opción de respuesta actualizada exitosamente.
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
          Error al actualizar la opción de respuesta.
        </Alert>
      </Snackbar>
    </>
  );
};

export default UpdateAnswerOptionComponent;
