import { PaginationQueryParamsType, peesadApi } from "../peesadApi";
import { ApiResponseAll } from "../../../interfaces/api-response-all";
import { ApiResponse } from "../../../interfaces/api-response";
import { CreatePackage, Package } from "../../../interfaces/package";

const packageApi = peesadApi.injectEndpoints({

    endpoints: (builder) => ({

        getPackages: builder.query< ApiResponseAll<Package>, PaginationQueryParamsType>({
            query: ({ page = 1, limit = 1, isActive }) =>({
              url:`package/findAll?page=${page}&limit=${limit}` +
              (isActive !== undefined ? `&isActive=${isActive}` : ''),
              method: 'GET',
            }),
              
            // providesTags: ['Package', 'Class', 'Subject', 'Teacher'],
            providesTags: (result) =>
              result
                ? [
                    ...result.data.map(({ id }) => ({
                      type: 'Package' as const,
                      id,
                    })),
                    { type: 'Package', id: 'PARTIAL-LIST' },
                    'Class',
                    'Subject',
                    'Teacher',
                  ]
                : [
                    { type: 'Package', id: 'PARTIAL-LIST' },
                    'Class',
                    'Subject',
                    'Teacher',
                  ],
          }),

          addPackage: builder.mutation<ApiResponse<Package>, CreatePackage>({
            query: (body) => ({
              url: 'package/create',
              method: 'POST',
              body,
            }),
            
            invalidatesTags: [{ type: 'Package', id: 'PARTIAL-LIST' }],
          }),

    }),

    overrideExisting: 'throw'

})

export const {useGetPackagesQuery, useAddPackageMutation} = packageApi