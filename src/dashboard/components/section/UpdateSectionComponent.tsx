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
  Grid,
  InputAdornment,
  FormControlLabel,
  Switch,
} from '@mui/material';
import {
  School as SchoolIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Description as DescriptionIcon,
  Title as TitleIcon,
  Description as TemplateIcon,
  Description as NotTemplateIcon,
} from '@mui/icons-material';
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
      <DialogTitle>
        Actualizar Sección
        <Typography variant="subtitle1" color="textSecondary">
          Modifica los detalles de la sección a continuación.
        </Typography>
      </DialogTitle>
<br />
      <DialogContent>
        <form id="update-section-form" onSubmit={handleSubmit}>
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

            {/* Campo Activo */}
            <Grid item xs={12}>
              {/* <FormControlLabel
                control={
                  <Switch
                    checked={formData.isActive}
                    onChange={(e) =>
                      handleChange({
                        target: { name: 'isActive', value: e.target.checked },
                      })
                    }
                    name="isActive"
                    color="primary"
                  />
                }
                label="Activo"
              /> */}
            </Grid>
          </Grid>
        </form>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button
          type="submit"
          form="update-section-form"
          variant="contained"
          color="primary"
          disabled={isUpdating}
        >
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
