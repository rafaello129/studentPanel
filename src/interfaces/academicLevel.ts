// src/interfaces/academicLevel.ts

/**
 * Interface for AcademicLevel entity.
 */
export interface AcademicLevel {
    id: number;
    name: string;
    // Si necesitas incluir las evaluaciones relacionadas, puedes añadir:
    // evaluations: Evaluation[];
  }
  
  /**
   * Interface for creating a new AcademicLevel.
   */
  export interface CreateAcademicLevel {
    name: string;
  }
  
  /**
   * Interface for updating an existing AcademicLevel.
   */
  export interface UpdateAcademicLevel {
    id: number;
    name?: string;
  }
  