// src/components/MySection.tsx
import React from 'react';
import { Section as SectionType } from '../../../interfaces/section';
import MyQuestion from './MyQuestion';

interface SectionProps {
  section: SectionType;
  onAnswerChange: (questionId: number, answer: any) => void;
  existingAnswers: { [questionId: number]: any };
}

const MySection: React.FC<SectionProps> = ({
  section,
  onAnswerChange,
  existingAnswers,
}) => {
  return (
    <div>
      <h2>{section.title}</h2>
      <p>{section.description}</p>
      {section.questions?.map((question) => (
        <MyQuestion
          key={question.id}
          question={question}
          onChange={(answer) => onAnswerChange(question.id, answer)}
          existingAnswer={existingAnswers[question.id]}
        />
      ))}
    </div>
  );
};

export default MySection;
