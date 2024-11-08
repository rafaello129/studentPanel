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
    Modal
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    return (
        <div className="card p-3 m-3">
            <div className="mt-4">
                <EvaluationInstructions />
            </div>

            {/* Botón para abrir el modal */}
            <Box textAlign="center" mt={4}>
                <Button variant="contained" color="primary" onClick={handleOpenModal}>
                    Crear Nueva Evaluación
                </Button>
            </Box>

            {/* Modal para el formulario de creación */}
            <Modal open={openModal} onClose={handleCloseModal}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 1,
                    }}
                >
                    <CreateEvaluationForm />
                    <Box textAlign="right" mt={2}>
                        <Button onClick={handleCloseModal} color="secondary">Cerrar</Button>
                    </Box>
                </Box>
            </Modal>

            <EvaluationList />

            {/* Contenedor para los botones en la misma fila */}
            <Box display="flex" justifyContent="space-between" mt={4} mb={5}>
                <CloneEvaluationButton />
                <AssignUsersToEvaluation />
            </Box>
        </div>
    );
};
