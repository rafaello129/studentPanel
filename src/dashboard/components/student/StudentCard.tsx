import React from "react";
import user from "../../../assets/icons/usuario.png";
import { Student } from "../../../interfaces/student";

interface StudentCardProps {
  student: Student;
  onSelect: (student: Student) => void;
}

const StudentCard: React.FC<StudentCardProps> = ({ student, onSelect }) => {
  return (
    <div className="card student-card m-3 p-4 col-md-5 mb-4" key={student.noControl}>
      <div className="d-flex">
        <img src={user} width={70} className="m-2 p-2" alt="..." />
        <h5 className="card-title mt-3"> 
          {student.name + " " + student.lastName + " " + student.motherLastName}
        </h5>
      </div>
      <div className="card-body d-flex flex-column">
        <span>
          <strong>N. Control:</strong>{" "}
          <span className="badge text-bg-success">{student.noControl}</span>
        </span>
        <span>
          <strong>Semestre:</strong> {student.semester}
        </span>
        <span>
          <strong>Unidad:</strong> {student.unitCampus?.name}
        </span>
        <span>
          <strong>Carrera:</strong> {student.career?.name}
        </span>
      </div>
      <div className="text-end">
        <button
          type="button"
          className="btn btn-success"
          onClick={() => onSelect(student)}
        >
          Ver datos
        </button>
      </div>
    </div>
  );
};

export default React.memo(StudentCard);
