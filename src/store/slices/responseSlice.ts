// src/store/slices/responseSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AnswerState {
  [questionId: number]: any;
}

interface ResponseState {
  evaluationId: number | null;
  answers: AnswerState;
}

const initialState: ResponseState = {
  evaluationId: null,
  answers: {},
};

const responseSlice = createSlice({
  name: 'responses',
  initialState,
  reducers: {
    setEvaluationId(state, action: PayloadAction<number>) {
      state.evaluationId = action.payload;
      state.answers = {};
    },
    setAnswer(
      state,
      action: PayloadAction<{ questionId: number; answer: any }>
    ) {
      const { questionId, answer } = action.payload;
      state.answers[questionId] = answer;
    },
    resetResponses(state) {
      state.evaluationId = null;
      state.answers = {};
    },
  },
});

export const { setEvaluationId, setAnswer, resetResponses } = responseSlice.actions;
export default responseSlice.reducer;
