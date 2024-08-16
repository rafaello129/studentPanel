
import { CreateUnit, EditUnit, UnitCampus } from "../../../interfaces/unit-campus";
import { PaginationQueryParamsType, peesadApi } from "../peesadApi";
import { ApiResponseAll } from "../../../interfaces/api-response-all";
import { ApiResponse } from "../../../interfaces/api-response";


const unitApi = peesadApi.injectEndpoints({

    endpoints: (builder) => ({

        getUnits: builder.query< ApiResponseAll<UnitCampus>, PaginationQueryParamsType>({
                query: ({ page = 1, limit = 1, isActive }) =>({
                url:`unit-campus/findAll?page=${page}&limit=${limit}` +
                (isActive !== undefined ? `&isActive=${isActive}` : ''),
                method: 'GET',
        }),
        
        providesTags: (result) => 
            result 
                ? 
                [
                    ...result.data.map(({id}) => ({type: 'UnitCampus' as const, id})),
                    {type: 'UnitCampus', id: 'LIST'},
                ]
                :
                [{type: 'UnitCampus', id: 'LIST'}]
        }),

        getUnit: builder.query< ApiResponse<UnitCampus> , {id:number} >({
            query: (body) => ({
                url: `unit-campus/find/${body.id}`,
                method: 'GET',
            }),

            providesTags: (body) => [{ type: 'UnitCampus', id: body?.data?.id }]
        }),

        addUnit: builder.mutation<ApiResponse<UnitCampus>, CreateUnit>({
            query: (body) => ({
                url: 'unit-campus/create',
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'UnitCampus', id: 'LIST' },{type: 'UnitCampus', id: 'SEARCH'}],
        }),

        editUnit: builder.mutation<ApiResponse<UnitCampus>, EditUnit & {id: number}>({
            query: (body) => ({
                url: `unit-campus/update/${body.id}`,
                method: 'PATCH',
                body: {...body, id:undefined},
            }),

            invalidatesTags: (body) => [{ type: 'UnitCampus', id: body?.data?.id }, {type: 'UnitCampus', id: 'SEARCH'}],
        }),

        searchUnits: builder.query<ApiResponseAll<UnitCampus>, {keyword?: string, page: number, limit: number}>({

            query: (body) => ({
                url: `unit-campus/search?keyword=${body.keyword}&page=${body.page}&limit=${body.limit}`,
                method: 'GET'
            }),
            providesTags: (result) => 
                result 
                ? 
                [
                    ...result.data.map(({id}) => ({type: 'UnitCampus' as const, id})),
                    {type: 'UnitCampus', id: 'SEARCH'},
                ]
                :
                [{type: 'UnitCampus', id: 'SEARCH'}] 

        })




    }),

    overrideExisting: 'throw'

})


export const {useGetUnitsQuery, useGetUnitQuery, useAddUnitMutation, useEditUnitMutation, useSearchUnitsQuery} = unitApi