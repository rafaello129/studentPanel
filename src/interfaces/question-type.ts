// src/interfaces/question-type.ts

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
  