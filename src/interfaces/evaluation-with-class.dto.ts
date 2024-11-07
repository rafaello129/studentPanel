// src/interfaces/evaluation/evaluation-with-class.dto.ts

import { Evaluation } from './evaluation'; // Asegúrate de que la ruta sea correcta
import { Class, ClassWithDetails } from './class'; // Asegúrate de que la ruta sea correcta

export interface EvaluationWithClassDto {
  evaluation: Evaluation;
  class: ClassWithDetails;
}
