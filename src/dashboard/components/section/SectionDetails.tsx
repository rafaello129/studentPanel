// src/components/sections/SectionDetails.tsx

import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { useGetSectionByIdQuery } from '../../../services/api/providers/sectionApi';

const SectionDetails: React.FC = () => {
  const { sectionId } = useParams<{ sectionId: string }>();
  const { data, error, isLoading } = useGetSectionByIdQuery(Number(sectionId));

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !data?.data) {
    return (
      <Alert severity="error">Error al cargar la sección.</Alert>
    );
  }

  const section = data.data;

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        {section.title}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {section.description}
      </Typography>

      {/* Si deseas mostrar preguntas, puedes descomentar lo siguiente */}
      <Typography variant="h6" sx={{ mt: 4 }}>
        Preguntas
      </Typography>
      <List>
        {section.questions?.map((question) => (
          <ListItem key={question.id}>
            <ListItemText
              primary={question.text}
              secondary={`Tipo: ${question.questionType.name}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SectionDetails;
