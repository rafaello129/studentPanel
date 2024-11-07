import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
  Typography
} from '@mui/material';
import { useGetQuestionByIdQuery, useUpdateQuestionMutation } from '../../../services/api/providers/questionApi';
import { QuestionTypeEnum } from '../../../interfaces/question-type'; // Asegúrate de tener esta importación correcta

interface UpdateQuestionComponentProps {
  questionId: number;
  open: boolean;
  onClose: () => void;
}

const UpdateQuestionComponent: React.FC<UpdateQuestionComponentProps> = ({ questionId, open, onClose }) => {
  const { data, isLoading: isFetching } = useGetQuestionByIdQuery(questionId);
  const [updateQuestion, { isLoading: isUpdating }] = useUpdateQuestionMutation();

  const [text, setText] = useState<string>('');
  const [questionType, setQuestionType] = useState<QuestionTypeEnum>(QuestionTypeEnum.OPEN_ENDED);

  // Estados para notificaciones
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  useEffect(() => {
    if (data?.data) {
      setText(data.data.text);
      setQuestionType(data.data.questionType.name as QuestionTypeEnum);
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
      setSuccessOpen(true);
      onClose();
    } catch (error) {
      console.error('Error al actualizar la pregunta:', error);
      setErrorOpen(true);
    }
  };

  const handleCloseSuccess = () => {
    setSuccessOpen(false);
  };

  const handleCloseError = () => {
    setErrorOpen(false);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>Editar Pregunta</DialogTitle>
        <DialogContent>
          {isFetching ? (
            <Typography>Loading...</Typography>
          ) : (
            <>
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
              {/* Puedes agregar más campos según sea necesario */}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={handleUpdate}
            variant="contained"
            color="primary"
            disabled={isUpdating || isFetching}
          >
            {isUpdating ? 'Guardando...' : 'Guardar'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar para éxito */}
      <Snackbar
        open={successOpen}
        autoHideDuration={6000}
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSuccess}
          severity="success"
          sx={{ width: '100%' }}
        >
          Pregunta actualizada exitosamente.
        </Alert>
      </Snackbar>

      {/* Snackbar para error */}
      <Snackbar
        open={errorOpen}
        autoHideDuration={6000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseError}
          severity="error"
          sx={{ width: '100%' }}
        >
          Error al actualizar la pregunta.
        </Alert>
      </Snackbar>
    </>
  );
};

export default UpdateQuestionComponent;
