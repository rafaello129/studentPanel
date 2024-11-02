// src/components/sections/DeleteSectionButton.tsx

import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, Alert } from '@mui/material';
import { useDeleteSectionMutation } from '../../../services/api/providers/sectionApi';

interface DeleteSectionButtonProps {
  sectionId: number;
}

const DeleteSectionButton: React.FC<DeleteSectionButtonProps> = ({ sectionId }) => {
  const [deleteSection, { isLoading }] = useDeleteSectionMutation();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteSection(sectionId).unwrap();
      setSuccessOpen(true);
      setOpenConfirm(false);
      // Aquí puedes agregar lógica adicional, como redirigir o actualizar la lista de secciones
    } catch (error) {
      setErrorOpen(true);
    }
  };

  return (
    <>
      <Button variant="contained" color="secondary" onClick={() => setOpenConfirm(true)}>
        Eliminar Sección
      </Button>

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
