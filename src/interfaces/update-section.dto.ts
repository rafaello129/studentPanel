// src/dto/section/update-section.dto.ts

export interface UpdateSectionDto {
    title?: string;
    description?: string;
    order?: number;
    // No incluimos 'questions' ni 'evaluationId' ya que no se pueden actualizar aquí
  }
  