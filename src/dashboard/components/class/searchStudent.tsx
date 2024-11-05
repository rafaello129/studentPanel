import React, { useMemo, useState, useEffect } from 'react';
import { Class } from '../../../interfaces/class';
import Swal from 'sweetalert2';
import { useGetStudentsQuery } from '../../../services/api/providers/studentApi';
import { useGetCareersQuery } from '../../../services/api/providers/careerApi';
import { apiAssignStudent } from '../../../api/classes-Providers';
import Pagination from '../shared/Pagination';
import question from '../../../assets/icons/question.svg';

export type RegisteredClassProps = {
    cls: Class;
    updateClass: (updatedClass: Class) => void;
    onFilterChange: (careerId?: number, semester?: string) => void;
};

const SearchStudent = ({ cls, updateClass, onFilterChange }: RegisteredClassProps) => {
    const [page, setPage] = useState<number>(1);
    const [numControl, setNumControl] = useState<string>("");
    const [selectedCareer, setSelectedCareer] = useState<number | undefined>();
    const [selectedSemester, setSelectedSemester] = useState<string | undefined>();
    const [semesters, setSemesters] = useState<number[] | undefined>(undefined);
    const limit = 10;

    const { data: studentResponse } = useGetStudentsQuery({
        page,
        limit,
        careerId: selectedCareer || undefined,
        semester: selectedSemester || undefined,
        idUnitCampus: cls.package.unitCampus.id // Filtrar por la unidad de la clase
    });

    const students = useMemo(() => studentResponse?.data || [], [studentResponse]);
    const totalStudents = studentResponse?.total || 0;

    const { data: careerResponse } = useGetCareersQuery({ page: 1, limit: 1000, isActive: true });
    const careers = useMemo(() => careerResponse?.data || [], [careerResponse]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNumControl(event.target.value);
        setPage(1); // Resetear a la primera página al buscar por número de control
    };

    const handleFilterChange = () => {
        onFilterChange(selectedCareer, selectedSemester);
    };

    const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>, inputName: string) => {
        const value = event.target.value;

        switch (inputName) {
            case 'career':
                setSelectedCareer(Number(value));
                setSelectedSemester(undefined);
                setSemesters(undefined);
                if (value) {
                    const selectedCareerObj = careers.find((item) => item.id === +value);
                    const maxSemester = selectedCareerObj?.semester ? parseInt(selectedCareerObj.semester) : 0;
                    setSemesters(Array.from({ length: maxSemester }, (_, i) => i + 1));
                } else {
                    setSemesters(undefined);
                }
                break;
            case 'semester':
                setSelectedSemester(value);
                break;
            default:
                break;
        }
        setPage(1);
    };

    const assignToClass = async (studentId: number | undefined, lastName: string | undefined, motherLastName: string | undefined, name: string | undefined, noControl: string | undefined) => {
        try {
            if (studentId) {
                await apiAssignStudent(studentId, cls.id);
                const updatedClass = { ...cls, students: cls.students.concat({ id: studentId, name, lastName, motherLastName, noControl }) };

                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: 'Estudiante asignado con éxito.'
                });

                updateClass(updatedClass);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        handleFilterChange();
    }, [selectedCareer, selectedSemester]);

    console.log("prueba", cls);
    console.log("carrera: ", selectedCareer, "semestre: ", selectedSemester, "estudiantes: ", students);

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
                            placeholder="Buscar por número de control..."
                            value={numControl}
                            onChange={handleSearchChange}
                            aria-label="Buscar por número de control"
                        />
                    </div>

                    <div className="d-flex mb-3">
                        <select className="form-select me-2" onChange={(e) => handleOnChange(e, 'career')}>
                            <option value="">Seleccionar Carrera</option>
                            {careers.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                        <select className="form-select me-2" onChange={(e) => handleOnChange(e, 'semester')} disabled={!semesters}>
                            <option value="">Seleccionar Semestre</option>
                            {semesters?.map((s) => (
                                <option key={s} value={s}>
                                    {s}
                                </option>
                            ))}
                        </select>
                        <button className="btn btn-primary" onClick={handleFilterChange}>Filtrar</button>
                    </div>

                    {students.length > 0 ? (
                        <>
                            <table className="table table-hover">
                                <thead className="table-light">
                                    <tr>
                                        <th>Alumnos encontrados</th>
                                        <th>No. Control</th>
                                        <th className="text-center">Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students.map((student) => (
                                        <tr key={student.id}>
                                            <td>{student.lastName} {student.motherLastName} {student.name}</td>
                                            <td>{student.noControl}</td>
                                            <td className="text-center">
                                                <button
                                                    className="btn btn-outline-secondary btn-sm"
                                                    onClick={() => assignToClass(student.id, student.lastName, student.motherLastName, student.name, student.noControl)}
                                                >
                                                    Asignar a esta clase
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Pagination
                                currentPage={page}
                                pageSize={limit}
                                totalCount={totalStudents}
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

export default SearchStudent;
