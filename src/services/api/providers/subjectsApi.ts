import { PaginationQueryParamsType, peesadApi } from "../peesadApi";
import { ApiResponseAll } from "../../../interfaces/api-response-all";
import { CreateSubject, Subject, UpdateSubject } from "../../../interfaces/subject";
import { ApiResponse } from "../../../interfaces/api-response";

const subjectApi = peesadApi.injectEndpoints({

    endpoints: (builder) => ({

        getSubjects: builder.query< ApiResponseAll<Subject>,PaginationQueryParamsType>({
            query: ({ page = 1, limit = 1, isActive }) =>({
                url: `subjects/findAll?page=${page}&limit=${limit}` +
                (isActive !== undefined ? `&isActive=${isActive}` : ''),
                method: 'GET',
            }),
            providesTags: (result) => 

                result 
                    ? 
                    [
                        ...result.data.map(({id}) => ({type: 'Subject' as const, id})),
                        {type: 'Subject', id: 'LIST'},
                    ]
                    :
                    [{type: 'Subject', id: 'LIST'}]
        }),

        getSubject: builder.query<ApiResponse<Subject>,{id: number}>({
            query: (body) => ({
                url: `subjects/find/${body.id}`,
                method: 'GET',
            }),

            providesTags: (body) => [{ type: 'Subject', id: body?.data?.id }]
        }),
        
        addSubject: builder.mutation< ApiResponse<Subject>, CreateSubject> ({
            query: (body) => ({
                url: 'subjects/create',
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'Subject', id: 'LIST' },{type: 'Subject', id: 'SEARCH'}],
        }),

        editSubject: builder.mutation<ApiResponse<Subject>, UpdateSubject & {id:number}> ({

            query: (body) => ({
                url: `subjects/update/${body.id}`,
                method: 'PATCH',
                body: {...body, id:undefined},
            }),

            invalidatesTags: (body) => [{ type: 'Subject', id: body?.data?.id }, {type: 'Subject', id: 'SEARCH'}],
        }),

        searchSubjects: builder.query<ApiResponseAll<Subject>, {keyword?: string, page: number, limit: number}> ({

            query: (body) => ({
                url: `subjects/search?keyword=${body.keyword}&page=${body.page}&limit=${body.limit}`,
                method: 'GET'
            }),
            providesTags: (result) => 
                result 
                ? 
                [
                    ...result.data.map(({id}) => ({type: 'Subject' as const, id})),
                    {type: 'Subject', id: 'SEARCH'},
                ]
                :
                [{type: 'Subject', id: 'SEARCH'}] 

        }),
    }),

    overrideExisting: 'throw'

})

export const {useGetSubjectsQuery, useGetSubjectQuery, useAddSubjectMutation, useEditSubjectMutation, useSearchSubjectsQuery} = subjectApi