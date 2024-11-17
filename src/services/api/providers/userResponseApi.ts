// src/services/api/userResponseApi.ts

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CreateUserResponseDto } from '../../../interfaces/create-user-response.dto';
import { SubmitEvaluationDto } from '../../../interfaces/submit-evaluation.dto';
import { UserResponseResponse } from '../../../interfaces/user-response-response';
import { peesadApi } from '../peesadApi';




export const userResponseApi = peesadApi.injectEndpoints({
    endpoints: (builder) => ({
        // Crear o actualizar una respuesta de usuario
        createOrUpdateUserResponse: builder.mutation<UserResponseResponse, CreateUserResponseDto>({
          query: (body) => ({
            url: 'user-responses/save',
            method: 'POST',
            body,
          }),
          invalidatesTags: ['UserResponse'],
        }),
        
        // Obtener las respuestas de un usuario para una evaluación específica
        getUserResponsesByEvaluation: builder.query<UserResponseResponse, { evaluationId: number, idClass:number }>({
          query: ({evaluationId, idClass}) => `user-responses/evaluation/${evaluationId}/${idClass}`,
          providesTags: (result, error, { evaluationId, idClass }) => [{ type: 'UserResponse', id: `${evaluationId}-${idClass}` }],
        }),
        
        // Obtener todas las respuestas de los usuarios para una evaluación específica (admin)
        getAllUserResponsesByEvaluation: builder.query<UserResponseResponse, number>({
          query: (evaluationId) => `user-responses/evaluation/${evaluationId}/all`,
          providesTags: (result, error, evaluationId) => [{ type: 'UserResponse', id: evaluationId }],
        }),
        
        // Enviar respuestas de una evaluación
        submitEvaluation: builder.mutation<UserResponseResponse, SubmitEvaluationDto>({
          query: (body) => ({
            url: 'user-responses/submit',
            method: 'POST',
            body,
          }),
          invalidatesTags: (result, error, body) => [
            { type: 'UserResponse', id: body.evaluationId },
          ],
        }),
      }),
    overrideExisting: 'throw',
});



export const {
  useCreateOrUpdateUserResponseMutation,
  useGetUserResponsesByEvaluationQuery,
  useGetAllUserResponsesByEvaluationQuery,
  useSubmitEvaluationMutation,
} = userResponseApi;
