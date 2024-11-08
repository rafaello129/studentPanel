import { FC } from 'react'
import { NavLink } from 'react-router-dom'



import career from '../../assets/icons/carrer.png';
import unit from '../../assets/icons/unit.png';
import student from '../../assets/icons/student.png';

export const AcademicDomainTabs: FC = () => {

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
                        to='career'
                    >   
                        <img src={career} width={24} alt='Class Icon' />
                        <span className='ms-2'> CARRERAS</span>
                    </NavLink>
                    <NavLink
                        style={({ isActive }) => (isActive ? activeStyle : unactiveStyle)}
                        className='nav-link d-flex align-items-center'
                        to='unit'
                    >
                        
                        <img src={unit} width={30} alt='Class Icon' />
                        <span className='ms-2'>UNIDADES</span>
                    </NavLink>
                    <NavLink
                        style={({ isActive }) => (isActive ? activeStyle : unactiveStyle)}
                        className='nav-link d-flex align-items-center'
                        to='student'
                    >
                        <img src={student} width={28} alt='Class Icon' />
                        <span className='ms-2'>ESTUDIANTES</span>
                    </NavLink>
                    </div>
                </nav>
            </div>
        </div>
        
    </>
  )
}

