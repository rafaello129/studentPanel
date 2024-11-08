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
import { useGetSubjectsQuery } from '../../../services/api/providers/subjectsApi';
import { useAssignSubjectToSpecialtyMutation } from '../../../services/api/providers/specialtyApi';

export type RegisteredSpecialtyProps = {
    sty: Specialty;
};
export const SubjectList = ({ sty, }: RegisteredSpecialtyProps) => {


    const [page, setPage] = useState<number>(1);
    
    const [semesters, setSemesters] = useState<number[] | undefined>(undefined);
    const limit = 10;

    const [assingSubject, result] = useAssignSubjectToSpecialtyMutation()

    const { data: subjectsResponse } = useGetSubjectsQuery({

        page,
        limit,
    });

    const subjects= useMemo(() => subjectsResponse?.data || [], [subjectsResponse]);    
    const totalSubjects = subjectsResponse?.total || 0;


    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPage(1); // Resetear la paginación al buscar por número de control
    };

    const handleFilterChange = () => {
        
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
                    <h5 className="mb-0">Buscar Estudiante</h5>
                </div>
                <div className="card-body">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Buscar por clave"
                            value={sty.key}
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
                            No hay alumnos para la carrera y/o semestre seleccionados.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

