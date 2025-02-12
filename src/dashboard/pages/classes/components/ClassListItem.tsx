import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  List,
  Divider,
  Button,
  Tabs,
  Tab,
  Switch,
  FormControlLabel,
  useTheme,
  Skeleton,
  Grid,
  Alert,
  AlertTitle,
  Chip,
  useMediaQuery,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ErrorOutline, CalendarToday, ClassOutlined } from '@mui/icons-material';

interface StudentAssignedClassesProps {
  studentId: number;
  page?: number;
  pageSize?: number;
  isCurrent?: boolean;
}

// Componente para el ítem de la clase
const ClassListItem: React.FC<{ classItem: any; onViewDetails: () => void }> = ({
  classItem,
  onViewDetails,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Paper elevation={1} sx={{ mb: 2, p: 2 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={8}>
          <Typography variant="h6" gutterBottom>
            {classItem.subject?.name || 'Materia desconocida'}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
            <Chip
              icon={<ClassOutlined fontSize="small" />}
              label={`Semestre: ${classItem.semester}`}
              size="small"
              variant="outlined"
            />
            <Chip
              icon={<CalendarToday fontSize="small" />}
              label={"horario"}
              size="small"
              variant="outlined"
              color="primary"
            />
          </Box>
          <Typography variant="body2" color="text.secondary">
            Profesor: {classItem.teacher?.user?.fullName ?? 'Sin profesor asignado'}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4} sx={{ textAlign: isMobile ? 'left' : 'right' }}>
          <Button
            variant="outlined"
            onClick={onViewDetails}
            fullWidth={isMobile}
            size={isMobile ? 'small' : 'medium'}
          >
            Ver detalles
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ClassListItem;