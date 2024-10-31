// src/services/api/evaluationApi.ts

import { peesadApi } from "../peesadApi";
import {
  Evaluation,
  CreateEvaluation,
  UpdateEvaluation,
  CloneEvaluation,
  AssignUsers,
  SubmitEvaluation,
} from "../../../interfaces/evaluation";
import { ApiResponseAll } from "../../../interfaces/api-response-all";
import { ApiResponse } from "../../../interfaces/api-response";

// Define los endpoints para Evaluation
const evaluationApi = peesadApi.injectEndpoints({
  endpoints: (builder) => ({
    // Obtener todas las evaluaciones con parámetros de paginación y filtros
    getEvaluations: builder.query<ApiResponseAll<Evaluation>, {
      page?: number;
      limit?: number;
      isActive?: boolean;
      packageId?: number;
      relationCheck?: boolean;
    }>({
      query: ({ page = 1, limit = 10, isActive, packageId, relationCheck }) => ({
        url: `evaluation/paginated?page=${page}&limit=${limit}` +
             (isActive !== undefined ? `&isActive=${isActive}` : '') +
             (packageId !== undefined ? `&packageId=${packageId}` : '') +
             (relationCheck !== undefined ? `&relationCheck=${relationCheck}` : ''),
        method: 'GET',
      }),
      providesTags: ['Evaluation'],
    }),

    // Obtener una evaluación por ID
    getEvaluation: builder.query<ApiResponse<Evaluation>, number>({
      query: (id) => ({
        url: `evaluation/find/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'Evaluation', id }],
    }),

    // Crear una nueva evaluación
    createEvaluation: builder.mutation<ApiResponse<Evaluation>, CreateEvaluation>({
      query: (body) => ({
        url: 'evaluation/create',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Evaluation'],
    }),

    // Actualizar una evaluación existente
    updateEvaluation: builder.mutation<ApiResponse<Evaluation>, UpdateEvaluation>({
      query: ({ id, ...patch }) => ({
        url: `evaluation/update/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Evaluation', id }],
    }),

    // Eliminar una evaluación
    deleteEvaluation: builder.mutation<ApiResponse<{ success: boolean }>, number>({
      query: (id) => ({
        url: `evaluation/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Evaluation', id }],
    }),

    // Clonar una evaluación plantilla
    cloneEvaluation: builder.mutation<ApiResponse<Evaluation>, CloneEvaluation>({
      query: (body) => ({
        url: 'evaluation/clone',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Evaluation'],
    }),

    // Asignar usuarios a una evaluación
    assignUsers: builder.mutation<ApiResponse<Evaluation>, { id: number; assignUsersDto: AssignUsers }>({
      query: ({ id, assignUsersDto }) => ({
        url: `evaluation/assign-users/${id}`,
        method: 'PATCH',
        body: assignUsersDto,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Evaluation', id }],
    }),

    // Enviar respuestas a una evaluación
    submitEvaluation: builder.mutation<ApiResponse<{ success: boolean }>, SubmitEvaluation>({
      query: (body) => ({
        url: 'evaluation/submit',
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error, body) => [{ type: 'Evaluation', id: body.evaluationId }],
    }),
  }),
  overrideExisting: 'throw',
});

// Exporta los hooks generados automáticamente
export const {
  useGetEvaluationsQuery,
  useGetEvaluationQuery,
  useCreateEvaluationMutation,
  useUpdateEvaluationMutation,
  useDeleteEvaluationMutation,
  useCloneEvaluationMutation,
  useAssignUsersMutation,
  useSubmitEvaluationMutation,
} = evaluationApi;
