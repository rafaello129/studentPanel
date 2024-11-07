// src/components/questions/MyOpenEndedQuestion.tsx
import React from 'react';
import { Question as QuestionType } from '../../../interfaces/question';

interface OpenEndedQuestionProps {
  question: QuestionType;
  onChange: (answer: any) => void;
  existingAnswer: any;
}

const MyOpenEndedQuestion: React.FC<OpenEndedQuestionProps> = ({
  question,
  onChange,
  existingAnswer,
}) => {
  return (
    <div>
      <p>{question.text}</p>
      <textarea
        value={existingAnswer || ''}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        cols={50}
      ></textarea>
    </div>
  );
};

export default MyOpenEndedQuestion;
