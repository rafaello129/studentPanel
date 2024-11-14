import { Career } from "./career";
import { Specialty } from "./specialty";
import { Subject } from "./subject";

export interface Plan {
    
  id?: number;

  name?: string;

  key: string;

  isCurrent?: boolean;

  isDeleted?: boolean;

  career?: Career;

  subjects: Subject[]

  specialties: Specialty[]

}

export interface CreatePlan {

  name: string;

  career_id: number;

}

export interface UpdatePlan {

  name?: string;

  career_id?: number;

}