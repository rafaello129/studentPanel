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
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { useGetAllAcademicLevelsQuery } from '../../../services/api/providers/academicLevelApi';
import { useNavigate } from 'react-router-dom';

interface props{
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
  setShowModal2: React.Dispatch<React.SetStateAction<boolean>>,
  setShowModal3: React.Dispatch<React.SetStateAction<boolean>>,
}

const EvaluationList: React.FC<props> = ( {setShowModal, setShowModal2, setShowModal3}) => {
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
      <Box sx={{ display: 'flex', gap: 2, mb: 4 , justifyContent:'center', alignContent:'center'}}>
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
          <ListItemButton onClick={() => handleEvaluationClick(evaluation.id, evaluation.isTemplate)}>
            <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-evenly' }}>
              {/* Title and Description */}
              <div style={{ flex: .3 }}>
                <Typography variant="h6" component="h4" style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                  {evaluation.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {evaluation.description}
                </Typography>
              </div>
              
              {/* Academic Level */}
              <div style={{ textAlign: 'center', padding: '0 10px' }}>
                <SchoolIcon style={{ color: '#1976d2', marginBottom: '4px' }} />
                <Typography variant="body2">
                  Nivel Académico: 
                </Typography>
                <Typography variant="body2">
                  {evaluation.academicLevel?.name || 'N/A'}
                </Typography>
              </div>
              
              {/* Is Template */}
              <div style={{ textAlign: 'center', padding: '0 10px' }}>
                {evaluation.isTemplate ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
                <Typography variant="body2">
                  Es Plantilla: 
                </Typography>
                <Typography variant="body2">
                  {evaluation.isTemplate ? 'Sí' : 'No'}
                </Typography>
              </div>
              
              {/* Is Active */}
              <div style={{ textAlign: 'center', padding: '0 10px' }}>
                {evaluation.isActive ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
                <Typography variant="body2">
                  Está Activa: 
                </Typography>
                <Typography variant="body2">
                  {evaluation.isActive ? 'Sí' : 'No'}
                </Typography>
              </div>
        
            </div>
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
