import { Evaluation } from './evaluation';
import { Package } from './package';
import { Partial } from './partial';
import { Student } from './student';
import { Subject } from './subject';
import { Teacher } from './teacher';
import { Tutor } from './tutor';

export interface Class {
  subperiod?: any;
  id: number;
  isCurrent: boolean;
  isDeleted: boolean;
  
  teacher: Teacher;
  tutor: Tutor;
  subject: Subject;
  package: Package;
  partial: Partial[];
  students: Student[];
  semester?: number;
  subjectName?: string; // Nombre de la asignatura que representa el nombre de la clase

}
export interface ClassWithDetails {
  id: number;
  subjectName: string; // Nombre de la asignatura que representa el nombre de la clase
  subject: Subject;
  teacher: Teacher;
  // Añade otras propiedades de la clase si es necesario
}

export interface EvaluationWithClassDto {
  evaluation: Evaluation;
  class: ClassWithDetails;
}
export interface CreateClass {
  package_id: number;
  subject_id: number;
  teacher_id: number;
  tutor_id?: number;
  subperiodId?: number;
}

export interface UpdateClass {
  packageId?: number;
  subjectId?: number;
  teacherId?: number;
  tutorId?: number;
  isCurrent?: boolean;
  isDeleted?: boolean;
  subperiodId?: number;

}
