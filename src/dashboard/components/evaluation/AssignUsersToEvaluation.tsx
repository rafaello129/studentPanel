// src/components/AssignUsersToEvaluation.tsx

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
} from '@mui/material';
import { useAssignUsersMutation, useGetEvaluationsQuery } from '../../../services/api/providers/evaluationApi';
import { AssignUsers, Evaluation } from '../../../interfaces/evaluation';
import { SelectChangeEvent } from '@mui/material/Select';

const AssignUsersToEvaluation: React.FC = () => {
  // Estado para la evaluación seleccionada y los IDs de usuarios
  const [evaluationId, setEvaluationId] = useState<number | undefined>(undefined);
  const [userIds, setUserIds] = useState<string>('');

  // Estado para notificaciones
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  const [assignUsers, { isLoading }] = useAssignUsersMutation();

  // Obtener la lista de evaluaciones activas que no son plantillas
  const {
    data: evaluationsData,
    isLoading: isLoadingEvaluations,
    error: errorEvaluations,
  } = useGetEvaluationsQuery({
    page: 1,
    limit: 100, // Ajusta el límite según tus necesidades
    isActive: true,
    isTemplate: false,
  });

  // Manejador para cambiar la evaluación seleccionada
  const handleEvaluationChange = (event: SelectChangeEvent<string>) => {
    const value = Number(event.target.value);
    setEvaluationId(value !== 0 ? value : undefined);
  };

  // Manejador para cambiar los IDs de usuarios
  const handleUserIdsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserIds(event.target.value);
  };

  const handleAssign = async () => {
    if (!evaluationId || !userIds) {
      setErrorOpen(true);
      return;
    }

    const parsedUserIds = userIds
      .split(',')
      .map((id) => parseInt(id.trim(), 10))
      .filter((id) => !isNaN(id));

    if (parsedUserIds.length === 0) {
      setErrorOpen(true);
      return;
    }

    const assignData: AssignUsers = { userIds: parsedUserIds };
    try {
      await assignUsers({ id: evaluationId, assignUsersDto: assignData }).unwrap();
      setSuccessOpen(true);
      // Reiniciar el formulario
      setEvaluationId(undefined);
      setUserIds('');
    } catch (error) {
      setErrorOpen(true);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 2,
          p: 4,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: '#fff',
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom align="center">
          Asignar Usuarios a Evaluación
        </Typography>

        {isLoadingEvaluations ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <CircularProgress />
          </Box>
        ) : errorEvaluations ? (
          <Alert severity="error">Error al cargar las evaluaciones</Alert>
        ) : (
          <form>
            <FormControl fullWidth required margin="normal" variant="outlined">
              <InputLabel id="evaluation-select-label">Seleccionar Evaluación</InputLabel>
              <Select
                labelId="evaluation-select-label"
                value={evaluationId ? String(evaluationId) : ''}
                onChange={handleEvaluationChange}
                label="Seleccionar Evaluación"
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
              label="IDs de Usuarios (separados por comas)"
              type="text"
              value={userIds}
              onChange={handleUserIdsChange}
              placeholder="1,2,3"
              fullWidth
              required
              margin="normal"
              variant="outlined"
            />

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleAssign}
                disabled={isLoading || !evaluationId || !userIds}
                startIcon={isLoading ? <CircularProgress size={20} /> : null}
              >
                {isLoading ? 'Asignando...' : 'Asignar Usuarios'}
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
          Usuarios asignados exitosamente.
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
          Error al asignar usuarios.
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AssignUsersToEvaluation;
