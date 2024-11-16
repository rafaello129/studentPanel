// src/components/questions/QuestionListComponent.tsx

import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, Paper, Card, Collapse } from '@mui/material';
import { DragIndicator, Edit, ExpandLess, ExpandMore } from '@mui/icons-material';
import { DragDropContext, Droppable, Draggable, DropResult, DraggableProvided, DraggableStateSnapshot, DroppableProvided } from '@hello-pangea/dnd';
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
  const [expandedQuestions, setExpandedQuestions] = useState<number[]>([]);
  const toggleExpand = (questionId: number) => {
    setExpandedQuestions((prev) =>
      prev.includes(questionId) ? prev.filter((id) => id !== questionId) : [...prev, questionId]
    );
  };
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
        {(provided: DroppableProvided) => (
          <Box ref={provided.innerRef} {...provided.droppableProps}>
            {questions.map((question, index) => (
              <Draggable key={question.id} draggableId={question.id.toString()} index={index}>
                {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                  <Card
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    sx={{
                      mb: 2,
                      backgroundColor: snapshot.isDragging ? '#e3f2fd' : '#fff',
                      boxShadow: snapshot.isDragging ? 4 : 1,
                      borderRadius: 2,
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
                      <Box
                        {...provided.dragHandleProps}
                        sx={{ mr: 2, cursor: 'grab', color: '#90a4ae' }}
                      >
                        <DragIndicator />
                      </Box>
                      <Typography variant="body1" sx={{ flexGrow: 1 }}>
                        {question.text}
                      </Typography>
                      <IconButton
                        onClick={() => toggleExpand(question.id)}
                        aria-label={
                          expandedQuestions.includes(question.id)
                            ? 'Colapsar pregunta'
                            : 'Expandir pregunta'
                        }
                      >
                        {expandedQuestions.includes(question.id) ? <ExpandLess /> : <ExpandMore />}
                      </IconButton>
                      <IconButton onClick={() => setEditingQuestionId(question.id)}>
                        <Edit />
                      </IconButton>
                      <DeleteQuestionButton questionId={question.id} refetchQuestions={refetch} />
                    </Box>
                    <Collapse in={expandedQuestions.includes(question.id)} timeout="auto" unmountOnExit>
                      <AnswerOptionListComponent
                        questionId={question.id}
                        questionType={question.questionType.name as QuestionTypeEnum}
                      />
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
