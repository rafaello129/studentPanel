import AssignUsersToEvaluation from "../../components/evaluation/AssignUsersToEvaluation"
import CloneEvaluationButton from "../../components/evaluation/CloneEvaluationButton"
import CreateEvaluationForm from "../../components/evaluation/CreateEvaluationForm"
import EvaluationList from "../../components/evaluation/EvaluationList"


export const EvaluationPage = ()=>{
    
    
    return (
        <div className="evaluation-page">
            <CreateEvaluationForm></CreateEvaluationForm>
            <EvaluationList></EvaluationList>
            <CloneEvaluationButton></CloneEvaluationButton>
            <AssignUsersToEvaluation></AssignUsersToEvaluation>
        </div>
    )
}