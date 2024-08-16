import { PaginationQueryParamsType, peesadApi } from "../peesadApi";
import { ApiResponseAll } from "../../../interfaces/api-response-all";
import { Teacher } from "../../../interfaces/teacher";

const teacherApi = peesadApi.injectEndpoints({

    endpoints: (builder) => ({

        getTeachers: builder.query< ApiResponseAll<Teacher>, PaginationQueryParamsType >({
            query: ({ page = 1, limit = 1, isActive }) =>({
              url:`teachers?page=${page}&limit=${limit}` +
              (isActive !== undefined ? `&isActive=${isActive}` : ''),
              method: 'GET',
            }),
            providesTags: ['Teacher'],
          }),

    }),

    overrideExisting:'throw'

})

export const {useGetTeachersQuery} = teacherApi