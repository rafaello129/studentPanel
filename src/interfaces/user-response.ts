// src/interfaces/user-response.ts
import { Evaluation } from './evaluation';
import { User } from './user';
import { Question } from './question';
import { AnswerOption } from './answer-option';
import { Class } from './class';

export interface UserResponse {
  id: number;
  evaluation: Evaluation;
  user: User;
  question: Question;
  class: Class;
  openEndedResponse?: string;
  selectedOption?: AnswerOption;
  selectedOptions?: string; // IDs de las opciones seleccionadas separados por comas
}
