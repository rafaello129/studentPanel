import React from 'react';
import { IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useDeleteQuestionMutation } from '../../../services/api/providers/questionApi';

interface DeleteQuestionButtonProps {
  questionId: number;
  refetchQuestions: () => void;
}

const DeleteQuestionButton: React.FC<DeleteQuestionButtonProps> = ({ questionId, refetchQuestions }) => {
  const [deleteQuestion] = useDeleteQuestionMutation();

  const handleDelete = async () => {
    try {
      await deleteQuestion(questionId).unwrap();
      refetchQuestions();
    } catch (error) {
      console.error('Error al eliminar la pregunta:', error);
    }
  };

  return (
    <IconButton onClick={handleDelete}>
      <Delete />
    </IconButton>
  );
};

export default DeleteQuestionButton;
