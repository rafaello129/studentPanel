// src/interfaces/user-response-response.ts
import { UserResponse } from './user-response';

export interface UserResponseResponse {
  status: boolean;
  message: string;
  data?: UserResponse | UserResponse[];
}
