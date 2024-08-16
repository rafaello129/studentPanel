
import { Career } from "../../../interfaces/career"

import {  SwitchControl } from ".";
import {  useState } from "react";
import question from '../../../assets/icons/question.svg';


type CareerListProps = {
    careers: Career[];
    onCareerClick: (career: Career) => void;
  };


export const CarrerList = ({careers,  onCareerClick}: CareerListProps)  => {

    const [isLoading, setIsLoading] = useState<boolean>(false)



      if (careers.length === 0) {
        return (
          <div className="mt-3 p-2 text-center">
            <div className="d-flex justify-content-center mt-5">
              <img src={question} alt="escudo-y-logo" width={180} style={{ borderRadius: 10 }} />
            </div>
            No hay carreras creadas.
          </div>
        );
      }
    
    return (

        <div className="card mt-3 p-2">
            

            <table className="table text-center">
                <thead >
                    <tr>
                        <th scope="col">Carrera</th>
                        <th scope="col">Clave</th>
                        <th scope="col">No. Semestres</th>
                        <th scope="col">Habilitar/Deshabilitar</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {careers.map((career: Career) => (
                        <tr key={career.id}>
                            <td>{career.name}</td>
                            <td>{career.key}</td>
                            <td>{career.semester}</td>
                            <td className="d-flex align-items-center justify-content-center">
                                <div className="form-check form-switch">
                                    <SwitchControl
                                        setIsLoading={setIsLoading}
                                        isActive={career.isActive}
                                        careerId={career.id}
                                    />
                                </div>
                            </td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-primary btn-sm"
                                    onClick={() => onCareerClick(career)}>
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