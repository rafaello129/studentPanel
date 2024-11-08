import { Navigate, redirect, Route, Routes } from 'react-router-dom';
import { Class } from '../../interfaces/class';
import { DashboardLayout } from '../layouts';
import { HomePage } from '../pages';
import { CarrerPage } from '../pages/carrer';
import ClassPage from '../pages/class/ClassPage';
import { ManagementPage } from '../pages/management';
import { AssignPage } from '../pages/management/pages/AssignPage';
import { StudentPage } from '../pages/student';
import { UnitPage } from '../pages/unit/pages/UnitPage';
import { UsersPage } from '../pages/users';
import { useState } from 'react';
import GeneralSubjectPage from '../pages/subjects/page/generalSubjectPage';
import { SpecialtyPage } from '../pages/specialty/pages/specialtyPage';
import { PlanPage } from '../pages/plan/planPage';
import { AcademicEnviromentLayout } from '../layouts/AcademicEnviromentLayout';
import { Specialty } from '../../interfaces/specialty';
import { AddSubjectToSpecialtyPage } from '../components/specialty/AddSubjectToSpecialty';
import EvaluationList from '../components/evaluation/EvaluationList';
import CreateEvaluationForm from '../components/evaluation/CreateEvaluationForm';
import { EvaluationPage } from '../pages/evaluation/EvaluationPage';
import CloneEvaluationButton from '../components/evaluation/CloneEvaluationButton';
import AssignUsersToEvaluation from '../components/evaluation/AssignUsersToEvaluation';
import AcademicLevelList from '../components/academic-level/AcademicLevelList';
import AcademicLevelPaginatedList from '../components/academic-level/AcademicLevelPaginatedList';
import CreateAcademicLevelForm from '../components/academic-level/CreateAcademicLevelForm';
import UpdateAcademicLevelForm from '../components/academic-level/UpdateAcademicLevelForm';
import AcademicLevelPage from '../pages/academicLevel/AcademicLevelPage';
import EvaluationDetails from '../components/evaluation/EvaluationDetails';
import CreateSectionComponent from '../components/section/CreateSectionComponent';
import SectionDetails from '../components/section/SectionDetails';
import SectionsList from '../components/section/SectionsList';
import UpdateSectionComponent from '../components/section/UpdateSectionComponent';
import EvaluationView from '../components/evaluation/EvaluationView';
import MyEvaluation from '../pages/MyEvaluation/MyEvaluationPage';
import MyEvaluationDetail from '../components/MyEvaluation/MyEvaluationDetail';

import PeriodPage from '../pages/period/PeriodPage';

export const DashboardRoutes = () => {
  
  const [selectedClass, setSelectedClass] = useState<Class | null>(null)


  return (
    <DashboardLayout>
      <Routes>
        <Route path='home' element={<HomePage />} />
        <Route path='carrer' element={<CarrerPage />} />
        <Route path='class' element={<ClassPage />} />
        <Route path='student' element={<StudentPage />} />
        <Route path='users' element={<UsersPage />} />
        <Route path='unit' element={<UnitPage />} />
        <Route path='academic-enviroment' element={<AcademicEnviromentLayout />}>
            <Route index element={<Navigate to={'/academic-enviroment/subjects'}></Navigate>}/>
            <Route path='subjects' element={<GeneralSubjectPage />} />
            <Route path='specialty' element={<SpecialtyPage  />}>
            </Route>
            <Route path='plan' element={<PlanPage />} />
            <Route path='*' element={<Navigate to='/home' />} />
        </Route>
        <Route path='management' element={<ManagementPage setSelectedClass={setSelectedClass} />} />
        
        /*Probando */
        <Route path='ListEvaluaciones' element={<EvaluationList></EvaluationList>} />
        <Route path='CrearEvaluaciones' element={<CreateEvaluationForm></CreateEvaluationForm>} />
        <Route path='ClonarEvaluacion' element={<CloneEvaluationButton></CloneEvaluationButton>} />
        <Route path='AsignarEvaluation' element={<AssignUsersToEvaluation></AssignUsersToEvaluation>} />
       <Route path="/sections/:sectionId" element={<SectionDetails />} />
       <Route path="/evaluation/:id/:idClass" element={<MyEvaluationDetail />} />
       <Route path="Myevaluation" element={<MyEvaluation></MyEvaluation>} />
        <Route path='AcademicLevelPage' element={<AcademicLevelPage></AcademicLevelPage>} />
        <Route path="/evaluations/:evaluationId" element={<EvaluationDetails />} />
  {/* Nueva ruta para ver detalles de una evaluación en modo solo lectura */}
  <Route path="/evaluations/view/:id" element={<EvaluationView />} />


        <Route path='Evaluation' element={<EvaluationPage></EvaluationPage>} />
        <Route path='period' element={<PeriodPage/>} />

        <Route
          path='assign'
          element={
            selectedClass ? (
              <AssignPage cls={selectedClass as Class} />
            ) : (
              <Navigate to='/management' replace />
            )
          }
        />

        {/* TODO: Descomentar en proxima versión y redireccionar a /inicio  */}
        <Route path='/*' element={<Navigate to='/home' />} />
      </Routes>
    </DashboardLayout>
  );
};
