// src/components/sections/CreateSectionComponent.tsx

import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from '@mui/material';
import { CreateSectionDto } from '../../../interfaces/create-section.dto';
import { useCreateSectionMutation } from '../../../services/api/providers/sectionApi';

interface CreateSectionProps {
  evaluationId: number; // ID de la evaluación a la que se añadirá la sección
}

const CreateSectionComponent: React.FC<CreateSectionProps> = ({ evaluationId }) => {
  const [createSection, { isLoading }] = useCreateSectionMutation();

  const [formData, setFormData] = useState<CreateSectionDto>({
    title: '',
    description: '',
    order: undefined,
    evaluationId: evaluationId,
  });

  // Estados para notificaciones
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createSection(formData).unwrap();
      setSuccessOpen(true);
      // Reiniciar el formulario
      setFormData({
        title: '',
        description: '',
        order: undefined,
        evaluationId: evaluationId,
      });
    } catch (error) {
      setErrorOpen(true);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Crear Nueva Sección
      </Typography>
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

        <Box sx={{ mt: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading}
          >
            {isLoading ? 'Creando...' : 'Crear Sección'}
          </Button>
        </Box>
      </form>

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
          Sección creada exitosamente.
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
          Error al crear la sección.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CreateSectionComponent;
