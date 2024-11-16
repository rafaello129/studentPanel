// src/components/EvaluationList.tsx

              
import SchoolIcon from '@mui/icons-material/School';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

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
  Divider,
  ListItem,
  ListItemText,
  ListItemButton,
  Grid,
  Tooltip,
} from '@mui/material';
import {
 
  Article as TemplateIcon,
  Poll as NotTemplateIcon,
  RadioButtonChecked as ActiveIcon,
  RadioButtonUnchecked as InactiveIcon,
} from '@mui/icons-material';
import { SelectChangeEvent } from '@mui/material/Select';
import { useGetAllAcademicLevelsQuery } from '../../../services/api/providers/academicLevelApi';
import { useNavigate } from 'react-router-dom';

interface props{
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
  setShowModal2: React.Dispatch<React.SetStateAction<boolean>>,
  setShowModal3: React.Dispatch<React.SetStateAction<boolean>>,
}

const EvaluationList: React.FC<props> = ( {setShowModal, setShowModal2, setShowModal3}) => {
 
   // Cambiar el tipo de estado a 'string' en lugar de 'boolean'
   const [isActive, setIsActive] = React.useState('true');
   const [isTemplate, setIsTemplate] = React.useState('false');
  // Estado para los filtros y paginación
  const isActiveBoolean = isActive === 'true';
const isTemplateBoolean = isTemplate === 'true';
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

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
    isTemplate:isTemplateBoolean,
    academicLevelId,
    isActive: isActiveBoolean
  });

  const {data: evaluationResponse} = evaluationRes;
  const evaluations = useMemo(() => evaluationResponse?.data || [], [evaluationResponse])
  console.log(evaluationRes);
  console.log(evaluationResponse);

  


  // Hook para la navegación
  const navigate = useNavigate();

  const handleIsActiveChange = (event) => {
    setIsActive(event.target.value);
  };

  const handleIsTemplateChange = (event) => {
    setIsTemplate(event.target.value);
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
// Si necesitas usar valores booleanos más adelante

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Lista de Evaluaciones
      </Typography>

      {/* Controles de Filtro */}
      <Box sx={{ display: 'flex', gap: 2, mb: 4 , justifyContent:'center', alignContent:'center'}}>
      <FormControl variant="outlined">
        <InputLabel id="isActive-label">Estado</InputLabel>
        <Select
          labelId="isActive-label"
          value={isActive}
          onChange={handleIsActiveChange}
          label="Estado"
        >
          <MenuItem value="true">Activas</MenuItem>
          <MenuItem value="false">Inactivas</MenuItem>
        </Select>
      </FormControl>

      {/* Para "Mostrar Solo Plantillas" */}
      <FormControl variant="outlined">
        <InputLabel id="isTemplate-label">Tipo</InputLabel>
        <Select
          labelId="isTemplate-label"
          value={isTemplate}
          onChange={handleIsTemplateChange}
          label="Tipo"
        >
          <MenuItem value="true">Plantillas</MenuItem>
          <MenuItem value="false">Programadas</MenuItem>
        </Select>
      </FormControl>

        <FormControl variant="outlined" sx={{ minWidth: 180, alignContent:'center', justifyContent:'center' }}>
          <InputLabel className='mt-2' id="academic-level-label">Nivel Académico</InputLabel>
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
        className='mt-2'
          label="Evaluaciones por Página"
          type="number"
          value={limit}
          onChange={handleLimitChange}
          variant="outlined"
          sx={{ width: 150 }}
        />


                <Button variant="contained" color="primary" onClick={() => setShowModal(true)}>
                    Nueva Evaluación
                </Button>
                <Button variant="contained" color="primary" onClick={() => setShowModal2(true)}>
                    Clonar Evaluación
                </Button>
                <Button variant="contained" color="primary" onClick={() => setShowModal3(true)}>
                    Asignar Usuario
                </Button>

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
          <div className='card'>

          {/* Lista de Evaluaciones */}
          <List>
          {evaluations.map((evaluation) => (
        <React.Fragment key={evaluation.id}>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton
              onClick={() =>
                handleEvaluationClick(evaluation.id, evaluation.isTemplate)
              }
            >
              <Grid
                container
                alignItems="center"
                spacing={2}
                sx={{ width: '100%', padding: 2 }}
              >
                {/* Título y Descripción */}
                <Grid item xs={12} sm={4}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {evaluation.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {evaluation.description}
                  </Typography>
                </Grid>

                {/* Nivel Académico */}
                <Grid item xs={12} sm={2} textAlign="center">
                  <SchoolIcon color="primary" fontSize="large" />
                  <Typography variant="body2">Nivel Académico:</Typography>
                  <Typography variant="body2">
                    {evaluation.academicLevel?.name || 'N/A'}
                  </Typography>
                </Grid>

                {/* Indicadores Visuales */}
                <Grid item xs={12} sm={4} textAlign="center">
                  <Box
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="end"
                    gap={4}
                  >
                    {/* Es Plantilla */}
                    <Tooltip
                      title={evaluation.isTemplate ? 'Plantilla' : 'Encuesta'}
                    >
                      {evaluation.isTemplate ? (
                        <TemplateIcon color="info" fontSize="large" />
                      ) : (
                        <NotTemplateIcon color="error" fontSize="large" />
                      )}
                    </Tooltip>

                    {/* Está Activa */}
                    <Tooltip
                      title={evaluation.isActive ? 'Está Activa' : 'Inactiva'}
                    >
                      {evaluation.isActive ? (
                        <ActiveIcon color="success" fontSize="large" />
                      ) : (
                        <InactiveIcon color="disabled" fontSize="large" />
                      )}
                    </Tooltip>
                  </Box>
                </Grid>
              </Grid>
            </ListItemButton>
          </ListItem>
        </React.Fragment>
      ))}
  </List>
  </div>

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
