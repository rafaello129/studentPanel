// src/components/questions/MyMultipleChoiceQuestion.tsx
import React from 'react';
import { Question as QuestionType } from '../../../interfaces/question';
import { AnswerOption } from '../../../interfaces/answer-option';


interface MultipleChoiceQuestionProps {
  question: QuestionType;
  onChange: (answer: any) => void;
  existingAnswer: any;
}

const MyMultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
  question,
  onChange,
  existingAnswer,
}) => {
  const handleChange = (optionId: number, checked: boolean) => {
    if (question.allowMultipleAnswers) {
      const current = existingAnswer || [];
      if (checked) {
        onChange([...current, optionId]);
      } else {
        onChange(current.filter((id: number) => id !== optionId));
      }
    } else {
      onChange(checked ? optionId : null);
    }
  };

  return (
    <div>
      <p>{question.text}</p>
      {question.answerOptions?.map((option: AnswerOption) => {
        const isChecked = question.allowMultipleAnswers
          ? existingAnswer?.includes(option.id)
          : existingAnswer === option.id;
        return (
          <div key={option.id}>
            <label>
              <input
                type={question.allowMultipleAnswers ? 'checkbox' : 'radio'}
                name={`question-${question.id}`}
                value={option.id}
                checked={isChecked}
                onChange={(e) => handleChange(option.id, e.target.checked)}
              />
              {option.text}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default MyMultipleChoiceQuestion;
