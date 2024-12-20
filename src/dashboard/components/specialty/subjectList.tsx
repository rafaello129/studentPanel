import React, { useMemo, useState, useEffect } from 'react';
import { Class } from '../../../interfaces/class';
import Swal from 'sweetalert2';
import { Student } from '../../../interfaces/student';
import { useGetStudentsQuery } from '../../../services/api/providers/studentApi';
import { useGetCareersQuery } from '../../../services/api/providers/careerApi';
import { apiAssignStudent } from '../../../api/classes-Providers';
import Pagination from '../shared/Pagination';
import question from '../../../assets/icons/question.svg';
import { Specialty, CreateSpecialty } from '../../../interfaces/specialty';
import { useGetSpecialitySubjectsQuery, useGetSubjectsQuery, useSearchSpecialtySubjectsQuery } from '../../../services/api/providers/subjectsApi';
import { useAssignSubjectToSpecialtyMutation } from '../../../services/api/providers/specialtyApi';

export type RegisteredSpecialtyProps = {
    sty: Specialty;
};
export const SubjectList = ({ sty, }: RegisteredSpecialtyProps) => {

    const [searchKeyword, setSearchKeyword] = useState<string>("");

    const [page, setPage] = useState<number>(1);
    
    const [semesters, setSemesters] = useState<number[] | undefined>(undefined);
    const limit = 10;

    const [assingSubject, result] = useAssignSubjectToSpecialtyMutation()

    const res = (!searchKeyword) 
    ? useGetSpecialitySubjectsQuery({ page: page, limit: limit, specialty: true  }) 
    : useSearchSpecialtySubjectsQuery({ page: page, limit: limit, keyword: searchKeyword}, { skip: !searchKeyword });
    const { data: subjectResponse } = res;
    const subjects = useMemo(() => subjectResponse?.data || [], [subjectResponse]);
    const totalSubjects = subjectResponse?.total || 0; // Total de materias para la paginación



    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchKeyword(event.target.value);
    };

    

    const assignToSpecialty = async (subjectId: number | undefined) => {
        try {
            if (subjectId) {
                const res = await assingSubject( {subjectId, specialtyId: sty.id} );
                console.log(res);
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: 'Estudiante asignado con éxito.'
                });
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-header bg-primary text-white">
                    <h5 className="mb-0">Buscar Materia de Especialidad</h5>
                </div>
                <div className="card-body">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Buscar por clave"
                            value={searchKeyword}
                            onChange={handleSearchChange}
                            aria-label="Buscar por número de control"
                        />
                    </div>


                    {subjects.length > 0 ? (
                        <>
                            <table className="table table-hover">
                                <thead className="table-light">
                                    <tr>
                                        <th>Materias</th>
                                        <th>Clave</th>
                                        <th className="text-center">Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {subjects
                                        .filter(list => !sty.subjects.some(sub=> sub.id === list.id))
                                        .map(list => (
                                            <tr key={list.id}>
                                                <td>{list.name} </td>
                                                <td>{list.clave}</td>
                                                <td className="text-center">
                                                    <button
                                                        className="btn btn-outline-secondary btn-sm"
                                                        onClick={() => assignToSpecialty(list.id)}
                                                    >
                                                        Asignar a este plan de especialidad
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                            <Pagination
                                currentPage={page}
                                pageSize={limit}
                                totalCount={totalSubjects}
                                onPageChange={setPage}
                                className='justify-content-center'
                            />
                        </>
                    ) : (
                        <div className="alert alert-warning text-center">
                            <div className="d-flex justify-content-center mt-2 mb-2">
                                <img src={question} alt="escudo-y-logo" width={180} style={{ borderRadius: 10 }} />
                            </div>
                            No hay materias de especialidad.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

