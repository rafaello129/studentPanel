import { Career } from "./career";

export interface Plan {
    
  id?: number;

  name?: string;

  isCurrent?: boolean;

  isDeleted?: boolean;

  career?: Career;

}

export interface CreatePlan {

  name: string;

  career_id: number;

}

export interface UpdatePlan {

  name?: string;

  career_id?: number;

}