import { Plan } from "./plan";
import { Subject } from "./subject";


export interface Specialty {
    id: number;

    name: string;

    key: string;

    isCurrent: boolean;

    isDeleted: boolean;

    plan: Plan;

    subjects: Subject[]

}

export interface CreateSpecialty {
    
    name: string;
    key: string;
    

  }
  
  export interface UpdateSpecialty {
    
    name?:string;
    planId?:number;
    key?: string;
    isCurrent?: boolean;
    isDeleted?: boolean;
  }
  