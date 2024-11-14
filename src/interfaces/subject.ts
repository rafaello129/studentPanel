
import { Specialty } from './specialty';

export interface Subject {
  id?: number;
  name?: string;
  clave?: string;
  isActive?: boolean;
  specialty?: boolean
  
} 

export interface CreateSubject {

  clave: string;
  name: string;
  specialty?: boolean;
}

export interface UpdateSubject {

  name?: string;
  clave?: string;
  isActive?: boolean;
  specialty?: boolean

}
