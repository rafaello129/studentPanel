// src/interfaces/question-type.ts

import { AnswerOption } from "./answer-option";

export interface QuestionType {
    id: number;
    name: string; // Ejemplo: 'MULTIPLE_CHOICE', 'OPEN_ENDED'
  }
  export enum QuestionTypeEnum {
    SINGLE_CHOICE = 'MULTIPLE_CHOICE',
    MULTIPLE_CHOICE = 'MULTIPLE_SELECT',
    OPEN_ENDED = 'OPEN_ENDED',
    // Agrega otros tipos si es necesario
  }
  export interface Question {
    id: number;
    text: string;
    order: number;
    questionType: QuestionType;
    allowMultipleAnswers: boolean;
    answerOptions?: AnswerOption[];
    sectionId?: number; // Si necesitas referencia a la sección
    // Añade otros campos si es necesario
  }
  