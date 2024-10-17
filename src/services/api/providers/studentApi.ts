import { PaginationQueryParamsType, peesadApi } from "../peesadApi";
import { ApiResponseAll } from "../../../interfaces/api-response-all";
import { ApiResponse } from "../../../interfaces/api-response";
import { CreateStudent, EditStudent, MultiCreateStudent, Student } from "../../../interfaces/student";

import * as XLSX from 'xlsx';
import { showErrorMessage, showLoading } from "../../../helpers/alerts";
import Swal from "sweetalert2";



const studentApi = peesadApi.injectEndpoints({

    endpoints: (builder) => ({

        getStudents: builder.query<
            ApiResponseAll<Student>,
            PaginationQueryParamsType & { careerId?: number; semester?: string; idUnitCampus?: number }
        >({
            query: ({ page = 1, limit = 10, isActive, careerId, semester, idUnitCampus }) => ({
                url: `students/findAll?page=${page}&limit=${limit}`
                    + (isActive !== undefined ? `&isActive=${isActive}` : '')
                    + (careerId !== undefined ? `&careerId=${careerId}` : '')
                    + (semester !== undefined ? `&semester=${semester}` : '')
                    + (idUnitCampus !== undefined ? `&idUnitCampus=${idUnitCampus}` : ''), // Añadir filtro de unidad de campus
                method: 'GET'
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.data.map(({ id }) => ({ type: 'Student' as const, id })),
                        { type: 'Student', id: 'LIST' },
                    ]
                    : [{ type: 'Student', id: 'LIST' }],
        }),



        getStudent: builder.query<ApiResponse<Student>, { id: number }>({

            query: (body) => ({
                url: `students/find/${body.id}`,
                method: 'GET',
            }),

            providesTags: (body) => [{ type: 'Student', id: body?.data?.id }]
        })

        ,

        addStudent: builder.mutation<ApiResponse<Student>, CreateStudent>({

            query: (body) => ({
                url: 'students/create',
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'Student', id: 'LIST' }, { type: 'Student', id: 'SEARCH' }],
        }),

        multiAddStudent: builder.mutation<ApiResponseAll<Student>, MultiCreateStudent>({

            query: (body) => ({
                url: 'students/multicreate',
                method: 'POST',
                body,
            }),
            invalidatesTags: (result) =>
                result?.data
                    ?
                    [
                        ...result.data.map(({ id }) => ({ type: 'Student' as const, id })),
                        { type: 'Student', id: 'LIST' },
                    ]
                    :
                    [{ type: 'Student', id: 'LIST' }]
        }),

        editStudent: builder.mutation<ApiResponse<Student>, EditStudent & { id: number }>({

            query: (body) => ({
                url: `students/update/${body.id}`,
                method: 'PATCH',
                body: { ...body, id: undefined },
            }),

            invalidatesTags: (body) => [{ type: 'Student', id: body?.data?.id }, { type: 'Student', id: 'SEARCH' }],
        }),

        searchStudents: builder.query<ApiResponseAll<Student>, { keyword?: string, page: number, limit: number }>({

            query: (body) => ({
                url: `students/search?keyword=${body.keyword}&page=${body.page}&limit=${body.limit}`,
                method: 'GET'
            }),
            providesTags: (result) =>
                result
                    ?
                    [
                        ...result.data.map(({ id }) => ({ type: 'Student' as const, id })),
                        { type: 'Student', id: 'SEARCH' },
                    ]
                    :
                    [{ type: 'Student', id: 'SEARCH' }]
        }),
        searchStudentsByNoControl: builder.query<ApiResponseAll<Student>, { noControl?: string, page: number, limit: number }>({

            query: (body) => ({
                url: `students/searchNoControl?noControl=${body.noControl}&page=${body.page}&limit=${body.limit}`,
                method: 'GET'
            }),
            providesTags: (result) =>
                result
                    ?
                    [
                        ...result.data.map(({ id }) => ({ type: 'Student' as const, id })),
                        { type: 'Student', id: 'SEARCH' },
                    ]
                    :
                    [{ type: 'Student', id: 'SEARCH' }]
        })
    }),
    overrideExisting: 'throw'
})

export const { useGetStudentQuery, useGetStudentsQuery, useAddStudentMutation, useMultiAddStudentMutation, useEditStudentMutation, useSearchStudentsQuery, useSearchStudentsByNoControlQuery } = studentApi

export const createMultipleStudents = (file: File, idCareer: number, idUnit: number, semester: number, multiCreateFunction: Function, result: any) => {

    console.log("previo al cuerpo de la función");
    showLoading();
    let text: string = ''
    try {

        const reader = new FileReader();


        reader.onload = async (event) => {
            const data = event.target?.result;
            if (data && typeof data === 'string') {
                // Parse the Excel file
                const workbook = XLSX.read(data, { type: 'binary' });
                // Assuming the first sheet is the one you want to read
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                // Convert the sheet to JSON format
                const jsonData: Student[] = XLSX.utils.sheet_to_json(sheet);
                /**/
                console.log(jsonData)
                const res = await multiCreateFunction({ formData: jsonData, idCareer, idUnitCampus: idUnit, semester })
                console.log(res);
                console.log(result);
                if (result.isSuccess) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Éxito',
                        text: 'Estudiante creado con éxito.'
                    })
                }
                else if (result.isLoading) {
                    Swal.fire({
                        icon: 'info',
                        title: 'CARGANDO....',
                        text: 'EL SISTEMA ESTA CARGANDO'
                    })
                }
                else if (result.error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops!',
                        text: text
                    })
                    return;
                }
                else {

                    Swal.fire({
                        icon: 'warning',
                        title: 'no esta funcionando nada de esto',
                        text: 'si entro aqui es porque aun no entiendes rtk'
                    })
                }

            }
        };


        reader.readAsBinaryString(file);
        //const { status, message, data } = await apiCreateStudents(formData);
    } catch (error: any) {
        console.log(error);
        showErrorMessage(error.message);
    }
}
