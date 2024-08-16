/**
 * Interface for a unit entity 
 * @template T - The data type
 * @param id - The id of said unit
 * @param name - The name of the unit
 * @param location - The location of said unit
 * @param boss - The individual in charge of the unit, it isn't a registered user in the system yet
 * @param isActive - The status of the unit, when false means the unit was disabled
 * @param key - The key that uniquely identifies the career in PEESAD terms
 * @returns The career entity attributes
 */

export interface UnitCampus {
  id: number;
  name?: string;
  location?: string;
  boss?: string;
  isActive?: boolean;
  key?: string;
}

/**
 * Interface for a unit entity creation
 * @param name - The name of the unit
 * @param location - The location of said unit
 * @param boss - The individual in charge of the unit, it isn't a registered user in the system yet
 * @param key - The key that uniquely identifies the career in PEESAD terms
 * @returns The career entity attributes
 */

export interface CreateUnit {
  name: string;
  key: string;
  location: string;
  boss: string;
}



/**
 * Interface for a unit entity update
 * @param name - The name of the unit
 * @param location - The location of said unit
 * @param boss - The individual in charge of the unit, it isn't a registered user in the system yet
 * @param key - The key that uniquely identifies the career in PEESAD terms
 * @param isActive - Its in the interface because it's needed for disabling the entity
 * @returns The career entity attributes
 */

export interface EditUnit {
  name?: string;
  key?: string;
  location?: string;
  boss?: string;
  isActive? : boolean;
}