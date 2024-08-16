import { Career } from './career';
import { UnitCampus } from './unit-campus';

/**
 * Interface for a student entity 
 * @template T - The data type
 * @param id - The id of said student
 * @param name - The name(s) of the student
 * @param lastName - Father's last name
 * @param motherLastName - Mother's last name
 * @param noControl - Student's associated control number according to TECNM norms, unique and is not a KEY
 * @param semester - Student's associated semester?
 * @param isActive - Defines if the student entity is active in the system or not
 * @param idCareer - Student's associated career
 * @param idUnitCampus - Student's campus, place where he attends
 * @param career - Placeholder for a Career entity object corresponding to the specified id
 * @param unitCampus - Placeholder for a UnitCampus entity object corresponding to the specified id
 * @returns The career entity attributes
 */



export interface Student {
  id?: number;
  name?: string;
  lastName?: string;
  motherLastName?: string;
  noControl?: string;
  semester?: string;
  isActive?: boolean;
  idCareer?: number;
  idUnitCampus?: number;
  career?: Career;
  unitCampus?: UnitCampus;
}


/**
 * Interface for a student entity creation 
 * @template T - The data type
 * @param id - The id of said student
 * @param name - The name(s) of the student
 * @param lastName - Father's last name
 * @param motherLastName - Mother's last name
 * @param noControl - Student's associated control number according to TECNM norms, unique and is not a KEY
 * @param semester - Student's associated semester?
 * @param isActive - Defines if the student entity is active in the system or not
 * @param idCareer - Student's associated career
 * @param idUnitCampus - Student's campus, place where he attends
 * @param career - Placeholder for a Career entity object corresponding to the specified id
 * @param unitCampus - Placeholder for a UnitCampus entity object corresponding to the specified id
 * @returns The career entity attributes
 */

export interface CreateStudent {
  id?: number;
  name?: string;
  lastName?: string;
  motherLastName?: string;
  noControl?: string;
  semester?: string;
  isActive?: boolean;
  idCareer?: number;
  idUnitCampus?: number;
  career?: Career;
  unitCampus?: UnitCampus;
}




/**
 * Interface for creating multiple student entities
 * @param formData- An array containing Aux objects
 * @param semester - Student's associated semester?
 * @param idCareer - Student's associated career
 * @param idUnitCampus - Student's campus, place where he attends
 */

export interface MultiCreateStudent {
  formData: Student[];
  idCareer: number;
  idUnitCampus: number;
  semester: number;
}


/**
 * Interface for updating entity creation 
 * @template T - The data type
 * @param name - The name(s) of the student
 * @param lastName - Father's last name
 * @param motherLastName - Mother's last name
 * @param noControl - Student's associated control number according to TECNM norms, unique and is not a KEY
 * @param semester - Student's associated semester?
 * @param isActive - Defines if the student entity is active in the system or not
 * @param idCareer - Student's associated career
 * @param idUnitCampus - Student's campus, place where he attends
 * @param career - Placeholder for a Career entity object corresponding to the specified id
 * @param unitCampus - Placeholder for a UnitCampus entity object corresponding to the specified id
 * @returns The career entity attributes
 */


export interface EditStudent {
  name?: string;
  lastName?: string;
  motherLastName?: string;
  noControl?: string;
  semester?: string;
  isActive?: boolean;
  idCareer?: number;
  idUnitCampus?: number;
  career?: Career;
  unitCampus?: UnitCampus;
}



