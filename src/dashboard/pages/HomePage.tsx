import { NavLink } from 'react-router-dom';
import carrerIcon from '../../assets/icons/carrer.png';
import classIcon from '../../assets/icons/class.png';
import gestionar from '../../assets/icons/inscripcion.png';
import period from '../../assets/icons/period.png';
import student from '../../assets/icons/student.png';
import unidIcon from '../../assets/icons/unid.png';
import user from '../../assets/icons/user.png';
import subjectIcon from '../../assets/icons/academicLoad.png';
import nivelIcon from '../../assets/icons/nivel.png';
import evaluacionIcon from '../../assets/icons/evaluacion.png';

export const HomePage = () => {
  // Pasos para la configuración académica
  const academicSteps = [
    {
      title: "Paso 1: Crear carrera",
      description: "Ingrese a la sección de Carreras y cree una nueva carrera.",
      link: "/carrer",
      icon: carrerIcon,
    },
    {
      title: "Paso 2: Crear unidad",
      description: "Ingrese a la sección de Unidades y cree una nueva unidad asociada a la carrera.",
      link: "/unit",
      icon: unidIcon,
    },
    {
      title: "Paso 3: Crear estudiantes",
      description: "Ingrese a la sección de Alumnos y agregue nuevos estudiantes.",
      link: "/student",
      icon: student,
    },
    {
      title: "Paso 4: Crear subperiodos",
      description: "Ingrese a la sección de Periodos para definir subperiodos.",
      link: "/period",
      icon: period,
    },
    {
      title: "Paso 5: Asignar roles a usuarios",
      description: "Ingrese a la sección de Usuarios y asigne los roles correspondientes.",
      link: "/users",
      icon: user,
    },
    {
      title: "Paso 6: Crear carga académica",
      description: "Ingrese a la sección de Materias y cree las materias necesarias.",
      link: "/academic-enviroment/subjects",
      icon: subjectIcon,
    },
    {
      title: "Paso 7: Crear clases",
      description: "Ingrese a la sección de Clases y asigne materias, unidades, y profesores.",
      link: "/class",
      icon: classIcon,
    },
    {
      title: "Paso 8: Gestionar alumnos",
      description: "Ingrese a la sección de Gestionar alumnos para inscribirlos en las clases.",
      link: "/management",
      icon: gestionar,
    },
  ];

  // Pasos para la creación de evaluaciones
  const evaluationSteps = [
    {
      title: "Paso 1: Crear nivel académico",
      description: "Ingrese a la sección de Niveles Académicos y cree un nuevo nivel.",
      link: "/AcademicLevelPage",
      icon: nivelIcon,
    },
    {
      title: "Paso 2: Crear evaluación",
      description: "Ingrese a la sección de Evaluaciones y cree una nueva evaluación.",
      link: "/Evaluation",
      icon: evaluacionIcon,
    },
  ];

  return (
    <div className="container my-5">
      <div className="text-center mb-5">
        <h1>Bienvenido al Portal de Gestión Académica</h1>
      </div>

      {/* Sección de pasos para la configuración académica */}
      <div className="mb-5">
        <h3 className="mb-3">Pasos para configurar el entorno académico</h3>
        <div className="row">
          {academicSteps.map((step, index) => (
            <div className="col-md-4 mb-2" key={index}>
              <div className="card shadow-sm text-center">
                <div className="card-body">
                  <img src={step.icon} alt={`${step.title} Icon`} width={50} className="mb-3" />
                  <h5 className="card-title">{step.title}</h5>
                  <p className="card-text">{step.description}</p>
                  <NavLink
                    to={step.link}
                    className="btn btn-primary mt-3"
                  >
                    Ir a {step.title.split(":")[1]}
                  </NavLink>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sección de pasos para la creación de evaluaciones */}
      <div className="mb-5">
        <h3 className="mb-3">Pasos para crear evaluaciones</h3>
        <div className="row">
          {evaluationSteps.map((step, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card shadow-sm text-center">
                <div className="card-body">
                  <img src={step.icon} alt={`${step.title} Icon`} width={50} className="mb-3" />
                  <h5 className="card-title">{step.title}</h5>
                  <p className="card-text">{step.description}</p>
                  <NavLink
                    to={step.link}
                    className="btn btn-primary mt-3"
                  >
                    Ir a {step.title.split(":")[1]}
                  </NavLink>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
