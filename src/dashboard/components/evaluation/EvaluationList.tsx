// src/components/EvaluationList.tsx

import React, { useMemo, useState } from 'react';
import {
  useGetEvaluationsQuery,
} from '../../../services/api/providers/evaluationApi';
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { useGetAllAcademicLevelsQuery } from '../../../services/api/providers/academicLevelApi';
import { useNavigate } from 'react-router-dom';

const EvaluationList: React.FC = () => {
  // Estado para los filtros y paginación
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [isActive, setIsActive] = useState<boolean>(true); // Por defecto en true
  const [isTemplate, setIsTemplate] = useState<boolean>(true); // Por defecto en true
  const [academicLevelId, setAcademicLevelId] = useState<number | undefined>(undefined);

  // Obtener los niveles académicos para el filtro
  const {
    data: academicLevelsData,
    isLoading: isLoadingAcademicLevels,
    error: errorAcademicLevels,
  } = useGetAllAcademicLevelsQuery();

  // Obtener las evaluaciones con los filtros aplicados
  const evaluationRes = useGetEvaluationsQuery({
    page,
    limit,
    isTemplate,
    academicLevelId,
  });

  const {data: evaluationResponse} = evaluationRes;
  const evaluations = useMemo(() => evaluationResponse?.data || [], [evaluationResponse])
  console.log(evaluationRes);
  console.log(evaluationResponse);

  


  // Hook para la navegación
  const navigate = useNavigate();

  // Manejadores de eventos para los filtros
  const handleIsActiveChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsActive(event.target.checked);
  };

  const handleIsTemplateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsTemplate(event.target.checked);
  };

  const handleAcademicLevelChange = (event: SelectChangeEvent<string>) => {
    const value = Number(event.target.value);
    setAcademicLevelId(value !== 0 ? value : undefined);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleLimitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLimit(Number(event.target.value));
    setPage(1); // Reiniciar a la primera página al cambiar el límite
  };

  // Manejador para navegar a los detalles de una evaluación
  const handleEvaluationClick = (evaluationId: number, isTemplate: boolean) => {
    if (isTemplate) {
      navigate(`/evaluations/${evaluationId}`);
    } else {
      navigate(`/evaluations/view/${evaluationId}`);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Lista de Evaluaciones
      </Typography>

      {/* Controles de Filtro */}
      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={isActive === true}
              onChange={handleIsActiveChange}
              color="primary"
            />
          }
          label="Mostrar Solo Activas"
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={isTemplate === true}
              onChange={handleIsTemplateChange}
              color="primary"
            />
          }
          label="Mostrar Solo Plantillas"
        />

        <FormControl variant="outlined" sx={{ minWidth: 200 }}>
          <InputLabel id="academic-level-label">Nivel Académico</InputLabel>
          <Select
            labelId="academic-level-label"
            value={academicLevelId ? String(academicLevelId) : '0'}
            onChange={handleAcademicLevelChange}
            label="Nivel Académico"
          >
            <MenuItem value="0">Todos</MenuItem>
            {academicLevelsData?.data?.map((level) => (
              <MenuItem key={level.id} value={String(level.id)}>
                {level.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Evaluaciones por Página"
          type="number"
          value={limit}
          onChange={handleLimitChange}
          variant="outlined"
          sx={{ width: 150 }}
        />
      </Box>

      {/* Mostrar estado de carga o error */}
      {evaluationRes.isLoading || isLoadingAcademicLevels ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : evaluationRes.isError || errorAcademicLevels ? (
        <Typography color="error">
          Error al cargar las evaluaciones o niveles académicos.
        </Typography>
      ) : (
        <>
          {/* Lista de Evaluaciones */}
          <List>
            {evaluations.map((evaluation) => (
              <>
              <hr />
              <ListItem disablePadding key={evaluation.id} >
                <ListItemButton onClick={() => handleEvaluationClick(evaluation.id, evaluation.isTemplate)}>
                  <ListItemText
                    primary={
                      <>
                        <div className=' text-center fs-4 fw-bold'>
                            {evaluation.title}
                        </div>
                      </>
                    }
                    secondary={
                      <>
                      <hr />
                        <div className='d-flex flex-row justify-content-evenly' >
                        
                          <p>{evaluation.description} </p>{" "}
                          
                          <p>
                            Nivel Académico: {evaluation.academicLevel?.name || 'N/A'}
                          </p>
                          
                          <p>Es Plantilla: {evaluation.isTemplate ? 'Sí' : 'No'}</p>
                          <p>Está Activa: {evaluation.isActive ? 'Sí' : 'No'}</p>
                        </div>
                        
                      </>
                    }
                  />
                </ListItemButton>
                
              </ListItem>
            </>
            ))}
          </List>

          {/* Controles de Paginación */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              variant="contained"
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              Anterior
            </Button>
            <Typography variant="body1">
              Página {evaluationResponse?.page} de {Math.ceil((evaluationResponse?.total || 1) / (evaluationResponse?.limit || 1))}
            </Typography>
            <Button
              variant="contained"
              onClick={() => handlePageChange(page + 1)}
              disabled={evaluationResponse && evaluationResponse.data.length < limit}
            >
              Siguiente
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default EvaluationList;
