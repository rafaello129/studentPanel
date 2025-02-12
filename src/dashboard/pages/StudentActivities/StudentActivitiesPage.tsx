import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Grid, Button } from '@mui/material';
import { useGetStudentClassActivitiesQuery } from '../../../services/api/providers/studentActivitiesApi';
import ActivityPreview from '../../components/Activity/ActivityPreview';

type FilterType = 'active' | 'finished';

const StudentActivitiesDashboardPage: React.FC = () => {
  // Obtener el ID del estudiante de localStorage y classId de los parámetros del router.
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  const studentId = user?.id;
  const { classId } = useParams<{ classId: string }>();
  const navigate = useNavigate();

  const { data, error, isLoading } = useGetStudentClassActivitiesQuery({
    studentId,
    classId: Number(classId),
  });

  const [selectedFilter, setSelectedFilter] = useState<FilterType>('active');

  if (isLoading) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography variant="h6">Cargando actividades...</Typography>
      </Box>
    );
  }

  if (error || !data) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography variant="h6" color="error">
          Ocurrió un error al obtener las actividades.
        </Typography>
      </Box>
    );
  }

  const currentDate = new Date();

  // Función para filtrar la fecha de la actividad según el filtro seleccionado.
  const filterSchedule = (sched: any) => {
    const startDate = new Date(sched.startDate);
    const endDate = new Date(sched.endDate);
    if (selectedFilter === 'active') {
      return currentDate >= startDate && currentDate <= endDate;
    }
    if (selectedFilter === 'finished') {
      return currentDate > endDate;
    }
    return false;
  };

  // Procesar y filtrar las actividades de todas las secciones.
  const filteredSections = data.activities
    .map((section) => {
      const filteredActivities = section.activities
        .map((activity: any) => {
          const filteredSchedules = activity.scheduledActivities.filter(filterSchedule);
          return { ...activity, filteredSchedules };
        })
        .filter((activity: any) => activity.filteredSchedules.length > 0);
      return { ...section, filteredActivities };
    })
    .filter((section) => section.filteredActivities.length > 0);

  return (
    <Box sx={{ mx: 'auto', mt: 4, maxWidth: 800, px: 2 }}>
      <Typography variant="h4" align="center" sx={{ mb: 3 }}>
        Actividades de la Clase
      </Typography>

      {/* Filtros */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4 }}>
        <Button
          variant={selectedFilter === 'active' ? 'contained' : 'outlined'}
          onClick={() => setSelectedFilter('active')}
        >
          Activas
        </Button>
        <Button
          variant={selectedFilter === 'finished' ? 'contained' : 'outlined'}
          onClick={() => setSelectedFilter('finished')}
        >
          Finalizadas
        </Button>
      </Box>

      {filteredSections.length === 0 && (
        <Box textAlign="center" my={4}>
          <Typography variant="h6" color="text.secondary">
            No hay actividades {selectedFilter === 'active' ? 'activas' : 'finalizadas'}.
          </Typography>
        </Box>
      )}

      {filteredSections.map((section) => (
        <Box key={section.sectionId} sx={{ mb: 4 }}>
          <Typography
            variant="h6"
            sx={{ mb: 2, borderBottom: '1px solid #ccc', pb: 1 }}
          >
            {section.sectionName}
          </Typography>
          {section.filteredActivities.map((activity: any) => (
            <Box
              key={activity.id}
              sx={{
                mb: 2,
                p: 2,
                border: '1px solid #e0e0e0',
                borderRadius: 1,
                cursor: 'pointer',
                transition: 'background-color 0.3s',
                '&:hover': { backgroundColor: '#fafafa' },
              }}
              onClick={() =>
                navigate(`/activity-details/${activity.filteredSchedules[0]?.id}`)
              }
            >
              <Typography variant="subtitle1" fontWeight="bold">
                {activity.title}
              </Typography>
              <ActivityPreview content={activity.content} />

              <Grid container spacing={2}>
                {activity.filteredSchedules.map((sched: any, index: number) => {
                  const startDate = new Date(sched.startDate);
                  const endDate = new Date(sched.endDate);
                  return (
                    <Grid item key={index}>
                      <Typography variant="body2">
                        {startDate.toLocaleString()} - {endDate.toLocaleString()}
                      </Typography>
                      <Typography variant="caption" color={selectedFilter === 'active' ? 'green' : 'error'}>
                        {selectedFilter === 'active' ? 'Activa' : 'Finalizada'}
                      </Typography>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default StudentActivitiesDashboardPage;