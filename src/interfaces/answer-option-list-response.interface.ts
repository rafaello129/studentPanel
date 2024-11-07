// src/interfaces/answer-option/answer-option-list-response.interface.ts

import { AnswerOption } from './answer-option';
import { ApiResponseAll } from './api-response-all';

export interface AnswerOptionListResponse extends ApiResponseAll<AnswerOption> {}
