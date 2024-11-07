// src/services/api/academicLevelApi.ts

import { peesadApi } from '../peesadApi';
import {
  AcademicLevel,
  CreateAcademicLevel,
  UpdateAcademicLevel,
} from '../../../interfaces/academicLevel';

import { ApiResponseAll } from "../../../interfaces/api-response-all";
import { ApiResponse } from "../../../interfaces/api-response";
const academicLevelApi = peesadApi.injectEndpoints({
  endpoints: (builder) => ({
    // Obtener todos los niveles académicos sin paginación
    getAllAcademicLevels: builder.query<ApiResponse<AcademicLevel[]>, void>({
      query: () => ({
        url: 'academic-level/all',
        method: 'GET',
      }),
      providesTags: ['AcademicLevel'],
    }),

    // Obtener niveles académicos paginados
    getPaginatedAcademicLevels: builder.query<
      ApiResponseAll<AcademicLevel>,
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 10 }) => ({
        url: `academic-level/paginated?page=${page}&limit=${limit}`,
        method: 'GET',
      }),
      providesTags: ['AcademicLevel'],
    }),

    // Obtener un nivel académico por ID
    getAcademicLevelById: builder.query<ApiResponse<AcademicLevel>, number>({
      query: (id) => ({
        url: `academic-level/find/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'AcademicLevel', id }],
    }),

    // Crear un nuevo nivel académico
    createAcademicLevel: builder.mutation<ApiResponse<AcademicLevel>, CreateAcademicLevel>({
      query: (body) => ({
        url: 'academic-level/create',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['AcademicLevel'],
    }),

    // Actualizar un nivel académico existente
    updateAcademicLevel: builder.mutation<ApiResponse<AcademicLevel>, UpdateAcademicLevel>({
      query: ({ id, ...patch }) => ({
        url: `academic-level/update/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'AcademicLevel', id }],
    }),

    // Eliminar un nivel académico
    deleteAcademicLevel: builder.mutation<ApiResponse<AcademicLevel>, number>({
      query: (id) => ({
        url: `academic-level/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['AcademicLevel'],
    }),
  }),
  overrideExisting: false,
});

// Exporta los hooks generados automáticamente
export const {
  useGetAllAcademicLevelsQuery,
  useGetPaginatedAcademicLevelsQuery,
  useGetAcademicLevelByIdQuery,
  useCreateAcademicLevelMutation,
  useUpdateAcademicLevelMutation,
  useDeleteAcademicLevelMutation,
} = academicLevelApi;
