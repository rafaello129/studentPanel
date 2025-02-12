// src/pages/AssignedTasksPage.tsx

import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress, Divider, Button } from '@mui/material';
import { useGetAssignedActivitiesQuery } from '../../../services/api/providers/classApi';

const AssignedTasksPage: React.FC = () => {
  const { classId } = useParams<{ classId: string }>();
  const { data, isLoading, error } = useGetAssignedActivitiesQuery(Number(classId));

  // Helper functions to determine status
  const isUpcoming = (startDate: Date) => new Date() < new Date(startDate);
  const isOngoing = (startDate: Date, endDate: Date) => {
    const now = new Date();
    return now >= new Date(startDate) && now <= new Date(endDate);
  };
  const isFinished = (endDate: Date) => new Date() > new Date(endDate);

  if (isLoading) {
    return (
      <Box textAlign="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !data) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography variant="h6" color="error">
          Error al cargar las actividades asignadas.
        </Typography>
      </Box>
    );
  }

  // Separate tasks by status
  const upcomingTasks = data.data.filter((task) => isUpcoming(task.startDate));
  const ongoingTasks = data.data.filter((task) => isOngoing(task.startDate, task.endDate));
  const finishedTasks = data.data.filter((task) => isFinished(task.endDate));

  return (
    <Box p={2}>
      <Typography variant="h5" gutterBottom>
        Actividades Asignadas
      </Typography>
      
      {/* Section: Próximas */}
      <Typography variant="h6">Próximas</Typography>
      {upcomingTasks.length === 0 ? (
        <Typography color="text.secondary">No hay actividades próximas.</Typography>
      ) : (
        upcomingTasks.map((task) => (
          <Box key={task.id} mb={2}>
            <Typography variant="subtitle1">{task.activity.title}</Typography>
            <Typography variant="body2">Inicio: {new Date(task.startDate).toLocaleString()}</Typography>
            <Divider sx={{ mt: 1, mb: 1 }} />
          </Box>
        ))
      )}

      {/* Section: En curso */}
      <Typography variant="h6">En curso</Typography>
      {ongoingTasks.length === 0 ? (
        <Typography color="text.secondary">No hay actividades en curso.</Typography>
      ) : (
        ongoingTasks.map((task) => (
          <Box key={task.id} mb={2}>
            <Typography variant="subtitle1">{task.activity.title}</Typography>
            <Typography variant="body2">Fin: {new Date(task.endDate).toLocaleString()}</Typography>
            <Divider sx={{ mt: 1, mb: 1 }} />
          </Box>
        ))
      )}

      {/* Section: Finalizadas */}
      <Typography variant="h6">Finalizadas</Typography>
      {finishedTasks.length === 0 ? (
        <Typography color="text.secondary">No hay actividades finalizadas.</Typography>
      ) : (
        finishedTasks.map((task) => (
          <Box key={task.id} mb={2}>
            <Typography variant="subtitle1">{task.activity.title}</Typography>
            <Typography variant="body2">
              Se programó: {new Date(task.startDate).toLocaleDateString()} -{' '}
              {new Date(task.endDate).toLocaleDateString()}
            </Typography>
            <Divider sx={{ mt: 1, mb: 1 }} />
          </Box>
        ))
      )}
    </Box>
  );
};

export default AssignedTasksPage;