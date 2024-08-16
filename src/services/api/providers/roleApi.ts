import { Role } from "../../../interfaces/role";
import { peesadApi } from "../peesadApi";

const roleApi = peesadApi.enhanceEndpoints({addTagTypes: ['Role']}).injectEndpoints({

    endpoints: (builder) => ({

        getRoles: builder.query<Role[], void>({
            query: () => ({
              url: 'role',
              method: 'GET',
            }),
            providesTags: ['Role'],
            
          }),

          editUserRole: builder.mutation < { id: number; isActive: boolean; role: Role },{ userId: number; roleId: number } >({
            query: ({ userId, roleId }) => {
              return {
                url: `/user-role/assing/${userId}/role/${roleId}`,
                method: 'POST',
              };
            },
            invalidatesTags: ['Teacher', 'Tutor', 'User'],
          }),

    }),

    overrideExisting: 'throw',

}) 

export const {useGetRolesQuery, useEditUserRoleMutation} = roleApi;