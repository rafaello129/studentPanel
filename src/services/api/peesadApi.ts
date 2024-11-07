import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export type PaginationQueryParamsType = {
  page?: number;
  limit?: number;
  isActive?: boolean;
};


export const peesadApi = createApi({
  reducerPath: 'peesadApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    'User',
    'List',
    'Period',
    'Plan',
    'Role',
    'Specialty',
    'Student',
    'UnitCampus',
    'Package',
    'Subject',
    'Teacher',
    'Career',
    'Class',
    'Tutor',
    'Evaluation',
    'AcademicLevel',
    'Section',
    'Question',
    'AnswerOption',
    'UserResponse'
  ],
  endpoints: () => ({}),
});

