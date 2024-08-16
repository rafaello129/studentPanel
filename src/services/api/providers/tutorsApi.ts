import { PaginationQueryParamsType, peesadApi } from "../peesadApi";
import { ApiResponseAll } from "../../../interfaces/api-response-all";
import { Tutor } from "../../../interfaces/tutor";

const tutorApi = peesadApi.injectEndpoints({

    endpoints: (builder) => ({

        getTutors: builder.query<ApiResponseAll<Tutor>, PaginationQueryParamsType>({
            query: ({ page = 1, limit = 1, isActive }) => ({
              url:`tutors?page=${page}&limit=${limit}` +
              (isActive !== undefined ? `&isActive=${isActive}` : ''),
              method:'GET',
            }),
            providesTags: ['Tutor'],
          }),

    }),

    overrideExisting: 'throw'

})

export const {useGetTutorsQuery} = tutorApi