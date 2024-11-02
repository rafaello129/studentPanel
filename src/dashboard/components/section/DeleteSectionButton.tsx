import React, { useState } from 'react';
import { IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, Alert, Button } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useDeleteSectionMutation } from '../../../services/api/providers/sectionApi';

interface DeleteSectionButtonProps {
  sectionId: number;
  refetchEvaluation: () => void;
}

const DeleteSectionButton: React.FC<DeleteSectionButtonProps> = ({ sectionId, refetchEvaluation }) => {
  const [deleteSection, { isLoading }] = useDeleteSectionMutation();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteSection(sectionId).unwrap();
      setSuccessOpen(true);
      setOpenConfirm(false);
      refetchEvaluation(); // <-- Aquí llamamos a refetchEvaluation para actualizar los datos
    } catch (error) {
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
            ¿Estás seguro de que deseas eliminar esta sección? Esta acción no se puede deshacer.
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
          Sección eliminada exitosamente.
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
          Error al eliminar la sección.
        </Alert>
      </Snackbar>
    </>
  );
};

export default DeleteSectionButton;
