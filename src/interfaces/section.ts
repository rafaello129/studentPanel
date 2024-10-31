// src/interfaces/section.ts

import { Question } from './question';

export interface Section {
  id: number;
  title: string;
  description?: string;
  order: number;
  questions: Question[];
}
