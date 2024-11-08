import React, { useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from '@mui/material';
import { CreateEvaluation } from '../../../interfaces/evaluation';
import { useCreateEvaluationMutation } from '../../../services/api/providers/evaluationApi';
import { SelectChangeEvent } from '@mui/material/Select';
import { useGetAllAcademicLevelsQuery } from '../../../services/api/providers/academicLevelApi';

const CreateEvaluationForm: React.FC = () => {
  const [createEvaluation, { isLoading: isCreating }] = useCreateEvaluationMutation();
  const { data: academicLevelsData, isLoading: isLoadingAcademicLevels, error } = useGetAllAcademicLevelsQuery();

  const [formData, setFormData] = useState<CreateEvaluation>({
    title: '',
    description: '',
    academicLevelId: 0, // Inicialmente 0 o undefined
  });

  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  // Manejador para campos de texto y textarea
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Manejador específico para el Select de MUI
  const handleSelectChange = (e: SelectChangeEvent<number>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createEvaluation(formData).unwrap();
      setSuccessOpen(true);
      setFormData({
        title: '',
        description: '',
        academicLevelId: 0,
      });
    } catch (error) {
      setErrorOpen(true);
    }
  };

  return (
    <Box
      sx={{
        p: 3,
        width: '100%',
        maxWidth: 400,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: '#fff',
      }}
    >
      <Typography variant="h5" component="h1" gutterBottom align="center">
        Crear Nueva Evaluación
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Título"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          fullWidth
          required
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Descripción"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          fullWidth
          multiline
          rows={3}
          margin="normal"
          variant="outlined"
        />

        {isLoadingAcademicLevels ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">Error al cargar los niveles académicos</Alert>
        ) : (
          <FormControl fullWidth required margin="normal" variant="outlined">
            <InputLabel id="academic-level-label">Nivel Académico</InputLabel>
            <Select
              labelId="academic-level-label"
              name="academicLevelId"
              value={formData.academicLevelId}
              onChange={handleSelectChange}
              label="Nivel Académico"
            >
              <MenuItem value={0} disabled>
                Seleccione un nivel académico
              </MenuItem>
              {academicLevelsData?.data?.map((level) => (
                <MenuItem key={level.id} value={level.id}>
                  {level.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            disabled={isCreating || isLoadingAcademicLevels || formData.academicLevelId === 0}
            startIcon={isCreating ? <CircularProgress size={20} /> : null}
          >
            {isCreating ? 'Creando...' : 'Crear Evaluación'}
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
        <Alert onClose={() => setSuccessOpen(false)} severity="success" sx={{ width: '100%' }}>
          Evaluación creada exitosamente
        </Alert>
      </Snackbar>
      {/* Snackbar para error */}
      <Snackbar
        open={errorOpen}
        autoHideDuration={6000}
        onClose={() => setErrorOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setErrorOpen(false)} severity="error" sx={{ width: '100%' }}>
          Error al crear la evaluación
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CreateEvaluationForm;
