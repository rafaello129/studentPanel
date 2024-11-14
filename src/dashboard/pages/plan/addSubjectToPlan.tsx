import { Dispatch, SetStateAction, useMemo, useState } from "react";
import {useGetSpecialtyQuery } from "../../../services/api/providers/specialtyApi";
import { Outlet } from 'react-router-dom';
import { Specialty } from "../../../interfaces/specialty";
import { SubjectList } from "../../components/specialty/subjectList";
import Loading from "../../components/shared/Loading";
import { GeneralSubjectList } from "../../components/subjects/generalSubjectsList";
import { GeneralSubjectLista } from "./generalSubjectLista";
import { useGetPlanQuery } from "../../../services/api/providers/planApi";
import { Plan } from "../../../interfaces/plan";



interface Props {
    setShowModal: Dispatch<SetStateAction<boolean>>,
    pln: Plan
    
}   



export const AddSubjectToPlanPage = ({ pln, setShowModal }: & Props) => {
    
    const [page, setPage] = useState<number>(1);
    const [selectedSpecialty, ] = useState<number | undefined>();
    const [selectedSemester, setSelectedSemester] = useState<string | undefined>();


    const plan =  useGetPlanQuery({id: pln.id});
    const {data: planResponse } = plan;
    console.log(plan);
    console.log(planResponse);
    const plnn = useMemo(() => planResponse?.data || null, [plan]);
    console.log("Specialty for subject assignation: ",plnn);


    return (
    <div className="modal" tabIndex={-1} style={{ display: 'block', background: 'rgba(0,0,0,.5)' }}>
            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                    <h4><strong>Asignación</strong> </h4>
                        <button
                            type="button"
                            className="btn-close btn-outline-secondary"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={() => setShowModal(false)}></button>
                    </div>
                    
                    <div className="modal-body">
                        {
                            plnn ?

                                <>  
                                    <h6 className="ms-3"><strong>Clave: </strong> {" "} {plnn.key}</h6>

                                    <h6 className="ms-3"><strong>Especialidad: </strong> {" "} {plnn.name}</h6>

                                    <div className="container mt-4">
                                        {
                                            plnn.subjects ?
                                                (
                                                <div className="card">
                                                <div className="card-header bg-primary text-white">
                                                    <h5 className="mb-0">Materias Incluidas</h5>
                                                </div>
                                                <div className="card-body p-0">
                                                    <table className="table table-hover mb-0">
                                                    <thead className="table-light">
                                                        <tr>
                                                        <th>Nombre</th>
                                                        <th>Clave</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {pln.subjects.map(sty => (
                                                        <tr key={sty.id}>
                                                            <td>
                                                            {sty.name}
                                                            </td>
                                                            <td>
                                                            {sty.clave}
                                                            </td>
                                                        </tr>
                                                        ))}
                                                    </tbody>
                                                    </table>
                                                </div>
                                                </div>
                                                ) 
                                                : 
                                                (
                                                    <div className="alert alert-warning" role="alert">
                                                        No hay materias registradas.
                                                    </div>
                                                )
                                        }
                                    </div>
                                    
                                    <GeneralSubjectLista pln={pln} />
                                
                                </>
                            : 
                                <Loading></Loading>

                        }
                    </div>
                </div>
            </div>
        </div>
        
    );
}
