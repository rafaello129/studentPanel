import React, { useState } from "react";
import AssignUsersToEvaluation from "../../components/evaluation/AssignUsersToEvaluation";
import CloneEvaluationButton from "../../components/evaluation/CloneEvaluationButton";
import CreateEvaluationForm from "../../components/evaluation/CreateEvaluationForm";
import EvaluationList from "../../components/evaluation/EvaluationList";
import {
    Box,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Button,
    Modal,
    IconButton,
    Paper
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from '@mui/icons-material/Close';

const EvaluationInstructions = () => (
    <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Instrucciones para la Creación y Gestión de Evaluaciones</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <ol>
                <li><strong>Crear Nueva Evaluación:</strong>
                    <ul>
                        <li>Navega a la página de Evaluaciones.</li>
                        <li>En el formulario de creación, ingresa el Título, una Descripción y selecciona el Nivel Académico asociado.</li>
                        <li>Haz clic en Crear Evaluación para guardar la nueva evaluación.</li>
                    </ul>
                </li>
                <li><strong>Configurar la Evaluación:</strong>
                    <ul>
                        <li>Una vez creada, selecciona la evaluación en la lista para acceder a sus detalles.</li>
                        <li>Dentro de los detalles, puedes agregar Secciones y Preguntas.</li>
                    </ul>
                </li>
                <li><strong>Clonar Evaluación (Plantillas):</strong>
                    <ul>
                        <li>Selecciona la evaluación a clonar, define una Fecha Programada y selecciona las Clases.</li>
                        <li>Haz clic en Clonar Evaluación para duplicar la evaluación.</li>
                    </ul>
                </li>
                <li><strong>Asignar Usuarios:</strong>
                    <ul>
                        <li>Selecciona una evaluación existente y proporciona los IDs de los usuarios para asignarlos.</li>
                    </ul>
                </li>
                <li><strong>Filtros y Opciones de Visualización:</strong>
                    <ul>
                        <li>Usa los filtros para ver solo activas o plantillas, y ajustar el número de evaluaciones por página.</li>
                    </ul>
                </li>
            </ol>
        </AccordionDetails>
    </Accordion>
);

export const EvaluationPage = () => {
    const [openModal, setOpenModal] = useState(false);

    const [openModal2, setOpenModal2] = useState(false);
    const [openModal3, setOpenModal3] = useState(false);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const handleCloseModal2 = () => setOpenModal2(false);
    const handleCloseModal3 = () => setOpenModal3(false);

    return (
        <div className="card p-4 m-3">
            <div className="mt-4">
                <EvaluationInstructions />
            </div>

            {/* Botón para abrir el modal */}
            

            {/* Modal para el formulario de creación */}
            <Modal open={openModal} onClose={handleCloseModal}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          p: 2,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            position: 'relative',
            width: '100%',
            maxWidth: 600,
            p: 4,
            borderRadius: 2,
            textAlign: 'center', // Centrar el contenido dentro del modal
          }}
        >
          {/* Botón de cierre en la esquina superior derecha */}
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Título del modal */}
          <Typography variant="h6" component="h2" gutterBottom>
            Crear Nueva Evaluación
          </Typography>

          {/* Descripción */}
          <Typography variant="body1" gutterBottom>
            Completa el formulario para crear una nueva evaluación.
          </Typography>

          {/* Componente personalizado */}
          <Box mt={2}>
            <CreateEvaluationForm />
          </Box>

          {/* Botón de cierre en la parte inferior */}
          <Box mt={4} textAlign="center">
            <Button onClick={handleCloseModal} variant="contained" color="secondary">
              Cerrar
            </Button>
          </Box>
        </Paper>
      </Box>
    </Modal>

        
            <Modal open={openModal2} onClose={handleCloseModal2}>
        <Box
            sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            p: 2,
            }}
        >
            <Paper
            elevation={3}
            sx={{
                position: 'relative',
                width: '100%',
                maxWidth: 600,
                p: 4,
                borderRadius: 2,
            }}
            >
            {/* Botón de cierre en la esquina superior derecha */}
            <IconButton
                aria-label="close"
                onClick={handleCloseModal2}
                sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                }}
            >
                <CloseIcon />
            </IconButton>

            {/* Título del modal */}
            <Typography variant="h6" component="h2" gutterBottom>
                programar Evaluación
            </Typography>

            {/* Contenido principal del modal */}
            <Typography variant="body1" gutterBottom>
            Inicia la programación de una evaluación usando una plantilla
            </Typography>

            {/* Componente personalizado */}
            <Box mt={2}>
                <CloneEvaluationButton />
            </Box>

            {/* Botón de cierre en la parte inferior */}
            <Box mt={4} textAlign="right">
                <Button onClick={handleCloseModal2} variant="contained" color="secondary">
                Cerrar
                </Button>
            </Box>
            </Paper>
        </Box>
            </Modal>

            <Modal open={openModal3} onClose={handleCloseModal3}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          p: 2,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            position: 'relative',
            width: '100%',
            maxWidth: 600,
            p: 4,
            borderRadius: 2,
          }}
        >
          {/* Botón de cierre en la esquina superior derecha */}
          <IconButton
            aria-label="close"
            onClick={handleCloseModal3}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Título del modal */}
          <Typography variant="h6" component="h2" gutterBottom>
            Asignar Usuarios a la Evaluación
          </Typography>

          {/* Descripción */}
          <Typography variant="body1" gutterBottom>
            Selecciona los usuarios que deseas asignar a esta evaluación.
          </Typography>

          {/* Componente personalizado */}
          <Box mt={2}>
            <AssignUsersToEvaluation />
          </Box>

          {/* Botón de cierre en la parte inferior */}
          <Box mt={4} textAlign="right">
            <Button onClick={handleCloseModal3} variant="contained" color="secondary">
              Cerrar
            </Button>
          </Box>
        </Paper>
      </Box>
    </Modal>
            <EvaluationList  setShowModal={setOpenModal} setShowModal2={setOpenModal2} setShowModal3={setOpenModal3}/>

            {/* Contenedor para los botones en la misma fila */}
            <Box display="flex" justifyContent="space-between" mt={4} mb={5}>
                
                
            </Box>
        </div>
    );
};
