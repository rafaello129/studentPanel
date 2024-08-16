import { User } from './auth-response';
import { Class } from './class';

export interface Tutor {
  id: number;
  user: User;
  classes: Class[];
  isActive: boolean;
}
