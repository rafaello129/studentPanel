// src/components/MyQuestion.tsx
import React from 'react';
import { Question as QuestionType, QuestionTypeEnum } from '../../../interfaces/question-type';
import MyMultipleChoiceQuestion from './MyMultipleChoiceQuestion';
import MyOpenEndedQuestion from './MyOpenEndedQuestion';


interface QuestionProps {
  question: QuestionType;
  onChange: (answer: any) => void;
  existingAnswer: any;
}

const MyQuestion: React.FC<QuestionProps> = ({
  question,
  onChange,
  existingAnswer,
}) => {
  switch (question.questionType.name) {
    case QuestionTypeEnum.SINGLE_CHOICE:
    case QuestionTypeEnum.MULTIPLE_CHOICE:
      return (
        <MyMultipleChoiceQuestion
          question={question}
          onChange={onChange}
          existingAnswer={existingAnswer}
        />
      );
    case QuestionTypeEnum.OPEN_ENDED:
      return (
        <MyOpenEndedQuestion
          question={question}
          onChange={onChange}
          existingAnswer={existingAnswer}
        />
      );
    default:
      return <div>Tipo de pregunta no soportado.</div>;
  }
};

export default MyQuestion;
