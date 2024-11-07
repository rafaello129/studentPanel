// src/interfaces/answer-option/answer-option.ts

export interface AnswerOption {
  id: number;
  text: string;
  score: number;
  order: number;
  // Puedes agregar más campos si es necesario
}

export interface CreateAnswerOptionDto {
  text: string;
  score: number;
  order?: number;
  questionId: number;
}

export interface UpdateAnswerOptionDto {
  text?: string;
  score?: number;
  order?: number;
  questionId?: number;
}

export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data?: T;
}

export interface ApiResponseAll<T> {
  status: boolean;
  message: string;
  data?: T[];
}
