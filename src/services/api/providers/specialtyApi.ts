import { ApiResponse } from "../../../interfaces/api-response";
import { ApiResponseAll } from "../../../interfaces/api-response-all";
import { CreateSpecialty, Specialty, UpdateSpecialty } from "../../../interfaces/specialty";
import { PaginationQueryParamsType, peesadApi } from "../peesadApi";

const specialtyApi = peesadApi.injectEndpoints({

    endpoints: (builder) => ({

        getSpecialties: builder.query< ApiResponseAll<Specialty>, PaginationQueryParamsType>({
            query: ({ page = 1, limit = 1, isActive }) =>({
                url: `specialties/findAll?page=${page}&limit=${limit}` +
                (isActive !== undefined ? `&isActive=${isActive}` : ''),
                method: 'GET',
            }),
            providesTags: (result) => 

                result 
                    ? 
                    [
                        ...result.data.map(({id}) => ({type: 'Specialty' as const, id})),
                        {type: 'Specialty', id: 'LIST'},
                    ]
                    :
                    [{type: 'Specialty', id: 'LIST'}]
        }),

        getSpecialty: builder.query<ApiResponse<Specialty>,{id: number}>({
            query: (body) => ({
                url: `specialties/find/${body.id}`,
                method: 'GET',
            }),

            providesTags: (body) => [{ type: 'Specialty', id: body?.data?.id }]
        }),
        
        addSpecialty: builder.mutation< ApiResponse<Specialty>, CreateSpecialty> ({
            query: (body) => ({
                url: 'specialties/create',
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'Specialty', id: 'LIST' },{type: 'Specialty', id: 'SEARCH'}],
        }),

        editSpecialty: builder.mutation<ApiResponse<Specialty>, UpdateSpecialty & {id:number}> ({

            query: (body) => ({
                url: `specialties/update/${body.id}`,
                method: 'PATCH',
                body: {...body, id:undefined},
            }),

            invalidatesTags: (body) => [{ type: 'Specialty', id: body?.data?.id }, {type: 'Specialty', id: 'SEARCH'}],
        }),

        searchSpecialty: builder.query<ApiResponseAll<Specialty>, {keyword?: string, page: number, limit: number}> ({

            query: (body) => ({
                url: `specialties/search?keyword=${body.keyword}&page=${body.page}&limit=${body.limit}`,
                method: 'GET'
            }),
            providesTags: (result) => 
                result 
                ? 
                [
                    ...result.data.map(({id}) => ({type: 'Subject' as const, id})),
                    {type: 'Specialty', id: 'SEARCH'},
                ]
                :
                [{type: 'Specialty', id: 'SEARCH'}] 

        }),

        assignSubjectToSpecialty: builder.mutation<ApiResponse<Specialty>,  {subjectId:number, specialtyId:number}> ({

            query: (body) => ({
                url: `specialties/assign-subject`,
                method: 'POST',
                body: {...body},
            }),

            invalidatesTags: (body) => [{ type: 'Specialty', id: body?.data?.id }, {type: 'Specialty', id: 'LIST'}],
        }),
    }),

    overrideExisting: 'throw'

})

export const {useGetSpecialtiesQuery, useGetSpecialtyQuery, useAddSpecialtyMutation, useEditSpecialtyMutation, useSearchSpecialtyQuery, useAssignSubjectToSpecialtyMutation} = specialtyApi;