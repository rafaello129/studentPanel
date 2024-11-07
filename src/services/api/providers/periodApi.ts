import { peesadApi } from "../peesadApi";
import { ApiResponseAll } from "../../../interfaces/api-response-all";
import { CreatePeriod, CreateSubperiod, Period, Subperiod } from "../../../interfaces/period";
import { ApiResponse } from "../../../interfaces/api-response";

export interface PeriodWithSubperiods extends Period {
  subperiods: { id: number; name: string; isCurrent: boolean }[];
}

export const periodApi = peesadApi.injectEndpoints({
  endpoints: (builder) => ({
    getPeriods: builder.query<ApiResponseAll<PeriodWithSubperiods>, void>({
      query: () => ({
        url: 'period/all',
        method: 'GET',
      }),
      providesTags: ['Period'],
    }),

    createPeriod: builder.mutation<ApiResponse<PeriodWithSubperiods>, CreatePeriod>({
      query: (body) => ({
        url: 'period/create',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Period'],
    }),

    createSubperiod: builder.mutation<ApiResponse<PeriodWithSubperiods>, CreateSubperiod>({
      query: (body) => ({
        url: 'period/subperiod/create',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Period'],
    }),

    activateSubperiod: builder.mutation<void, number>({
      query: (id) => ({
        url: `period/subperiod/activate/${id}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Period'],
    }),

    deactivateSubperiod: builder.mutation<void, number>({
      query: (id) => ({
        url: `period/subperiod/deactivate/${id}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Period'],
    }),

    activatePeriod: builder.mutation<void, number>({
      query: (id) => ({
        url: `period/current/${id}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Period'],
    }),

    deactivatePeriod: builder.mutation<void, number>({
      query: (id) => ({
        url: `period/deactivate/${id}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Period'],
    }),

    getActivePeriodSubperiods: builder.query<ApiResponseAll<Subperiod>, void>({
      query: () => ({
        url: 'period/active-period/subperiods',
        method: 'GET',
      }),
      providesTags: ['Period'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetPeriodsQuery,
  useCreatePeriodMutation,
  useCreateSubperiodMutation,
  useActivateSubperiodMutation,
  useDeactivateSubperiodMutation,
  useActivatePeriodMutation,
  useDeactivatePeriodMutation,
  useGetActivePeriodSubperiodsQuery 
} = periodApi;