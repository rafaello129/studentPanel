// src/interfaces/create-user-response.dto.ts

export interface CreateUserResponseDto {
    evaluationId: number;
    questionId: number;
    classId: number; // Nueva propiedad añadida
    openEndedResponse?: string;
    selectedOptionId?: number;
    selectedOptions?: string; // IDs separados por comas
  }
  