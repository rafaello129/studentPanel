// src/components/questions/QuestionListComponent.tsx

import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, Paper } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Question } from '../../../interfaces/question';
import { useGetQuestionsBySectionQuery, useUpdateQuestionMutation } from '../../../services/api/providers/questionApi';
import CreateQuestionComponent, { QuestionTypeEnum } from './CreateQuestionComponent';
import DeleteQuestionButton from './DeleteQuestionButton';
import UpdateQuestionComponent from './UpdateQuestionComponent';
import AnswerOptionListComponent from '../answerOption/AnswerOptionListComponent';

interface QuestionListComponentProps {
  sectionId: number;
}

const QuestionListComponent: React.FC<QuestionListComponentProps> = ({ sectionId }) => {
  const { data, refetch } = useGetQuestionsBySectionQuery(sectionId);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [editingQuestionId, setEditingQuestionId] = useState<number | null>(null);

  const [updateQuestion] = useUpdateQuestionMutation();

  useEffect(() => {
    if (data?.data) {
      const sortedQuestions = [...data.data].sort((a, b) => a.order - b.order);
      setQuestions(sortedQuestions);
    }
  }, [data]);

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const updatedQuestions = Array.from(questions);
    const [movedQuestion] = updatedQuestions.splice(result.source.index, 1);
    updatedQuestions.splice(result.destination.index, 0, movedQuestion);

    const questionsWithNewOrder = updatedQuestions.map((question, index) => ({
      ...question,
      order: index,
    }));

    setQuestions(questionsWithNewOrder);

    try {
      await Promise.all(
        questionsWithNewOrder.map((question) =>
          updateQuestion({
            id: question.id,
            data: { order: question.order },
          }).unwrap()
        )
      );
      refetch();
    } catch (error) {
      console.error('Error al actualizar el orden de las preguntas:', error);
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      {/* Componente para crear una nueva pregunta */}
      <CreateQuestionComponent sectionId={sectionId} refetchQuestions={refetch} />

      <Typography variant="subtitle1" sx={{ mt: 2 }}>
        Preguntas
      </Typography>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="questions">
          {(droppableProvided) => (
            <Box ref={droppableProvided.innerRef} {...droppableProvided.droppableProps}>
              {questions.map((question, index) => (
                <Draggable key={question.id} draggableId={question.id.toString()} index={index}>
                  {(draggableProvided) => (
                    <Paper
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
                        <Typography variant="body1" sx={{ flexGrow: 1 }}>
                          {question.text}
                        </Typography>
                        <IconButton onClick={() => setEditingQuestionId(question.id)}>
                          <Edit />
                        </IconButton>
                        <DeleteQuestionButton questionId={question.id} refetchQuestions={refetch} />
                      </Box>
                      {/* Lista de opciones de respuesta para esta pregunta */}
                      <AnswerOptionListComponent 
                        questionId={question.id} 
                        questionType={question.questionType.name as QuestionTypeEnum} // Pasar el tipo de pregunta
                      />
                    </Paper>
                  )}
                </Draggable>
              ))}
              {droppableProvided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>

      {/* Componente para editar una pregunta */}
      {editingQuestionId !== null && (
        <UpdateQuestionComponent
          questionId={editingQuestionId}
          open={true}
          onClose={() => {
            setEditingQuestionId(null);
            refetch();
          }}
        />
      )}
    </Box>
  );
};

export default QuestionListComponent;
