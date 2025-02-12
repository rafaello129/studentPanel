import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Chip,
  Divider,
  useTheme,
  useMediaQuery,
  Alert
} from '@mui/material';
import {
  ArrowBack,
  Book,
  Person,
  CalendarToday,
  Assignment
} from '@mui/icons-material';
import EmptyState from './components/EmptyState';
import DetailSection from './DetailSection';

const ClassDetailsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { classData } = location.state || {};

  if (!classData) {
    return (
      <EmptyState
        icon={<Book sx={{ fontSize: 60 }} />}
        title="Clase no encontrada"
        description="No se pudo cargar la información de la clase"
        sx={{ py: 8 }}
      />
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: isMobile ? 1 : 3 }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
        variant="outlined"
      >
        Volver atrás
      </Button>

      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 0 }}>
          <Book sx={{ fontSize: 40, mr:2, color: theme.palette.primary.main }} />
          <Typography variant="h4" component="h1">
            {classData.subject?.name + " -" || 'Clase sin nombre'}
          </Typography>
          <Typography variant="h5" component="h1">
            { " "+  classData.subject.clave  || 'Clase sin nombre'}
          </Typography>
          <Chip
            label={classData.status || 'Activa'}
            color="primary"
            size="small"
            sx={{ ml: 2 }}
          />
        </Box>
        <Typography variant="h6" component="h1" color='textSecondary'>
            {classData.package?.name  || 'Clase sin nombre'}
          </Typography>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <DetailItem
              icon={<Person />}
              title="Profesor"
              value={classData.teacher?.user?.fullName || 'No asignado'}
            />
            <DetailItem
              icon={<CalendarToday />}
              title="Semestre"
              value={classData.semester}
            />
            <DetailItem
              icon={<Assignment />}
              title="Subperiodo"
              value={classData.subperiod.key || 'N/A'}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            {classData.schedule && (
              <DetailSection
                title="Horario"
                content={
                  <Box sx={{ lineHeight: 1.6 }}>
                    {classData.schedule.days?.join(', ')}<br />
                    {classData.schedule.time}<br />
                    {classData.schedule.classroom && `Aula: ${classData.schedule.classroom}`}
                  </Box>
                }
              />
            )}
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            startIcon={<Assignment />}
            onClick={() => navigate(`/class/${classData.id}/assigned-tasks`)}
            size={isMobile ? 'medium' : 'large'}
          >
            Tareas Asignadas
          </Button>
          
          <Button
            variant="outlined"
            onClick={() => navigate(`/class/${classData.id}/resources`)}
            size={isMobile ? 'medium' : 'large'}
          >
            Material de Clase
          </Button>
        </Box>

        {classData.additionalInfo && (
          <Alert severity="info" sx={{ mt: 3, borderRadius: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Información adicional:
            </Typography>
            {classData.additionalInfo}
          </Alert>
        )}
      </Paper>
    </Box>
  );
};

// Componente auxiliar para detalles
const DetailItem: React.FC<{
  icon: React.ReactNode;
  title: string;
  value: string | number;
}> = ({ icon, title, value }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
    <Box sx={{ color: 'text.secondary', mr: 2 }}>{icon}</Box>
    <Box>
      <Typography variant="subtitle2" color="text.secondary">
        {title}
      </Typography>
      <Typography variant="body1">{value}</Typography>
    </Box>
  </Box>
);
export default ClassDetailsPage;