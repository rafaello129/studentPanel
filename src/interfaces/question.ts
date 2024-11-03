import { QuestionTypeEnum } from "../dashboard/components/question/CreateQuestionComponent";
import { AnswerOption } from "./answer-option";
import { QuestionType } from "./question-type";




/**
 * Interface para una pregunta completa.
 */
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

/**
 * DTO para crear una pregunta.
 */
export interface CreateQuestionDto {
  text: string;
  questionType: QuestionTypeEnum;
  allowMultipleAnswers?: boolean;
  order?: number;
  answerOptions?: AnswerOption[];
  sectionId: number; // ID de la sección a la que pertenece la pregunta
}

/**
 * DTO para actualizar una pregunta.
 */
export interface UpdateQuestionDto {
  text?: string;
  questionType?: QuestionTypeEnum;
  allowMultipleAnswers?: boolean;
  order?: number;
  answerOptions?: AnswerOption[];
  // No incluimos sectionId aquí ya que el cambio de sección se maneja en otro endpoint
}

/**
 * DTO para cambiar la sección de una pregunta.
 */
export interface ChangeQuestionSectionDto {
  sectionId: number; // ID de la nueva sección
}

/**
 * Interface para la respuesta estándar de una entidad.
 */
export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data?: T;
}

/**
 * Interface para la respuesta estándar de múltiples entidades.
 */
export interface ApiResponseAll<T> {
  status: boolean;
  message: string;
  data: T[];
}