// src/interfaces/question.ts

import { AnswerOption } from './answer-option';
import { QuestionType } from './question-type';

export interface Question {
  id: number;
  text: string;
  order: number;
  allowMultipleAnswers: boolean;
  questionType: QuestionType;
  answerOptions: AnswerOption[];
}
