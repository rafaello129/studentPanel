import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Snackbar,
  Alert,
  Card,
  CardContent,
  Grid,
  InputAdornment,
} from '@mui/material';
import { CreateSectionDto } from '../../../interfaces/create-section.dto';
import { useCreateSectionMutation } from '../../../services/api/providers/sectionApi';
import {
  Title as TitleIcon,
  Description as DescriptionIcon,
  FormatListNumbered as OrderIcon,
} from '@mui/icons-material';
interface CreateSectionProps {
  evaluationId: number;
  refetchEvaluation: () => void;
}

const CreateSectionComponent: React.FC<CreateSectionProps> = ({ evaluationId, refetchEvaluation }) => {
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
      refetchEvaluation(); // Actualizamos los datos en el componente padre
    } catch (error) {
      setErrorOpen(true);
    }
  };

  return (
    <Card sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <CardContent>
        {/* Título del formulario */}
        <Typography variant="h5" component="h2" gutterBottom align="center">
          Crear Nueva Sección
        </Typography>

        {/* Formulario */}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Campo Título */}
            <Grid item xs={12}>
              <TextField
                label="Título"
                name="title"
                value={formData.title}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <TitleIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Campo Descripción */}
            <Grid item xs={12}>
              <TextField
                label="Descripción"
                name="description"
                value={formData.description}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DescriptionIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
{/* 
            Campo Orden
            <Grid item xs={12}>
              <TextField
                label="Orden"
                name="order"
                type="number"
                value={formData.order || ''}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <OrderIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid> */}

            {/* Botón Enviar */}
            <Grid item xs={12} textAlign="center">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isLoading}
                fullWidth
                sx={{ py: 1.5 }}
              >
                {isLoading ? 'Creando...' : 'Crear Sección'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>

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
          variant="filled"
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
          variant="filled"
        >
          Error al crear la sección.
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default CreateSectionComponent;
