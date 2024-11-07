// src/dto/section/create-section.dto.ts


export interface CreateSectionDto {
  title: string;
  description?: string;
  order?: number;
  evaluationId: number;
}
