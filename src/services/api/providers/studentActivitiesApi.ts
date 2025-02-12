// src/api/studentActivitiesApi.ts
import { ApiResponse } from "../../../interfaces/api-response";
import { PaginationQueryParamsType, peesadApi } from "../peesadApi";

export interface StudentClassActivitiesResponse {
  classId: number;
  studentId: number;
  activities: {
    sectionId: number;
    sectionName: string;
    sectionPosition: number;
    activities: {
      id: number;
      title: string;
      content: string;
      position: number;
      scheduledActivities: any[];
    }[];
  }[];
}

export interface ScheduledActivityResponse {
  id: number;
  activity: {
    id: number;
    title: string;
    content: string;
    section: {
      id: number;
      name: string;
      position: number;
    }
  };
  startDate: string;
  endDate: string;
  class: {
    id: number;
    name: string;
  }
}

// Response interface for a student's submission
export interface StudentSubmissionResponse {
  id: number;
  submissionDate: string;
  comment?: string;
  files: {
    id: number;
    filename: string;
    originalName: string;
    mimeType: string;
    size: number;
    path: string;
    uploadedAt: string;
  }[];
}

// Response interface for a file attachment (optional)
export interface FileAttachmentResponse {
  id: number;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  path: string;
  uploadedAt: string;
}

// Response interface for an activity comment (optional)
export interface ActivityCommentResponse {
  id: number;
  message: string;
  createdAt: string;
  // Optionally include sender and receiver information here if needed
}

const studentActivitiesApi = peesadApi.injectEndpoints({
  endpoints: (builder) => ({
    getStudentClassActivities: builder.query<
      ApiResponse<StudentClassActivitiesResponse>, 
      { studentId: number; classId: number }
    >({
      query: ({ studentId, classId }) => ({
        url: `student-schedules/students/${studentId}/classes/${classId}/activities`,
        method: 'GET'
      }),
      providesTags: (result, error, { classId }) => [
        { type: 'StudentActivities', id: classId }
      ],
    }),
    getStudentScheduleDetails: builder.query<
      ApiResponse<ScheduledActivityResponse>,
      { scheduleId: number; studentId: number }
    >({
      query: ({ scheduleId, studentId }) => ({
        url: `student-schedules/${scheduleId}/student/${studentId}`,
        method: 'GET'
      }),
      providesTags: (result, error, { scheduleId }) => [
        { type: 'StudentSchedules', id: scheduleId }
      ],
    }),
    // Endpoint to create or update a student's submission for a scheduled activity.
    submitStudentSubmission: builder.mutation<
      ApiResponse<StudentSubmissionResponse>,
      { studentId: number; scheduledActivityId: number; comment?: string }
    >({
      query: ({ studentId, scheduledActivityId, comment }) => ({
        url: `student-submissions/${scheduledActivityId}/student/${studentId}`,
        method: 'POST',
        body: { comment }
      }),
      invalidatesTags: (result, error, { scheduledActivityId }) => [
        { type: 'StudentSubmissions', id: scheduledActivityId }
      ],
    }),
    // Endpoint to upload a file attachment to an existing submission.
    uploadSubmissionFile: builder.mutation<
      ApiResponse<FileAttachmentResponse>,
      { submissionId: number; file: FormData }
    >({
      query: ({ submissionId, file }) => ({
        url: `student-submissions/${submissionId}/files`,
        method: 'POST',
        body: file,
      }),
      invalidatesTags: (result, error, { submissionId }) => [
        { type: 'StudentSubmissions', id: submissionId }
      ],
    }),
    // Endpoint to add an activity comment for a scheduled activity.
    addActivityComment: builder.mutation<
      ApiResponse<ActivityCommentResponse>,
      { scheduledActivityId: number; senderId: number; receiverId: number; message: string }
    >({
      query: ({ scheduledActivityId, senderId, receiverId, message }) => ({
        url: `student-submissions/activity-comments/${scheduledActivityId}`,
        method: 'POST',
        body: { senderId, receiverId, message }
      }),
      invalidatesTags: (result, error, { scheduledActivityId }) => [
        { type: 'ActivityComments', id: scheduledActivityId }
      ],
    }),
    // Endpoint to get submission details along with its file attachments.
    getStudentSubmissionDetails: builder.query<
      ApiResponse<StudentSubmissionResponse>,
      { submissionId: number }
    >({
      query: ({ submissionId }) => ({
        url: `student-submissions/${submissionId}`,
        method: 'GET'
      }),
      providesTags: (result, error, { submissionId }) => [
        { type: 'StudentSubmissions', id: submissionId }
      ],
    }),
  }),
  overrideExisting: 'throw',
});

export const { 
  useGetStudentClassActivitiesQuery,
  useGetStudentScheduleDetailsQuery,
  useSubmitStudentSubmissionMutation,
  useUploadSubmissionFileMutation,
  useAddActivityCommentMutation,
  useGetStudentSubmissionDetailsQuery
} = studentActivitiesApi;