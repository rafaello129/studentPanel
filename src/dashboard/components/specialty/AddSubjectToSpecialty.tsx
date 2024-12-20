import { Dispatch, SetStateAction, useMemo, useState } from "react";
import {useGetSpecialtyQuery } from "../../../services/api/providers/specialtyApi";
import { Outlet } from 'react-router-dom';
import { Specialty } from "../../../interfaces/specialty";
import { SubjectList } from './subjectList';
import Loading from "../shared/Loading";


interface Props {
    setShowModal: Dispatch<SetStateAction<boolean>>,
    sty: Specialty
    
}   



export const AddSubjectToSpecialtyPage = ({ sty, setShowModal }: & Props) => {
    
    const [page, setPage] = useState<number>(1);
    const [selectedSpecialty, ] = useState<number | undefined>();
    const [selectedSemester, setSelectedSemester] = useState<string | undefined>();


    const specialty =  useGetSpecialtyQuery({id: sty.id});
    const {data: specialtyResponse } = specialty;
    console.log(specialty);
    console.log(specialtyResponse);
    const spty = useMemo(() => specialtyResponse?.data || null, [specialty]);
    console.log("Specialty for subject assignation: ",spty);


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
                            spty ?

                                <>
                                    <h6 className="ms-3"><strong>Clave: </strong> {" "} {spty.key}</h6>

                                    <h6 className="ms-3"><strong>Especialidad: </strong> {" "} {spty.name}</h6>

                                    <div className="container mt-4">
                                        {
                                            spty.subjects ?
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
                                                        {spty.subjects.map(sty => (
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
                                    <SubjectList sty={spty} />
                                
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
