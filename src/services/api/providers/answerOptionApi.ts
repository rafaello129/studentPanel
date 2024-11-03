// src/services/api/answerOptionApi.ts

import { AnswerOption, CreateAnswerOptionDto, UpdateAnswerOptionDto } from "../../../interfaces/answer-option";
import { ApiResponse } from "../../../interfaces/api-response";
import { ApiResponseAll } from "../../../interfaces/api-response-all";
import { peesadApi } from "../peesadApi";


const answerOptionApi = peesadApi.injectEndpoints({
  endpoints: (builder) => ({
    // Crear una nueva opción de respuesta
    createAnswerOption: builder.mutation<ApiResponse<AnswerOption>, CreateAnswerOptionDto>({
      query: (body) => ({
        url: 'answer-options/create',
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error, { questionId }) => [{ type: 'AnswerOption', id: questionId }],
    }),

    // Obtener una opción de respuesta por ID
    getAnswerOptionById: builder.query<ApiResponse<AnswerOption>, number>({
      query: (id) => ({
        url: `answer-options/find/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'AnswerOption', id }],
    }),

    // Actualizar una opción de respuesta
    updateAnswerOption: builder.mutation<ApiResponse<AnswerOption>, { id: number; data: UpdateAnswerOptionDto }>({
      query: ({ id, data }) => ({
        url: `answer-options/update/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'AnswerOption', id }],
    }),

    // Eliminar una opción de respuesta
    deleteAnswerOption: builder.mutation<ApiResponse<AnswerOption>, number>({
      query: (id) => ({
        url: `answer-options/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'AnswerOption', id }],
    }),

    // Obtener todas las opciones de respuesta de una pregunta
    getAnswerOptionsByQuestion: builder.query<ApiResponseAll<AnswerOption>, number>({
      query: (questionId) => ({
        url: `answer-options/question/${questionId}`,
        method: 'GET',
      }),
      providesTags: (result, error, questionId) =>
        result?.data.map(({ id }) => ({ type: 'AnswerOption' as const, id })) || [{ type: 'AnswerOption', id: questionId }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateAnswerOptionMutation,
  useGetAnswerOptionByIdQuery,
  useUpdateAnswerOptionMutation,
  useDeleteAnswerOptionMutation,
  useGetAnswerOptionsByQuestionQuery,
} = answerOptionApi;

export default answerOptionApi;
