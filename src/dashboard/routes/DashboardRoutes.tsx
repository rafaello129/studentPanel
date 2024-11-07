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
