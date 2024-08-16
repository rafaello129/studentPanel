import React, { useMemo, useState } from 'react';
import { Class } from '../../../interfaces/class';
import defaultUserImage from "../../../assets/icons/userpicture.png";


import Swal from 'sweetalert2';
import { Student } from '../../../interfaces/student';
import { useGetStudentsQuery, useSearchStudentsByNoControlQuery } from '../../../services/api/providers/studentApi';
import { apiAssignStudent } from '../../../api/classes-Providers';

export type registeredClassProps = {
    cls: Class;
    updateClass: (updatedClass: Class) => void; // Function to update the class in parent component
};

const SearchStudent = ({ cls, updateClass }: registeredClassProps) => {
    
    const [page, setPage] = useState<number>(1);

    const [numControl, setNumControl] = useState<string>("");

    const res = (!numControl) ? useGetStudentsQuery({page: page, limit:  10,}) : useSearchStudentsByNoControlQuery({page: page, limit:  10, noControl: numControl},{skip:!numControl});
    
    const {data: studentResponse } = res
    
    const students = useMemo(() => studentResponse?.data || [], [studentResponse]);

    console.log(res);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNumControl(event.target.value);
        //dispatch(searchStudentByNoControl(event.target.value, 1));
    };

    const assignToClass = async (studentId: number | undefined, lastName: string | undefined, motherLastName: string | undefined, name: string | undefined, noControl: string | undefined) => {
        try {
            if (studentId) {
                await apiAssignStudent(studentId, cls.id);
                let upClass = { ...cls, students: cls.students.concat({ id: studentId, name: name, lastName: lastName, motherLastName: motherLastName, noControl: noControl }) }

                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: 'Estudiante asignado con éxito.'
                });

                // Actualizar la clase en el componente padre
                updateClass(upClass);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const isStudentAssigned = (studentId: number | undefined) => {
        return cls.students.some((student: Student) => student.id === studentId);
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
                            placeholder="Buscar por número de control..." 
                            value={numControl}
                            onChange={handleSearchChange}
                            aria-label="Buscar por número de control" 
                        />
                    </div>

                    {students.length > 0 && (
                        <table className="table table-hover">
                            <thead className="table-light">
                                <tr>
                                    <th>Alumnos encontrados</th>
                                    <th className="text-center">Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students
                                    .filter(list => !isStudentAssigned(list.id))
                                    .map(list => (
                                        <tr key={list.id}>
                                            <td>{list.lastName} {list.motherLastName} {list.name}</td>
                                            <td className="text-center">
                                                <button
                                                    className="btn btn-outline-secondary btn-sm"
                                                    onClick={() => assignToClass(list.id, list.lastName, list.motherLastName, list.name, list.noControl)}
                                                >
                                                    Asignar a esta clase
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SearchStudent;
