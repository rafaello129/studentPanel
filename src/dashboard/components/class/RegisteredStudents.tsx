import React from 'react';
import { Class } from '../../../interfaces/class';
import defaultUserImage from "../../../assets/icons/userpicture.png";

export type RegisteredClassProps = {
  cls: Class;
};

const RegisteredStudent = ({ cls }: RegisteredClassProps) => {
  return (
    <div className="container mt-4">
      {cls.students ? (
        <div className="card">
          <div className="card-header bg-primary text-white">
            <h5 className="mb-0">Alumnos Registrados</h5>
          </div>
          <div className="card-body p-0">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>Nombre</th>
                  <th>Número de control</th>
                </tr>
              </thead>
              <tbody>
                {cls.students.map(student => (
                  <tr key={student.id}>
                    <td>
                      {student.lastName} {student.motherLastName} {student.name}
                    </td>
                    <td>
                      {student.noControl}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="alert alert-warning" role="alert">
          No hay alumnos registrados.
        </div>
      )}
    </div>
  );
}

export default RegisteredStudent;
