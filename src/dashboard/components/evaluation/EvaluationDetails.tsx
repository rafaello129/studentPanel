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
  Card,
  CardContent,
  Chip,
  Grid,
  Collapse,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable, DropResult, DraggableProvided, DraggableStateSnapshot, DroppableProvided } from '@hello-pangea/dnd';
import { DragIndicator, Edit, ExpandLess, ExpandMore } from '@mui/icons-material';
import { useUpdateSectionMutation } from '../../../services/api/providers/sectionApi';
import CreateSectionComponent from '../section/CreateSectionComponent';
import DeleteSectionButton from '../section/DeleteSectionButton';
import UpdateSectionComponent from '../section/UpdateSectionComponent';
import QuestionListComponent from '../question/QuestionListComponent';
import { Section } from '../../../interfaces/section';
import {
  School as SchoolIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Description as DescriptionIcon,
  Title as TitleIcon,
  Description as TemplateIcon,
  Description as NotTemplateIcon,
} from '@mui/icons-material';

interface ParentComponentProps {
  evaluationId: number;
  refetchEvaluation: () => void;
}

const EvaluationDetails: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<number[]>([]);

  const toggleExpand = (sectionId: number) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };
  const [showCreateSection, setShowCreateSection] = useState(false);

  const handleToggleCreateSection = () => {
    setShowCreateSection((prevState) => !prevState);
  };

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

      <Card sx={{ maxWidth: "100vw", margin: '0 auto', mt: 4 }}>
      <CardContent>
        {/* Título principal */}
        <Typography variant="h4" component="h1" gutterBottom textAlign="center">
          Detalles de la Evaluación
        </Typography>

        {/* Información de la evaluación */}
        <Grid container spacing={2}>
          {/* Título de la evaluación */}
          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              <TitleIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h5" component="h2">
                {evaluation.title}
              </Typography>
            </Box>
          </Grid>

          {/* Descripción */}
          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              <DescriptionIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="body1">
                {evaluation.description}
              </Typography>
            </Box>
          </Grid>

          {/* Nivel Académico */}
          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center">
              <SchoolIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="body2">
                Nivel Académico:
              </Typography>
              <Typography variant="body2" sx={{ ml: 1, fontWeight: 'bold' }}>
                {evaluation.academicLevel?.name || 'N/A'}
              </Typography>
            </Box>
          </Grid>

          {/* Es Plantilla */}
          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center">
              {evaluation.isTemplate ? (
                <TemplateIcon color="warning" sx={{ mr: 1 }} />
              ) : (
                <NotTemplateIcon color="disabled" sx={{ mr: 1 }} />
              )}
              <Typography variant="body2">
             Tipo:
              </Typography>
              <Typography variant="body2" sx={{ ml: 1, fontWeight: 'bold' }}>
                {evaluation.isTemplate ? 'Plantilla' : 'Evaluación'}
              </Typography>
            </Box>
          </Grid>

          {/* Está Activa */}
          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center">
              {evaluation.isActive ? (
                <CheckCircleIcon color="success" sx={{ mr: 1 }} />
              ) : (
                <CancelIcon color="error" sx={{ mr: 1 }} />
              )}
              <Typography variant="body2">
                Está Activa:
              </Typography>
              <Typography variant="body2" sx={{ ml: 1, fontWeight: 'bold' }}>
                {evaluation.isActive ? 'Sí' : 'No'}
              </Typography>
            </Box>
          </Grid>

          {/* Estado con Chip */}
          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center">
              <Typography variant="body2" sx={{ mr: 1 }}>
                Estado:
              </Typography>
              <Chip
                label={evaluation.isActive ? 'Activa' : 'Inactiva'}
                color={evaluation.isActive ? 'success' : 'default'}
                icon={
                  evaluation.isActive ? (
                    <CheckCircleIcon />
                  ) : (
                    <CancelIcon />
                  )
                }
              />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>

    <Button variant="contained" color="primary" onClick={handleToggleCreateSection}>
        {showCreateSection ? 'Ocultar Crear Sección' : 'Mostrar Crear Sección'}
      </Button>
  
      {showCreateSection && (
        <CreateSectionComponent
          evaluationId={Number(evaluationId)}
          refetchEvaluation={refetch}
          //onClose={handleToggleCreateSection} // Opcional, si deseas que el hijo pueda cerrar
        />
      )}
      {/* Mostrar Secciones y Preguntas */}
      <Typography variant="h6" sx={{ mt: 4 }}>
        Secciones
      </Typography>

      <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="sections">
        {(provided: DroppableProvided) => (
          <Box
            ref={provided.innerRef}
            {...provided.droppableProps}
            sx={{ mt: 2 }}
          >
            {sections.map((section, index) => (
              <Draggable key={section.id} draggableId={section.id.toString()} index={index}>
                {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                  <Card
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    sx={{
                      mb: 2,
                      backgroundColor: snapshot.isDragging ? '#e0f7fa' : '#fff',
                      boxShadow: snapshot.isDragging ? 4 : 1,
                      borderRadius: 2,
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
                      <Box
                        {...provided.dragHandleProps}
                        sx={{ mr: 2, cursor: 'grab', color: '#607d8b' }}
                      >
                        <DragIndicator />
                      </Box>
                      <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        {section.title}
                      </Typography>
                      <IconButton
                        onClick={() => toggleExpand(section.id)}
                        aria-label={
                          expandedSections.includes(section.id)
                            ? 'Colapsar sección'
                            : 'Expandir sección'
                        }
                      >
                        {expandedSections.includes(section.id) ? <ExpandLess /> : <ExpandMore />}
                      </IconButton>
                      <IconButton onClick={() => setEditingSectionId(section.id)}>
                        <Edit />
                      </IconButton>
                      <DeleteSectionButton sectionId={section.id} refetchEvaluation={refetch} />
                    </Box>
                    {section.description && (
                      <Typography variant="body2" sx={{ px: 2, pb: 2 }}>
                        {section.description}
                      </Typography>
                    )}
                    <Collapse in={expandedSections.includes(section.id)} timeout="auto" unmountOnExit>
                      {/* Lista de Preguntas de la Sección */}
                      <QuestionListComponent sectionId={section.id} />
                    </Collapse>
                  </Card>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
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
