import 'bootstrap/dist/css/bootstrap.min.css';

export const HomePage = () => {
  return (
    <div className="container my-5">
      <div className="text-center mb-5">
        <h1>Bienvenido al Portal de Gestión Académica</h1>
        <p>Sigue los pasos a continuación para configurar tu entorno académico:</p>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="list-group">
            <a href="/carreras" className="list-group-item list-group-item-action">
              <h5>Paso 1: Crear carrera</h5>
              <small>Ingrese a la sección de Carreras y cree una nueva carrera.</small>
            </a>
            <a href="/unidades" className="list-group-item list-group-item-action">
              <h5>Paso 2: Crear unidad</h5>
              <small>Ingrese a la sección de Unidades y cree una nueva unidad asociada a la carrera.</small>
            </a>
            <a href="/alumnos" className="list-group-item list-group-item-action">
              <h5>Paso 3: Crear estudiantes</h5>
              <small>Ingrese a la sección de Alumnos y agregue nuevos estudiantes.</small>
            </a>
            <a href="/usuarios" className="list-group-item list-group-item-action">
              <h5>Paso 4: Asignar roles a usuarios</h5>
              <small>Ingrese a la sección de Usuarios y asigne los roles correspondientes.</small>
            </a>
            <a href="/materias" className="list-group-item list-group-item-action">
              <h5>Paso 5: Crear materias</h5>
              <small>Ingrese a la sección de Materias y cree las materias necesarias.</small>
            </a>
            <a href="/clases" className="list-group-item list-group-item-action">
              <h5>Paso 6: Crear clases</h5>
              <small>Ingrese a la sección de Clases y asigne materias, unidades, y profesores.</small>
            </a>
            <a href="/gestionar-alumnos" className="list-group-item list-group-item-action">
              <h5>Paso 7: Gestionar alumnos</h5>
              <small>Ingrese a la sección de Gestionar alumnos para inscribirlos en las clases.</small>
            </a>
          </div>
          <div className="text-center mt-4">
            <p>
              Para más detalles, consulta nuestra <a href="/documentacion">documentación</a> o mira nuestro <a href="/tutorial">video tutorial</a>.
            </p>
          </div>
        </div>
      </div>
      {/* Opcional: Sección de tarjetas comentada */}
      {/*
      <div className="d-flex p-4">
        <div className="d-flex w-75 flex-column">
          <div className="card m-3">
            <div className="card-body">
              <img
                width={600}
                className="me-2 rounded-circle"
                src={`https://i.stack.imgur.com/RmQxL.png`}
                alt="User image"
                loading="lazy"
              />
            </div>
          </div>
          <div className="m-3">
            <UsersListHome />
          </div>
        </div>
        <CardListLog />
      </div>
      */}
    </div>
  );
}
