
import { useState } from "react";
import question from '../../../assets/icons/question.svg';

import { Subject } from '../../../interfaces/subject';
import { Plan } from '../../../interfaces/plan';
import EditPlanModal from "./EditPlanModal";
import Loading from "../shared/Loading";



type PlanListProps = {
    plans: Plan[];
    isFetching: boolean
  };

export const PlanList = ({plans, isFetching}: PlanListProps) => {
    const [showModalEdit, setShowModalEdit] = useState<boolean>(false);
    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
    
    
    const handleSelectPlan = (selectedPlan: Plan) => {
        setSelectedPlan(selectedPlan);
        setShowModalEdit(true);
    };



      if (plans.length === 0) {
        return (
          <div className="mt-3 p-2 text-center">
            <div className="d-flex justify-content-center mt-5">
              <img src={question} alt="escudo-y-logo" width={180} style={{ borderRadius: 10 }} />
            </div>
            No se han encontrado planes
          </div>
        );
      }

      if (isFetching){
        return (
            <Loading></Loading>
        )
      }
    
    return (

        <div className="card p-2">
            {
                showModalEdit && <EditPlanModal setShowModal={setShowModalEdit} plan={selectedPlan} />
            }

            <table className="table text-center">
                <thead >
                    <tr>
                        <th scope="col">Planes</th>
                        <th scope="col">Carrera</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        plans ?
                            plans.map((plan: Plan) => (
                                <tr key={plan.id}>
                                    <td>{plan.name}</td>
                                    <td>{plan.career.name}</td>
                                    <td>
                                        <button
                                            type="button"
                                            className="btn btn-primary btn-sm"
                                            onClick={() => handleSelectPlan(plan)}>
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
        </div>

    )

}