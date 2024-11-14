import { PaginationQueryParamsType, peesadApi } from "../peesadApi";
import { ApiResponseAll } from "../../../interfaces/api-response-all";
import { CreateSubject, Subject, UpdateSubject } from "../../../interfaces/subject";
import { ApiResponse } from "../../../interfaces/api-response";

const subjectApi = peesadApi.injectEndpoints({

    endpoints: (builder) => ({

        getSubjects: builder.query< ApiResponseAll<Subject>,PaginationQueryParamsType & {specialty?: boolean}>({
            query: ({ page = 1, limit = 1, isActive, specialty }) =>({
                url: `subjects/findAll?page=${page}&limit=${limit}` +
                (isActive !== undefined ? `&isActive=${isActive}` : '')+ (specialty !== undefined ? `&specialty=${specialty}` : ''),
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
        getSpecialitySubjects: builder.query< ApiResponseAll<Subject>,PaginationQueryParamsType & {specialty: boolean}>({
            query: ({ page = 1, limit = 1, isActive, specialty }) =>({
                url: `subjects/findAll?page=${page}&limit=${limit}&specialty=${specialty}` +
                (isActive !== undefined ? `&isActive=${isActive}` : ''),
                method: 'GET',
            }),
            providesTags: (result) => 

                result 
                    ? 
                    [
                        ...result.data.map(({id}) => ({type: 'SpecialtySubject' as const, id})),
                        {type: 'SpecialtySubject', id: 'SPECIALTYLIST'},
                    ]
                    :
                    [{type: 'SpecialtySubject', id: 'SPECIALTYLIST'}]
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
            invalidatesTags: [{ type: 'Subject', id: 'LIST' },{type: 'Subject', id: 'SEARCH'},{ type: 'SpecialtySubject', id: 'SPECIALTYLIST' },],
        }),

        editSubject: builder.mutation<ApiResponse<Subject>, UpdateSubject & {id:number}> ({

            query: (body) => ({
                url: `subjects/update/${body.id}`,
                method: 'PATCH',
                body: {...body, id:undefined},
            }),

            invalidatesTags: (body) => [{ type: 'Subject', id: body?.data?.id }, {type: 'Subject', id: 'SEARCH'},{ type: 'SpecialtySubject', id: 'SPECIALTYLIST' },],
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
        searchSpecialtySubjects: builder.query<ApiResponseAll<Subject>, {keyword?: string, page: number, limit: number}> ({

            query: (body) => ({
                url: `subjects/search-specialty?keyword=${body.keyword}&page=${body.page}&limit=${body.limit}`,
                method: 'GET'
            }),
            providesTags: (result) => 
                result 
                ? 
                [
                    ...result.data.map(({id}) => ({type: 'Subject' as const, id})),
                    {type: 'SpecialtySubject', id: 'SEARCH'},
                ]
                :
                [{type: 'SpecialtySubject', id: 'SEARCH'}] 

        }),
    }),

    overrideExisting: 'throw'

})

export const {useGetSubjectsQuery, useGetSubjectQuery, useAddSubjectMutation, useEditSubjectMutation, useSearchSubjectsQuery, useGetSpecialitySubjectsQuery, useSearchSpecialtySubjectsQuery} = subjectApi