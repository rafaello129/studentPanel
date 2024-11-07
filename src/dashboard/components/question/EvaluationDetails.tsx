import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  useGetEvaluationQuery,
} from '../../../services/api/providers/evaluationApi';
import {
  Box,
  CircularProgress,
  Typography,
  Button,
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Edit } from '@mui/icons-material';
import { useUpdateSectionMutation } from '../../../services/api/providers/sectionApi';
import CreateSectionComponent from '../section/CreateSectionComponent';
import DeleteSectionButton from '../section/DeleteSectionButton';
import UpdateSectionComponent from '../section/UpdateSectionComponent';
import QuestionListComponent from '../question/QuestionListComponent';
import { Section } from '../../../interfaces/section';

const EvaluationDetails: React.FC = () => {
  const { evaluationId } = useParams<{ evaluationId: string }>();

  // Obtener la evaluación por ID
  const { data, error, isLoading, refetch } = useGetEvaluationQuery(Number(evaluationId));

  // Hook para la navegación
  const navigate = useNavigate();

  // Estado para manejar las secciones
  const [sections, setSections] = useState<Section[]>([]);

  // Estado para controlar la edición de una sección
  const [editingSectionId, setEditingSectionId] = useState<number | null>(null);

  // Mutación para actualizar una sección
  const [updateSection] = useUpdateSectionMutation();

  // Actualizar las secciones cuando cambie la evaluación
  useEffect(() => {
    if (data?.data) {
      const sortedSections = [...data.data.sections].sort((a, b) => a.order - b.order);
      setSections(sortedSections);
    }
  }, [data]);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !data?.data) {
    return (
      <Typography color="error">
        Error al cargar la evaluación o evaluación no encontrada.
      </Typography>
    );
  }

  const evaluation = data.data;

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const updatedSections = Array.from(sections);
    const [movedSection] = updatedSections.splice(result.source.index, 1);
    updatedSections.splice(result.destination.index, 0, movedSection);

    const sectionsWithNewOrder = updatedSections.map((section, index) => ({
      ...section,
      order: index,
    }));

    setSections(sectionsWithNewOrder);

    // Actualizar el orden en el backend
    try {
      await Promise.all(
        sectionsWithNewOrder.map((section) =>
          updateSection({
            id: section.id,
            data: { order: section.order },
          }).unwrap()
        )
      );
      // Refrescar los datos de la evaluación
      refetch();
    } catch (error) {
      console.error('Error al actualizar el orden de las secciones:', error);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Button variant="contained" onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        Volver
      </Button>

      <Typography variant="h4" gutterBottom>
        Detalles de la Evaluación
      </Typography>

      <Typography variant="h5">{evaluation.title}</Typography>
      <Typography variant="body1">{evaluation.description}</Typography>
      <Typography variant="body2">
        Nivel Académico: {evaluation.academicLevel?.name || 'N/A'}
      </Typography>
      <Typography variant="body2">
        Es Plantilla: {evaluation.isTemplate ? 'Sí' : 'No'}
      </Typography>
      <Typography variant="body2">
        Está Activa: {evaluation.isActive ? 'Sí' : 'No'}
      </Typography>

      {/* Crear Nueva Sección */}
      <CreateSectionComponent evaluationId={Number(evaluationId)} refetchEvaluation={refetch} />

      {/* Mostrar Secciones y Preguntas */}
      <Typography variant="h6" sx={{ mt: 4 }}>
        Secciones
      </Typography>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="sections">
          {(droppableProvided) => (
            <Box
              ref={droppableProvided.innerRef}
              {...droppableProvided.droppableProps}
              sx={{ mt: 2 }}
            >
              {sections.map((section, index) => (
                <Draggable key={section.id} draggableId={section.id.toString()} index={index}>
                  {(draggableProvided) => (
                    <Box
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.draggableProps}
                      sx={{
                        mb: 2,
                        p: 2,
                        border: '1px solid #ccc',
                        borderRadius: 2,
                        backgroundColor: '#f9f9f9',
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box {...draggableProvided.dragHandleProps} sx={{ mr: 2, cursor: 'grab' }}>
                          <Typography variant="h6">☰</Typography>
                        </Box>
                        <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
                          {section.title}
                        </Typography>
                        <IconButton onClick={() => setEditingSectionId(section.id)}>
                          <Edit />
                        </IconButton>
                        <DeleteSectionButton sectionId={section.id} refetchEvaluation={refetch} />
                      </Box>
                      <Typography variant="body2">{section.description}</Typography>

                      {/* Lista de Preguntas de la Sección */}
                      <QuestionListComponent sectionId={section.id} />
                    </Box>
                  )}
                </Draggable>
              ))}
              {droppableProvided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>

      {/* Componente para editar una sección */}
      {editingSectionId !== null && (
        <UpdateSectionComponent
          sectionId={editingSectionId}
          open={true}
          onClose={() => {
            setEditingSectionId(null);
            // Refrescar los datos después de cerrar el diálogo
            refetch();
          }}
        />
      )}
    </Box>
  );
};

export default EvaluationDetails;
