// src/components/sections/UpdateSectionComponent.tsx

import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Snackbar,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { UpdateSectionDto } from '../../../interfaces/update-section.dto';
import { useGetSectionByIdQuery, useUpdateSectionMutation } from '../../../services/api/providers/sectionApi';

interface UpdateSectionComponentProps {
  sectionId: number;
  open: boolean;
  onClose: () => void;
}

const UpdateSectionComponent: React.FC<UpdateSectionComponentProps> = ({ sectionId, open, onClose }) => {
  const { data, error, isLoading } = useGetSectionByIdQuery(sectionId);

  const [updateSection, { isLoading: isUpdating }] = useUpdateSectionMutation();

  const [formData, setFormData] = useState<UpdateSectionDto>({
    title: '',
    description: '',
    order: undefined,
  });

  // Estados para notificaciones
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  useEffect(() => {
    if (data?.data) {
      setFormData({
        title: data.data.title,
        description: data.data.description || '',
        order: data.data.order,
      });
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateSection({ id: Number(sectionId), data: formData }).unwrap();
      setSuccessOpen(true);
      // Cerrar el diálogo después de actualizar
      onClose();
    } catch (error) {
      setErrorOpen(true);
    }
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <Alert severity="error">Error al cargar la sección.</Alert>
    );
  }

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Actualizar Sección</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Título"
              name="title"
              value={formData.title}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
              variant="outlined"
            />

            <TextField
              label="Descripción"
              name="description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
              margin="normal"
              variant="outlined"
            />

            <TextField
              label="Orden"
              name="order"
              type="number"
              value={formData.order || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} color="primary" disabled={isUpdating}>
            {isUpdating ? 'Actualizando...' : 'Guardar'}
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
          Sección actualizada exitosamente.
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
          Error al actualizar la sección.
        </Alert>
      </Snackbar>
    </>
  );
};

export default UpdateSectionComponent;
