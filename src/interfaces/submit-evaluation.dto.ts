// src/interfaces/submit-evaluation.dto.ts

export interface AnswerDto {
    questionId: number;
    selectedOptionId?: number;
    selectedOptionIds?: number[];
    openEndedResponse?: string;
  }
  
  export interface SubmitEvaluationDto {
    evaluationId: number;
    classId: number; // Nueva propiedad añadida
    answers: AnswerDto[];
  }
  