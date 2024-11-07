import { ApiResponse } from "../../../interfaces/api-response";
import { ApiResponseAll } from "../../../interfaces/api-response-all";
import { CreateSectionDto } from "../../../interfaces/create-section.dto";
import { Section } from "../../../interfaces/section";
import { UpdateSectionDto } from "../../../interfaces/update-section.dto";
import { peesadApi } from "../peesadApi";

const sectionApi = peesadApi.injectEndpoints({
    endpoints: (builder) => ({
      // Crear una nueva sección
      createSection: builder.mutation<ApiResponse<Section>, CreateSectionDto>({
        query: (body) => ({
          url: 'sections/create',
          method: 'POST',
          body,
        }),
        invalidatesTags: ['Section'],
      }),
  
      // Obtener una sección por ID
      getSectionById: builder.query<ApiResponse<Section>, number>({
        query: (id) => ({
          url: `sections/find/${id}`,
          method: 'GET',
        }),
        providesTags: (result, error, id) => [{ type: 'Section', id }],
      }),
  
      // Actualizar una sección
      updateSection: builder.mutation<ApiResponse<Section>, { id: number; data: UpdateSectionDto }>({
        query: ({ id, data }) => ({
          url: `sections/update/${id}`,
          method: 'PATCH',
          body: data,
        }),
        invalidatesTags: (result, error, { id }) => [{ type: 'Section', id }],
      }),
  
      // Eliminar una sección
      deleteSection: builder.mutation<ApiResponse<Section>, number>({
        query: (id) => ({
          url: `sections/delete/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: (result, error, id) => [{ type: 'Section', id }],
      }),
  
      // Obtener todas las secciones de una evaluación
      getSectionsByEvaluation: builder.query<ApiResponseAll<Section>, number>({
        query: (evaluationId) => ({
          url: `sections/evaluation/${evaluationId}`,
          method: 'GET',
        }),
        providesTags: (result, error, evaluationId) =>
          result
            ? [
                ...result.data.map(({ id }) => ({ type: 'Section' as const, id })),
                { type: 'Evaluation', id: evaluationId },
              ]
            : [{ type: 'Evaluation', id: evaluationId }],
      }),
    }),
    overrideExisting: false,
  });
  export const {
    useCreateSectionMutation,
    useGetSectionByIdQuery,
    useUpdateSectionMutation,
    useDeleteSectionMutation,
    useGetSectionsByEvaluationQuery,
  } = sectionApi;