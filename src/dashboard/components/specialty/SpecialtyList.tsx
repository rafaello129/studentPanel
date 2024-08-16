
import { useState } from "react";
import question from '../../../assets/icons/question.svg';

import { Specialty } from "../../../interfaces/specialty";
import EditSpecialtyModal from "./EditSpecialityModal";
import { Plan } from "../../../interfaces/plan";

interface params {
    specialties: Specialty[];
    isLoading: boolean;
    plans: Plan[]
}

export const SpecialtyList = ({specialties, isLoading, plans}:params) => {
    
    const [selectedSpecialty, setSelectedSpecialty] = useState<Specialty | null>(null);
    const [showEditSpecialtyModal, setShowEditSpecialtyModal] = useState<boolean>(false);

    const handleSelectSpecialty = (selectedSpecialty: Specialty) => {
        setSelectedSpecialty(selectedSpecialty);
        setShowEditSpecialtyModal(true);
    };

    
    



      if (specialties.length === 0) {
        return (
          <div className="mt-3 p-2 text-center">
            <div className="d-flex justify-content-center mt-5">
              <img src={question} alt="escudo-y-logo" width={180} style={{ borderRadius: 10 }} />
            </div>
            No se encontraron planes de especialidad.
          </div>
        );
      }
    
    return (

        <div className="card mt-3 p-2">
            {showEditSpecialtyModal && selectedSpecialty && (
                <EditSpecialtyModal setShowModal={setShowEditSpecialtyModal} specialty={selectedSpecialty} plans={plans}/>
            )}
            <table className="table text-center">
                <thead >
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Plan</th>
                        <th scope="col">Carrera</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        specialties ?
                    
                            specialties.map((specialty: Specialty) => (
                                <tr key={specialty.id}>
                                    <td>{specialty.name}</td>
                                    <td>{specialty.plan.name}</td>
                                    <td>{specialty.plan.career?.name}</td>
                                    <td>
                                        <button
                                            type="button"
                                            className="btn btn-primary btn-sm"
                                            onClick={() => handleSelectSpecialty(specialty)}>
                                            <i className="fa-solid fa-pen"></i>
                                        </button>

                                    </td>
                                </tr>
                            ))
                        :
                            <></>
                    }
                </tbody>
            </table>
            {isLoading ?
                <div className='d-flex flex-column align-items-center justify-content-center'>

                    <div className="text-center p-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Cargando...</span>
                        </div>
                    </div>
                </div>
                :
                <></>
            }
        </div>

    )

}