/**
 * Interface for API response with all data
 * @template T - The data type
 * @param data - The data
 * @param page - The current page
 * @param limit - The limit of data per page
 * @param total - The total data
 * @param status - The status of the response
 * @returns The API response with all data
 */
export interface ApiResponseAll<T> {
  status: boolean;
  data: T[];
  page: number;
  limit: number;
  total: number;
}
