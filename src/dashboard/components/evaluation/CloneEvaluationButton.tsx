// src/components/CloneEvaluationButton.tsx

import React, { useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Snackbar,
  Alert,
  Checkbox,
  ListItemText,
  OutlinedInput,
} from '@mui/material';
import { useCloneEvaluationMutation, useGetEvaluationsQuery } from '../../../services/api/providers/evaluationApi';
import { CloneEvaluation, Evaluation } from '../../../interfaces/evaluation';
import { useGetClassesQuery } from '../../../services/api/providers/classApi';
import { SelectChangeEvent } from '@mui/material/Select';
import { Class } from '../../../interfaces/class';

const CloneEvaluationButton: React.FC = () => {
  const [cloneEvaluation, { isLoading: isCloning }] = useCloneEvaluationMutation();

  // Estado para la evaluación seleccionada, la fecha programada y las clases seleccionadas
  const [templateId, setTemplateId] = useState<number | undefined>(undefined);
  const [scheduledDate, setScheduledDate] = useState<string>('');
  const [classIds, setClassIds] = useState<number[]>([]);

  // Estado para notificaciones
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  // Obtener la lista de evaluaciones que son plantillas
  const { data: evaluationsData, isLoading: isLoadingEvaluations, error: errorEvaluations } = useGetEvaluationsQuery({
    page: 1,
    limit: 100, // Puedes ajustar el límite según tus necesidades
    isTemplate: true,
  });

  // Obtener la lista de clases disponibles
  const { data: classesData, isLoading: isLoadingClasses, error: errorClasses } = useGetClassesQuery({
    page: 1,
    limit: 100, // Ajusta el límite según tus necesidades
    isActive: true,
  });

  // Manejador para cambiar la evaluación seleccionada
  const handleTemplateChange = (event: SelectChangeEvent<string>) => {
    const value = Number(event.target.value);
    setTemplateId(value !== 0 ? value : undefined);
  };

  // Manejador para cambiar la fecha programada
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setScheduledDate(event.target.value);
  };

  // Manejador para cambiar las clases seleccionadas
  const handleClassesChange = (event: SelectChangeEvent<string[]>) => {
    const values = event.target.value as string[];
    setClassIds(values.map((value) => Number(value)));
  };

  const handleClone = async () => {
    if (!templateId || !scheduledDate) {
      setErrorOpen(true);
      return;
    }

    const cloneData: CloneEvaluation = { templateId, scheduledDate, classIds };
    try {
      await cloneEvaluation(cloneData).unwrap();
      setSuccessOpen(true);
      // Reiniciar el formulario
      setTemplateId(undefined);
      setScheduledDate('');
      setClassIds([]);
    } catch (error) {
      setErrorOpen(true);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 3,
          p: 4,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: '#fff',
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom align="center">
          Programar Evaluación
        </Typography>

        {(isLoadingEvaluations || isLoadingClasses) ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <CircularProgress />
          </Box>
        ) : (errorEvaluations || errorClasses) ? (
          <Alert severity="error">Error al cargar las evaluaciones o clases</Alert>
        ) : (
          <form>
            <FormControl fullWidth required margin="normal" variant="outlined">
              <InputLabel id="template-select-label">Seleccionar Evaluación a Programar</InputLabel>
              <Select
                labelId="template-select-label"
                value={templateId ? String(templateId) : ''}
                onChange={handleTemplateChange}
                label="Seleccionar Evaluación a Programar"
              >
                <MenuItem value="" disabled>
                  Selecciona una evaluación
                </MenuItem>
                {evaluationsData?.data?.map((evaluation: Evaluation) => (
                  <MenuItem key={evaluation.id} value={String(evaluation.id)}>
                    {evaluation.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Fecha Programada"
              type="datetime-local"
              value={scheduledDate}
              onChange={handleDateChange}
              fullWidth
              required
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />

            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel id="classes-select-label">Seleccionar Clases</InputLabel>
              <Select
                labelId="classes-select-label"
                multiple
                value={classIds.map(String)}
                onChange={handleClassesChange}
                input={<OutlinedInput label="Seleccionar Clases" />}
                renderValue={(selected) => {
                  const selectedClasses = classesData?.data?.filter((cls) =>
                    selected.includes(String(cls.id))
                  );
                  return selectedClasses?.map((cls) => cls.id).join(', ');
                }}
              >
                {classesData?.data?.map((cls: Class) => (
                  <MenuItem key={cls.id} value={String(cls.id)}>
                    <Checkbox checked={classIds.includes(cls.id)} />
                    <ListItemText primary={`Clase ${cls.id}`} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleClone}
                disabled={isCloning || !templateId || !scheduledDate}
                startIcon={isCloning ? <CircularProgress size={20} /> : null}
              >
                {isCloning ? 'Clonando...' : 'Programar Evaluación'}
              </Button>
            </Box>
          </form>
        )}
      </Box>

      {/* Snackbar para éxito */}
      <Snackbar
        open={successOpen}
        autoHideDuration={6000}
        onClose={() => setSuccessOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSuccessOpen(false)} severity="success" sx={{ width: '100%' }}>
          Evaluación programada exitosamente
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
          Error al programar la evaluación
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CloneEvaluationButton;
