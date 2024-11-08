
import { Dispatch, SetStateAction, useState } from "react";
import question from '../../../assets/icons/question.svg';

import { Specialty } from "../../../interfaces/specialty";
import EditSpecialtyModal from "./EditSpecialityModal";
import { Plan } from "../../../interfaces/plan";
import { Link, NavLink, Outlet } from "react-router-dom";
import { AddSubjectToSpecialtyPage } from './AddSubjectToSpecialty';

interface params {
    specialties: Specialty[];
    isLoading: boolean;
    plans: Plan[];
}

export const SpecialtyList = ({specialties, isLoading, plans}:params) => {
    
    const [selectedSpecialty, setSelectedSpecialty] = useState<Specialty | null>(null);
    const [showEditSpecialtyModal, setShowEditSpecialtyModal] = useState<boolean>(false);
    const [showAddSubjectModal, setShowAddSubjectModal] = useState<boolean>(false);

    const handleSelectSpecialty = (selectedSpecialty: Specialty) => {
        setSelectedSpecialty(selectedSpecialty);
        
        setShowEditSpecialtyModal(true);
    };

    
    const handleAddSubjectToSpecialty = (selectedSpecialty: Specialty) => {
        setSelectedSpecialty(selectedSpecialty);
        setShowAddSubjectModal(true);
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

        <div className="card mt-1 p-2">
            {showEditSpecialtyModal && selectedSpecialty && (
                <EditSpecialtyModal setShowModal={setShowEditSpecialtyModal} specialty={selectedSpecialty} plans={plans}/>
            )}

            {showAddSubjectModal && selectedSpecialty && (
                <AddSubjectToSpecialtyPage setShowModal={setShowAddSubjectModal} sty={selectedSpecialty}/>
            )}
            <table className="table text-center">
                <thead >
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Clave</th>

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
                                    <td>{specialty.key}</td>
                                    <td>{
                                        specialty.plan ?
                                                specialty.plan.name
                                            :
                                                "Sin Asignar"
                                    }</td>
                                    <td>{
                                        specialty.plan ?
                                                specialty.plan.career?.name
                                            :
                                                "Sin Asignar"
                                    }</td>
                                    <td>
                                        <div className=" d-flex flex-row justify-content-evenly">


                                            <button
                                                type="button"
                                                className="btn btn-primary btn-sm"
                                                onClick={() => handleSelectSpecialty(specialty)}>
                                                <i className="fa-solid fa-pen"></i>
                                            </button>
                                            
                                            <hr />
                                            

                                            <button
                                                className='btn btn-primary btn-sm"r'
                                                onClick={() => handleAddSubjectToSpecialty(specialty)}
                                                
                                            >
                                                <i className="fa-solid fa-plus"></i>
                                                <span className='ms-2'  >Materias</span>
                                            </button>

                                        </div>
                                        

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
            <Outlet></Outlet>
        </div>

    )

}