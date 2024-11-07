// src/services/api/questionApi.ts

import { ApiResponse } from "../../../interfaces/api-response";
import { ApiResponseAll } from "../../../interfaces/api-response-all";
import { Question, CreateQuestionDto, UpdateQuestionDto, ChangeQuestionSectionDto } from "../../../interfaces/question";
import { peesadApi } from "../peesadApi";


const questionApi = peesadApi.injectEndpoints({
  endpoints: (builder) => ({
    // Crear una nueva pregunta
    createQuestion: builder.mutation<ApiResponse<Question>, CreateQuestionDto>({
      query: (body) => ({
        url: 'questions/create',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Question'],
    }),

    // Obtener una pregunta por ID
    getQuestionById: builder.query<ApiResponse<Question>, number>({
      query: (id) => ({
        url: `questions/find/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'Question', id }],
    }),

    // Actualizar una pregunta
    updateQuestion: builder.mutation<ApiResponse<Question>, { id: number; data: UpdateQuestionDto }>({
      query: ({ id, data }) => ({
        url: `questions/update/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Question', id }],
    }),

    // Eliminar una pregunta
    deleteQuestion: builder.mutation<ApiResponse<Question>, number>({
      query: (id) => ({
        url: `questions/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Question', id }],
    }),

    // Obtener todas las preguntas de una sección
    getQuestionsBySection: builder.query<ApiResponseAll<Question>, number>({
      query: (sectionId) => ({
        url: `questions/section/${sectionId}`,
        method: 'GET',
      }),
      providesTags: (result, error, sectionId) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: 'Question' as const, id })),
              { type: 'Section', id: sectionId },
            ]
          : [{ type: 'Section', id: sectionId }],
    }),

    // Cambiar una pregunta de sección
    changeQuestionSection: builder.mutation<ApiResponse<Question>, { id: number; data: ChangeQuestionSectionDto }>({
      query: ({ id, data }) => ({
        url: `questions/change-section/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Question', id }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateQuestionMutation,
  useGetQuestionByIdQuery,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,
  useGetQuestionsBySectionQuery,
  useChangeQuestionSectionMutation,
} = questionApi;
