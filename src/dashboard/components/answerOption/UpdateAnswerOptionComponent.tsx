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
  CircularProgress,
  Grid,
  InputAdornment,
} from '@mui/material';
import { AnswerOption } from '../../../interfaces/answer-option';
import { useGetAnswerOptionByIdQuery, useUpdateAnswerOptionMutation } from '../../../services/api/providers/answerOptionApi';
import {
  TextFields as TextFieldsIcon,
  Score as ScoreIcon,
  Reorder as ReorderIcon,
} from '@mui/icons-material';
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
      {isFetching ? (
        <DialogContent sx={{ textAlign: 'center', py: 5 }}>
          <CircularProgress />
          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            Cargando...
          </Typography>
        </DialogContent>
      ) : (
        <form id="edit-answer-option-form" onSubmit={handleUpdate}>
          <DialogContent>
            <Grid container spacing={2}>
              {/* Campo Texto */}
              <Grid item xs={12}>
                <TextField
                  autoFocus
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
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="secondary">
              Cancelar
            </Button>
            <Button
              type="submit"
              form="edit-answer-option-form"
              variant="contained"
              color="primary"
              disabled={isUpdating}
              startIcon={isUpdating ? <CircularProgress size={20} /> : null}
            >
              {isUpdating ? 'Guardando...' : 'Guardar'}
            </Button>
          </DialogActions>
        </form>
      )}
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
