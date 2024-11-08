import React, { FC } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

import carrerIcon from '../../assets/icons/carrer.png';
import { AcademicEnviromentTabs } from '../components/AcademicEnviromentTabs';

interface props{
    
}


export const AcademicEnviromentLayout: FC<props> = () => {

  return (
    <>
      <div className=' d-flex flex-column justify-content-start'>

          <div className=' d-flex justify-content-start flex-column' >
              
            <AcademicEnviromentTabs/>

            <div className=' container-fluid'>
            <Outlet></Outlet>
            </div>

          </div>
      </div>
      
    </>
  )
}

