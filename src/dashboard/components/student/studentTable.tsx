import React, { useState } from "react";
import { Student } from "../../../interfaces/student";
import { EditStudentModal } from "./EditStudentModal";

interface StudentTableProps {
  students: Student[];
}

const StudentTable: React.FC<StudentTableProps> = ({ students }) => {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showModalEdit, setShowModalEdit] = useState<boolean>(false);

  const handleSelectStudent = (student: Student) => {
    setSelectedStudent(student);
    setShowModalEdit(true);
  };

  return (
    <div>
      {showModalEdit && selectedStudent && (
        <EditStudentModal
          setShowModal={setShowModalEdit}
          student={selectedStudent}
        />
      )}
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>No. Control</th>
            <th>Nombre</th>
            <th>Semestre</th>
            <th>Unidad</th>
            <th>Carrera</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.noControl}>
              <td>{student.noControl}</td>
              <td>{`${student.name} ${student.lastName} ${student.motherLastName}`}</td>
              <td>{student.semester}</td>
              <td>{student.unitCampus?.name}</td>
              <td>{student.career?.name}</td>
              <td>
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => handleSelectStudent(student)}
                >
                  Ver datos
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {students.length === 0 && (
        <div className="text-center mt-3">
          No hay estudiantes creados.
        </div>
      )}
    </div>
  );
};

export default StudentTable;
