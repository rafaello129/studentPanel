// src/components/answerOption/AnswerOptionListComponent.tsx

import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, Paper, Radio, RadioGroup, FormControlLabel, Checkbox, Card } from '@mui/material';
import { DragIndicator, Edit } from '@mui/icons-material';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';

import { AnswerOption } from '../../../interfaces/answer-option';
import CreateAnswerOptionComponent from './CreateAnswerOptionComponent';
import DeleteAnswerOptionButton from './DeleteAnswerOptionButton';
import UpdateAnswerOptionComponent from './UpdateAnswerOptionComponent';
import { useGetAnswerOptionsByQuestionQuery, useUpdateAnswerOptionMutation } from '../../../services/api/providers/answerOptionApi';
import { QuestionTypeEnum } from '../question/CreateQuestionComponent';

interface AnswerOptionListComponentProps {
  questionId: number;
  questionType: QuestionTypeEnum;
}

const AnswerOptionListComponent: React.FC<AnswerOptionListComponentProps> = ({ questionId, questionType }) => {
  const { data, refetch } = useGetAnswerOptionsByQuestionQuery(questionId);
  const [answerOptions, setAnswerOptions] = useState<AnswerOption[]>([]);
  const [editingAnswerOptionId, setEditingAnswerOptionId] = useState<number | null>(null);

  const [updateAnswerOption] = useUpdateAnswerOptionMutation();

  useEffect(() => {
    if (data?.data) {
      const sortedOptions = [...data.data].sort((a, b) => a.order - b.order);
      setAnswerOptions(sortedOptions);
    }
  }, [data]);

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const updatedOptions = Array.from(answerOptions);
    const [movedOption] = updatedOptions.splice(result.source.index, 1);
    updatedOptions.splice(result.destination.index, 0, movedOption);

    const optionsWithNewOrder = updatedOptions.map((option, index) => ({
      ...option,
      order: index,
    }));

    setAnswerOptions(optionsWithNewOrder);

    try {
      await Promise.all(
        optionsWithNewOrder.map((option) =>
          updateAnswerOption({
            id: option.id,
            data: { order: option.order },
          }).unwrap()
        )
      );
      refetch();
    } catch (error) {
      console.error('Error al actualizar el orden de las opciones de respuesta:', error);
    }
  };

  // Función para renderizar las opciones según el tipo de pregunta
  const renderOptions = () => {
    switch (questionType) {
      case QuestionTypeEnum.SINGLE_CHOICE:
        return (
          <RadioGroup>
            {answerOptions.map((option) => (
              <FormControlLabel key={option.id} value={option.id.toString()} control={<Radio />} label={option.text} />
            ))}
          </RadioGroup>
        );
      case QuestionTypeEnum.SINGLE_CHOICE:
      case QuestionTypeEnum.MULTIPLE_CHOICE:
        return (
          <>
            {answerOptions.map((option) => (
              <FormControlLabel
                key={option.id}
                control={<Checkbox />}
                label={option.text}
              />
            ))}
          </>
        );
      case QuestionTypeEnum.OPEN_ENDED:
        // No se muestran opciones de respuesta para preguntas abiertas
        return (
          <Typography variant="body2" color="text.secondary">
            Esta es una pregunta abierta. No hay opciones de respuesta.
          </Typography>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ mt: 2, ml: 4 }}>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        Opciones de Respuesta
      </Typography>

      {/* Solo mostrar el componente para crear opciones si la pregunta no es abierta */}
      {questionType !== QuestionTypeEnum.OPEN_ENDED && (
        <CreateAnswerOptionComponent questionId={questionId} refetchAnswerOptions={refetch} />
      )}

      {/* Renderizar las opciones según el tipo de pregunta */}
      {renderOptions()}

      {/* Mostrar las opciones solo si la pregunta no es abierta */}
      {questionType !== QuestionTypeEnum.OPEN_ENDED && (
        <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="answerOptions">
          {(provided) => (
            <Box ref={provided.innerRef} {...provided.droppableProps} sx={{ mt: 2 }}>
              {answerOptions.map((option, index) => (
                <Draggable key={option.id} draggableId={option.id.toString()} index={index}>
                  {(provided, snapshot) => (
                    <Card
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      sx={{
                        mb: 2,
                        p: 2,
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: snapshot.isDragging ? '#e3f2fd' : '#fff',
                        boxShadow: snapshot.isDragging ? 4 : 1,
                        borderRadius: 2,
                      }}
                    >
                      <Box
                        {...provided.dragHandleProps}
                        sx={{ mr: 2, cursor: 'grab', color: '#90a4ae' }}
                      >
                        <DragIndicator />
                      </Box>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                          {option.text}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Puntuación: {option.score} | Orden: {option.order}
                        </Typography>
                      </Box>
                      <IconButton onClick={() => setEditingAnswerOptionId(option.id)}>
                        <Edit />
                      </IconButton>
                      <DeleteAnswerOptionButton
                        answerOptionId={option.id}
                        refetchAnswerOptions={refetch}
                      />
                    </Card>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>
      )}

      {/* Componente para editar una opción de respuesta */}
      {editingAnswerOptionId !== null && (
        <UpdateAnswerOptionComponent
          answerOptionId={editingAnswerOptionId}
          open={true}
          onClose={() => {
            setEditingAnswerOptionId(null);
            refetch();
          }}
        />
      )}
    </Box>
  );
};

export default AnswerOptionListComponent;
