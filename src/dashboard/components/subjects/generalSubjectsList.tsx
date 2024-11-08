
import { useState } from "react";
import question from '../../../assets/icons/question.svg';
import EditSubjectModal from './editSubjectModal';
import { Subject } from '../../../interfaces/subject';



type SubjectListProps = {
    subjects: Subject[];
    isLoading: boolean
  };

export const GeneralSubjectList = ({subjects, isLoading}: SubjectListProps) => {
    const [showModalEdit, setShowModalEdit] = useState<boolean>(false);
    const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
    
    
    const handleSelectSubject = (selectedSubject: Subject) => {
        setSelectedSubject(selectedSubject);
        setShowModalEdit(true);
    };



      if (subjects.length === 0) {
        return (
          <div className="mt-3 p-2 text-center">
            <div className="d-flex justify-content-center mt-5">
              <img src={question} alt="escudo-y-logo" width={180} style={{ borderRadius: 10 }} />
            </div>
            No hay materias creadas.
          </div>
        );
      }
    
    return (

        <div className="card mt-3 p-2">
            {
                showModalEdit && <EditSubjectModal setShowModal={setShowModalEdit} subject={selectedSubject} />
            }

            <table className="table text-center table-striped">
                <thead >
                    <tr>
                        <th scope="col">Materia</th>
                        <th scope="col">Clave</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {subjects.map((subject: Subject) => (
                        <tr key={subject.id}>
                            <td>{subject.name}</td>
                            <td>{subject.clave}</td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-primary btn-sm"
                                    onClick={() => handleSelectSubject(subject)}>
                                    <i className="fa-solid fa-pen"></i>
                                </button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
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

    )

}