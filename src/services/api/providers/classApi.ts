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

        getClasses: builder.query< ApiResponseAll<Class>, PaginationQueryParamsType & { packageId?: number, relationCheck?: boolean }>({
            query: ({ page = 1, limit = 1, isActive, packageId, relationCheck }) =>({
              url:`class/findAll?page=${page}&pageSize=${limit}` +
              (isActive !== undefined ? `&isActive=${isActive}` : '') +
              (packageId !== undefined ? `&packageId=${packageId}` : '')+
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
      
      
          editClass: builder.mutation< ApiResponse<Class>, UpdateClass & { id: number } /* Partial<Class> & Pick<Class, 'id'>*/ >({
            query: (body) => ({
              url: `class/update/${body.id}`,
              method: 'PATCH',
              body: { ...body, id: undefined },
            }),
            invalidatesTags: ['Class'],
          }),
        }),

        overrideExisting:'throw'

      });

    

    



export const {useGetClassesQuery, useAddClassMutation, useEditClassMutation} = classApi