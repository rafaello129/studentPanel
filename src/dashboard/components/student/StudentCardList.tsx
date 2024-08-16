
import { useState } from "react";
import { EditStudentModal } from "./EditStudentModal";
import { Student } from '../../../interfaces/student';
import StudentCard from "./StudentCard";
import question from '../../../assets/icons/question.svg';



type StudentListProps = {
  students: Student[];
  isLoading: boolean;
};


export const StudentCardList = ({students, isLoading, }:StudentListProps) => {
  

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showModalEdit, setShowModalEdit] = useState<boolean>(false);

  const handleSelectStudent = (selectedStudent: Student) => {
    setSelectedStudent(selectedStudent);
    setShowModalEdit(true);
  };
  
 
  if (students.length === 0) {
    return (
      <div className="mt-3 p-2 text-center">
        <div className="d-flex justify-content-around mt-5">
          <img src={question} alt="escudo-y-logo" width={180} style={{ borderRadius: 10 }} />
        </div>
        No hay estudiantes creados.
      </div>
    );
  }


  return (
    <div className="mt-3 p-2">
      {showModalEdit && (
        <EditStudentModal
          setShowModal={setShowModalEdit}
          student={selectedStudent}
        />
      )}
      <div className="d-flex flex-wrap justify-content-center">
        {students.map((resp: Student) => (
          <StudentCard
            key={resp.noControl}
            student={resp}
            onSelect={handleSelectStudent}
          />
        ))}
      </div>
      {isLoading &&
                <div className='d-flex flex-column align-items-center justify-content-center'>

                    <div className="text-center p-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Cargando...</span>
                        </div>
                    </div>
                </div>
            }

    </div>
  );
};
