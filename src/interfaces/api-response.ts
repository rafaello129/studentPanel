/**
 * Interface for API response
 * @template T - The data type
 * @param data - The data
 * @param message - The message
 * @param status - The status of the response
 * @returns The API response
 */
export interface ApiResponse<T> {
  data?: T;
  message: string;
  status: boolean;
}
