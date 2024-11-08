import React, { FC } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { AcademicDomainTabs } from '../components/AcademicDomainTabs'



interface props{
    
}


export const AcademicDomainLayout: FC<props> = () => {

  return (
    <>
      <div className=' d-flex flex-column justify-content-start'>

          <div className=' d-flex justify-content-start flex-column' >
              
            <AcademicDomainTabs></AcademicDomainTabs>

            <div className=' container-fluid'>
            <Outlet></Outlet>
            </div>

          </div>
      </div>
      
    </>
  )
}

