import { ApiResponse } from "../../../interfaces/api-response";
import { ApiResponseAll } from "../../../interfaces/api-response-all";
import { User } from "../../../interfaces/auth-response";
import { peesadApi } from "../peesadApi";



export const userApi = peesadApi.enhanceEndpoints({addTagTypes:['User']}).injectEndpoints({

    endpoints: (builder) => ({

        getUsers: builder.query<ApiResponseAll<User>, { page?: number; limit?: number }> ({

            query: ({ page = 1, limit = 1 }) => ({
              url: `users/findAll?page=${page}&limit=${limit}`,
              method: 'GET',
            }),
      
            providesTags: ['User'],
      
          }),

          createUser: builder.mutation<ApiResponse<User>, User>({
            query: (user) => ({
              url: 'users',
              method: 'POST',
              body: user,
            }),
            invalidatesTags: ['User'],
          }),

    }),

    overrideExisting: 'throw',

})

export const {useGetUsersQuery, useCreateUserMutation } = userApi