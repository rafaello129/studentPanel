
import { Specialty } from './specialty';

export interface Subject {
  id?: number;
  name?: string;
  clave?: string;
  isActive?: boolean;
  specialty?: Specialty
  
} 

export interface CreateSubject {

  clave: string;
  name: string;
}

export interface UpdateSubject {

  name?: string;
  clave?: string;
  isActive?: boolean;
  specialty?: Specialty

}
