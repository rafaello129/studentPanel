import { PaginationQueryParamsType, peesadApi } from "../peesadApi";
import { ApiResponseAll } from "../../../interfaces/api-response-all";
import { ApiResponse } from "../../../interfaces/api-response";
import { Class, CreateClass, UpdateClass } from "../../../interfaces/class";

export interface ClassQueryParams {
  page: number; // Número de página
  limit: number; // Número de resultados por página
  teacherId?: number; // ID del profesor (opcional)
  isDeleted?: boolean; // Indica si está eliminado (opcional)
  isCurrent?: boolean; // Indica si es actual (opcional)
  packageId?: number; // ID del paquete (opcional)
  subjectId?: string | undefined; // ID de la materia (opcional)
  semester?: string;
  idCareer?: string;
  relationCheck?: boolean;
}

const classApi = peesadApi.injectEndpoints({
  endpoints: (builder) => ({
    getClasses: builder.query<ApiResponseAll<Class>, PaginationQueryParamsType & { packageId?: number, relationCheck?: boolean }>({
      query: ({ page = 1, limit = 1, isActive, packageId, relationCheck }) => ({
        url: `class/findAll?page=${page}&pageSize=${limit}` +
          (isActive !== undefined ? `&isCurrent=${isActive}` : '') +
          (packageId !== undefined ? `&packageId=${packageId}` : '') +
          (relationCheck !== undefined ? `&relationCheck=${relationCheck}` : ''),
        method: 'GET',
      }),
      providesTags: ['Class'],
    }),

    addClass: builder.mutation<ApiResponse<Class>, CreateClass>({
      query: (body) => ({
        url: 'class/create',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Class'],
    }),

    editClass: builder.mutation<ApiResponse<Class>, UpdateClass & { id: number }>({
      query: (body) => ({
        url: `class/update/${body.id}`,
        method: 'PATCH',
        body: { ...body, id: undefined },
      }),
      invalidatesTags: ['Class'],
    }),

    downloadTemplate: builder.query<string, void>({
      query: () => ({
        url: 'class/download-template',
        method: 'GET',
        responseHandler: (response) => response.blob().then(blob => URL.createObjectURL(blob))
        
      }),
    }),

    uploadClassExcel: builder.mutation<ApiResponse<any>, FormData>({
      query: (body) => ({
        url: 'class/upload-excel',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Class'],
    }),

    downloadTemplateAssignStudent: builder.query<Blob, void>({
      query: () => ({
        url: 'class/download-assign-student-template',
        method: 'GET',
        responseHandler: (response) => response.blob(),
      }),
    }),

    uploadStudentExcel: builder.mutation<ApiResponse<any>, FormData>({
      query: (body) => ({
        url: 'class/upload-assign-student-excel',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Class'],
    }),

  }),
  overrideExisting: 'throw',
});

export const {
  useGetClassesQuery,
  useAddClassMutation,
  useEditClassMutation,
  useDownloadTemplateQuery,
  useUploadClassExcelMutation,
  useDownloadTemplateAssignStudentQuery,
  useUploadStudentExcelMutation
} = classApi;

