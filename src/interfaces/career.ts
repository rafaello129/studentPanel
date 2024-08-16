/**
 * Interface for a career entity 
 * @template T - The data type
 * @param id - The id of said career
 * @param name - The name of the career
 * @param isActive - The status of the career, when false means the career was disabled
 * @param key - The key that uniquely identifies the career in TECNM terms
 * @param semester - The amount of semesters that said career has
 * @returns The career entity attributes
 */


export interface Career {
    id: number;
    name?: string;
    isActive?: boolean;
    key?: string;
    semester?: string;
}

export interface CreateCareer {
    name: string;
    semester: string;
    key: string;
  }

export interface EditCareer{
    name?: string;
    semester?: string;
    key?: string;
    isActive?: boolean;
}
  