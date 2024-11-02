// src/interfaces/question.ts

import { AnswerOption } from './answerOption';
import { QuestionType } from './questionType';

export interface Question {
  id?: number;
  text: string;
  order?: number;
  questionType: QuestionType;
  answerOptions?: AnswerOption[];
  allowMultipleAnswers?: boolean;
}
