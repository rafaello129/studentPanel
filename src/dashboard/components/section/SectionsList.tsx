// src/components/sections/SectionsList.tsx

import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useGetSectionsByEvaluationQuery } from '../../../services/api/providers/sectionApi';

interface SectionsListProps {
  evaluationId: number;
}

const SectionsList: React.FC<SectionsListProps> = ({ evaluationId }) => {
  const { data, error, isLoading } = useGetSectionsByEvaluationQuery(evaluationId);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error">Error al cargar las secciones.</Alert>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Secciones de la Evaluación
      </Typography>
      <List>
        {data?.data.map((section) => (
          <ListItem key={section.id} sx={{ borderBottom: '1px solid #ccc' }}>
            <ListItemText
              primary={section.title}
              secondary={section.description}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SectionsList;
