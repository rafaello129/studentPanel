import { ApiResponse } from "../../../interfaces/api-response"
import { ApiResponseAll } from "../../../interfaces/api-response-all"
import { CreatePlan, Plan, UpdatePlan } from "../../../interfaces/plan"
import { PaginationQueryParamsType, peesadApi } from "../peesadApi"


const planApi = peesadApi.injectEndpoints({

    endpoints: (builder) => ({

        getPlans: builder.query< ApiResponseAll<Plan>,PaginationQueryParamsType & {career_id?: number}>({
            query: ({ page = 1, limit = 1, isActive, career_id }) =>({
                url: `plans/findAll?page=${page}&limit=${limit}` +
                (isActive !== undefined ? `&is_current=${isActive}` : '') + ( career_id !== undefined ? `&career_id=${career_id}`: '' ),
                method: 'GET',
            }),
            providesTags: (result) => 

                result 
                    ? 
                    [
                        ...result.data.map(({id}) => ({type: 'Plan' as const, id})),
                        {type: 'Plan', id: 'LIST'},
                    ]
                    :
                    [{type: 'Plan', id: 'LIST'}],
            
            
        }),

        getPlan: builder.query<ApiResponse<Plan>,{id: number}>({
            query: (body) => ({
                url: `plans/find/${body.id}`,
                method: 'GET',
            }),

            providesTags: (body) => [{ type: 'Plan', id: body?.data?.id }]
        }),
        
        addPlan: builder.mutation< ApiResponse<Plan>, CreatePlan> ({
            query: (body) => ({
                url: 'plans/create',
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'Plan', id: 'LIST' },{type: 'Plan', id: 'SEARCH'}],
        }),

        editPlan: builder.mutation<ApiResponse<Plan>, UpdatePlan & {id:number}> ({

            query: (body) => ({
                url: `plans/update/${body.id}`,
                method: 'PATCH',
                body: {...body, id:undefined},
            }),

            invalidatesTags: (body) => [{ type: 'Plan', id: body?.data?.id }, {type: 'Plan', id: 'SEARCH'}],
        }),

        searchPlans: builder.query<ApiResponseAll<Plan>, {keyword?: string, page: number, limit: number, career_id?:number}> ({

            query: (body) => ({
                url: `plans/search?keyword=${body.keyword}&page=${body.page}&limit=${body.limit}` + (body.career_id !== undefined ? `&career_id=${body.career_id}`: ''),
                method: 'GET'
            }),
            providesTags: (result) => 
                result 
                ? 
                [
                    ...result.data.map(({id}) => ({type: 'Subject' as const, id})),
                    {type: 'Plan', id: 'SEARCH'},
                ]
                :
                [{type: 'Plan', id: 'SEARCH'}] 

        }),

        searchPlansByCareer: builder.query<ApiResponseAll<Plan>,PaginationQueryParamsType & {career_id?: number}> ({

            query: ({ page = 1, limit = 1, isActive, career_id }) =>({
                url: `plans/findAll?page=${page}&limit=${limit}` +
                (isActive !== undefined ? `&is_current=${isActive}` : '') + ( career_id !== undefined ? `&career_id=${career_id}`: '' ),
                method: 'GET',
            }),
            providesTags: (result) => 

                result 
                    ? 
                    [
                        ...result.data.map(({id}) => ({type: 'Plan' as const, id})),
                        {type: 'Plan', id: 'LIST'},
                    ]
                    :
                    [{type: 'Plan', id: 'LIST'}],
            
            
        }),

    }),

    overrideExisting: 'throw'

})

export const {useGetPlanQuery, useGetPlansQuery, useAddPlanMutation, useEditPlanMutation, useSearchPlansQuery, useSearchPlansByCareerQuery} = planApi