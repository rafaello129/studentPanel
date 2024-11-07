export class Period {

    id?: number
    name!: string
    key!: string
    startDate!: string
    endDate!: string
    isCurrent?: boolean
    isActive?: boolean
    isInter?: boolean
}




export interface CreatePeriod{
    name: string,
    key:string, 
    startDate: string,
    endDate: string,
    isCurrent?: boolean
  }
  
  
  export interface CreateSubperiod {
    name: string;
    key: string;
    startDate: string; // Utiliza formato ISO8601, como exige el DTO
    endDate: string;
    periodId: number;
  }

  export interface Subperiod {
    id: number;
    name: string;
    isCurrent: boolean;
    startDate: string; // o Date si deseas manejar fechas en objetos Date
    endDate: string;
    periodId: number;
  }
  