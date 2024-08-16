import { Plan } from "./plan";
import { Subject } from "./subject";


export interface Specialty {
    id: number;

    name: string;

    isCurrent: boolean;

    isDeleted: boolean;

    plan: Plan;

    subjects: Subject[]

}

export interface CreateSpecialty {
    
    name: string;
    plan_Id?: number;

  }
  
  export interface UpdateSpecialty {
    
    name?:string;
    plan_id?:number;
    isCurrent?: boolean;
    isDeleted?: boolean;
  }
  