import { FC } from 'react'
import { NavLink } from 'react-router-dom'

import carrerIcon from '../../assets/icons/carrer.png';

export const AcademicEnviromentTabs: FC = () => {

  const activeStyle = {
    background: '#f3f3f3',
    fontWeight: 'bold',
    color: "#AC0034",
  };

  const unactiveStyle = {
    background: '#FFFFFF',
    fontWeight: 'lighter',
    color: '#000000',
  };

  return (
    <>
        <div className=' d-flex flex-column justify-content-start'>

            <div className=' d-flex justify-content-start flex-column' >
                
                <nav className=' ms-4 mt-4'>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <NavLink
                        style={({ isActive }) => (isActive ? activeStyle : unactiveStyle)}
                        className='nav-link d-flex align-items-center'
                        to='subjects'
                    >   
                        <span className='ms-2 fs-4'> 📘 </span>
                        <span className='ms-2'> Materias</span>
                    </NavLink>
                    <NavLink
                        style={({ isActive }) => (isActive ? activeStyle : unactiveStyle)}
                        className='nav-link d-flex align-items-center'
                        to='specialty'
                    >
                        
                        <span className='ms-2 fs-3'>🎓</span>
                        <span className='ms-2'>Especialidad</span>
                    </NavLink>
                    <NavLink
                        style={({ isActive }) => (isActive ? activeStyle : unactiveStyle)}
                        className='nav-link d-flex align-items-center'
                        to='plan'
                    >
                        <span className='ms-2 fs-4'>🗂️</span>
                        <span className='ms-2'>Planes</span>
                    </NavLink>
                    </div>
                </nav>
            </div>
        </div>
        
    </>
  )
}

