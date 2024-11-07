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
