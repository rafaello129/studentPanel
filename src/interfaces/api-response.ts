/**
 * Interface for API response
 * @template T - The data type
 * @param data - The data
 * @param message - The message
 * @param status - The status of the response
 * @returns The API response
 */
export interface ApiResponse<T> {
  comment: string;
  files: any;
  activity: any;
  startDate: string | number | Date;
  endDate: string | number | Date;
  activities: any;
  data?: T;
  message: string;
  status: boolean;
}
