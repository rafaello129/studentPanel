// src/components/answerOption/DeleteAnswerOptionButton.tsx

import React, { useState } from 'react';
import { IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Snackbar, Alert } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useDeleteAnswerOptionMutation } from '../../../services/api/providers/answerOptionApi';

interface DeleteAnswerOptionButtonProps {
  answerOptionId: number;
  refetchAnswerOptions: () => void;
}

const DeleteAnswerOptionButton: React.FC<DeleteAnswerOptionButtonProps> = ({
  answerOptionId,
  refetchAnswerOptions,
}) => {
  const [deleteAnswerOption, { isLoading }] = useDeleteAnswerOptionMutation();
  const [openConfirm, setOpenConfirm] = useState(false);

  // Estados para notificaciones
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteAnswerOption(answerOptionId).unwrap();
      setSuccessOpen(true);
      setOpenConfirm(false);
      refetchAnswerOptions();
    } catch (error) {
      console.error('Error al eliminar la opción de respuesta:', error);
      setErrorOpen(true);
    }
  };

  return (
    <>
      <IconButton onClick={() => setOpenConfirm(true)}>
        <Delete />
      </IconButton>

      {/* Diálogo de confirmación */}
      <Dialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
      >
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas eliminar esta opción de respuesta? Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDelete} color="secondary" disabled={isLoading}>
            {isLoading ? 'Eliminando...' : 'Eliminar'}
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
          Opción de respuesta eliminada exitosamente.
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
          Error al eliminar la opción de respuesta.
        </Alert>
      </Snackbar>
    </>
  );
};

export default DeleteAnswerOptionButton;
