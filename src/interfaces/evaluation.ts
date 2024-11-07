// src/interfaces/evaluation.ts

import { AcademicLevel } from './academic-level';
import { Section } from './section';
import { User } from './user';
import {Class} from  './class';

/**
 * Interface for Evaluation entity.
 */
export interface Evaluation {
  id: number;
  title: string;
  description?: string;
  isTemplate: boolean;
  scheduledDate?: string; // Utilizamos string para facilitar el manejo en frontend
  isActive: boolean;
  academicLevel: AcademicLevel;
  sections: Section[];
  template?: Evaluation;
  assignedUsers: User[];
  classes: Class[]; // Añadimos el campo classes
}

/**
 * Interface for creating a new Evaluation.
 */
export interface CreateEvaluation {
  title: string;
  description?: string;
  isTemplate?: boolean;
  scheduledDate?: string;
  isActive?: boolean;
  academicLevelId: number;
  // Otros campos según tu definición
}

/**
 * Interface for updating an existing Evaluation.
 */
export interface UpdateEvaluation {
  id: number;
  title?: string;
  description?: string;
  isTemplate?: boolean;
  scheduledDate?: string;
  isActive?: boolean;
  academicLevelId?: number;
  // Otros campos según tu definición
}

/**
 * Interface for cloning an Evaluation.
 */
export interface CloneEvaluation {
  templateId: number;
  scheduledDate: string;
  classIds?: number[];
}
/**
 * Interface for assigning users to an Evaluation.
 */
export interface AssignUsers {
  userIds: number[];
}

/**
 * Interface for submitting Evaluation responses.
 * (Asegúrate de ajustarla según tu lógica de negocio)
 */
export interface SubmitEvaluation {
  evaluationId: number;
  answers: Answer[];
}

/**
 * Interface for an individual answer in SubmitEvaluation.
 */
export interface Answer {
  questionId: number;
  selectedOptionId?: number;
  selectedOptionIds?: number[];
  openEndedResponse?: string;
}
