import { PaginationQueryParamsType, peesadApi } from "../peesadApi";
import { ApiResponseAll } from "../../../interfaces/api-response-all";
import { ApiResponse } from "../../../interfaces/api-response";
import { Career, CreateCareer, EditCareer } from "../../../interfaces/career";


const careerApi = peesadApi.injectEndpoints({

    endpoints: (builder) => ({

        getCareers: builder.query< ApiResponseAll<Career>, PaginationQueryParamsType >({

            query: ({ page = 1, limit = 1, isActive }) => ({
                url: `career/findAll?page=${page}&limit=${limit}` + (isActive !== undefined ? `&isActive=${isActive}` : ''),
                method: 'GET'
            }),

            providesTags: (result) => 

                result 
                    ? 
                    [
                        ...result.data.map(({id}) => ({type: 'Career' as const, id})),
                        {type: 'Career', id: 'LIST'},
                    ]
                    :
                    [{type: 'Career', id: 'LIST'}] 
        }),

        getCareer: builder.query<ApiResponse<Career>, {id: number}>({

            query: (body) => ({
                url: `career/find/${body.id}`,
                method: 'GET',
            }),

            providesTags: (body) => [{ type: 'Career', id: body?.data?.id }]
        })

        ,

        addCareer: builder.mutation<ApiResponse<Career>, CreateCareer>({

            query: (body) => ({
                url: 'career/create',
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'Career', id: 'LIST' },{type: 'Career', id: 'SEARCH'}],
        }),

        editCareer: builder.mutation<ApiResponse<Career>, EditCareer & {id: number}>({

            query: (body) => ({
                url: `career/update/${body.id}`,
                method: 'PATCH',
                body: {...body, id:undefined},
            }),

            invalidatesTags: (body) => [{ type: 'Career', id: body?.data?.id }, {type: 'Career', id: 'SEARCH'}],
        }),

        searchCareers: builder.query<ApiResponseAll<Career>, {keyword?: string, page: number, limit: number}>({
            
            query: (body) => ({
                url: `career/search?keyword=${body.keyword}&page=${body.page}&limit=${body.limit}`,
                method: 'GET'
            }),
            providesTags: (result) => 
                result 
                ? 
                [
                    ...result.data.map(({id}) => ({type: 'Career' as const, id})),
                    {type: 'Career', id: 'SEARCH'},
                ]
                :
                [{type: 'Career', id: 'SEARCH'}] 
        })
    }),
    overrideExisting:'throw'
})

export const {useGetCareersQuery, useGetCareerQuery, useAddCareerMutation, useEditCareerMutation, useSearchCareersQuery} = careerApi