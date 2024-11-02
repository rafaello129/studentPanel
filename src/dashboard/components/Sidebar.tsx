import { NavLink } from 'react-router-dom';
import carrerIcon from '../../assets/icons/carrer.png';
import classIcon from '../../assets/icons/class.png';
import modulos from '../../assets/icons/cubitos.png';
import gestionar from '../../assets/icons/inscripcion.png';
import peesad from '../../assets/icons/peesad-portal.png';
import student from '../../assets/icons/student.png';
import unidIcon from '../../assets/icons/unid.png';
import user from '../../assets/icons/user.png';
import logo from '../../assets/logo.svg';
import academicLoad from '../../assets/icons/academicLoad.png'

import centerAcademicIcon from '../../assets/icons/centerAcademic.png';

export const Sidebar = () => {
  const activeStyle = {
    background: '#f3f3f3',
    fontWeight: 'bold',
  };

  return (
    <div
      className='offcanvas offcanvas-start sidebarNav border-0 shadow-sm'
      tabIndex={-1}
      id='offcanvasExample'
      aria-labelledby='offcanvasExampleLabel'
    >
      <div className='offcanvas-header d-flex justify-content-center'>
        <img className='image-logo' src={peesad} width={150} alt='PEESAD Logo' />

      </div>

      <div className='offcanvas-body p-0'>
        <div className='d-flex justify-content-center'>
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <NavLink
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                className='nav-link d-flex align-items-center'
                to='/home'
              >
                <span className='material-icons'>home</span>
                <span className='ms-2'>Home</span>
              </NavLink>
            </li>
            <li className='nav-item'>
              <span className='nav-link d-flex align-items-center'>
                <img src={centerAcademicIcon} width={28} alt='Academic Center Icon' />
                <span className='ms-1 fw-light'>Entorno Académico</span>
              </span>

              <ul className='navbar-nav'>
                <li className='nav-item'>
                  <NavLink
                    style={({ isActive }) => (isActive ? activeStyle : undefined)}
                    className='nav-link d-flex align-items-center'
                    to='/carrer'
                  >
                    <img src={carrerIcon} width={28} alt='Carrer Icon' />
                    <span className='ms-2'>Carreras</span>
                  </NavLink>
                </li>



                <li className='nav-item'>
                  <NavLink
                    style={({ isActive }) => (isActive ? activeStyle : undefined)}
                    className='nav-link d-flex align-items-center'
                    to='/unit'
                  >
                    <img src={unidIcon} width={28} alt='Unit Icon' />
                    <span className='ms-2'>Unidades</span>
                  </NavLink>
                </li>

                {/*
                  <li className='nav-item'>
                    <NavLink
                      style={({ isActive }) => (isActive ? activeStyle : undefined)}
                      className='nav-link d-flex align-items-center'
                      to='/period'
                    >
                      <img src={semesterIcon} width={28} alt='Semester Icon' />
                      <span className='ms-2'>Períodos</span>
                    </NavLink>
                  </li>*/
                }
                <li className='nav-item'>
                  <NavLink
                    style={({ isActive }) => (isActive ? activeStyle : undefined)}
                    className='nav-link d-flex align-items-center'
                    to='/student'
                  >
                    <img src={student} width={28} alt='Student Icon' />
                    <span className='ms-2'>Alumnos</span>
                  </NavLink>
                </li>

              </ul>
            </li>




            <li className='nav-item'>
              <span className='nav-link d-flex align-items-center'>
                <img src={academicLoad} width={37} alt='Academic Load Icon' />
                <span className='ms-1 fw-light'>Carga Académica</span>
              </span>

              <ul className='navbar-nav'>
                <li className='nav-item'>
                  <NavLink
                    style={({ isActive }) => (isActive ? activeStyle : undefined)}
                    className='nav-link d-flex align-items-center'
                    to='/subjects'
                  >
                    <img src={modulos} width={28} alt='Subjects Icon' />
                    <span className='ms-2'>Materias</span>
                  </NavLink>
                </li>


                {/*
                <li className='nav-item'>
                  <NavLink
                    style={({ isActive }) => (isActive ? activeStyle : undefined)}
                    className='nav-link d-flex align-items-center'
                    to='/specialty'
                  >
                    <img src={modulos} width={28} alt='Subjects Icon' />
                    <span className='ms-2'>Especialidad</span>
                  </NavLink>
                </li>

                <li className='nav-item'>
                  <NavLink
                    style={({ isActive }) => (isActive ? activeStyle : undefined)}
                    className='nav-link d-flex align-items-center'
                    to='/plan'
                  >
                    <img src={unidIcon} width={28} alt='Unit Icon' />
                    <span className='ms-2'>Plan de Estudio</span>
                  </NavLink>
                </li>
                */}
              </ul>
            </li>




            <li className='nav-item'>
              <NavLink
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                className='nav-link d-flex align-items-center'
                to='/class'
              >
                <img src={classIcon} width={28} alt='Class Icon' />
                <span className='ms-2'>Clases</span>
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                className='nav-link d-flex align-items-center'
                to='/management'
              >
                <img src={gestionar} width={28} alt='Management Icon' />
                <span className='ms-2'>Asignar alumnos</span>
              </NavLink>
            </li>

            <li className='nav-item'>
              <NavLink
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                className='nav-link d-flex align-items-center'
                to='/users'
              >
                <img src={user} width={28} alt='User Icon' />
                <span className='ms-2'>Usuarios</span>
              </NavLink>
            </li>

            <li className='nav-item'>
              <NavLink
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                className='nav-link d-flex align-items-center'
                to='/evaluation'
              >
                <img src={user} width={28} alt='User Icon' />
                <span className='ms-2'>Evaluaciones</span>
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                className='nav-link d-flex align-items-center'
                to='/AcademicLevelPage'
              >
                <img src={user} width={28} alt='User Icon' />
                <span className='ms-2'>Niveles Academicos</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      <div className=' d-flex justify-content-center'>
        <img src={logo} width='40%' alt='University Logo' className='mb-1' />
      </div>
    </div>
  );
};
