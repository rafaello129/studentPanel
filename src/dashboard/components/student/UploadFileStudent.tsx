import { useFormik } from 'formik';
import { Dispatch, FC, SetStateAction, useMemo, useState } from 'react';
import { showErrorMessage } from '../../../helpers/alerts';
import { Career } from '../../../interfaces/career';
import { UnitCampus } from '../../../interfaces/unit-campus';
import { useGetCareersQuery } from '../../../services/api/providers/careerApi';
import { useGetUnitsQuery } from '../../../services/api/providers/unitApi';
import { createMultipleStudents, useMultiAddStudentMutation } from '../../../services/api/providers/studentApi';

interface Props {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  fileSelected?: File;
}

export const UploadFileStudent: FC<Props> = ({ setShowModal }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [multiCreate, result] = useMultiAddStudentMutation();

  const res = useGetCareersQuery({ page: 1, limit: 10 });
  const { data: careerResponse } = res;
  const careers = useMemo(() => careerResponse?.data || [], [careerResponse]);

  const resUnit = useGetUnitsQuery({ page: 1, limit: 10 });
  const { data: unitResponse } = resUnit;
  const units = useMemo(() => unitResponse?.data || [], [unitResponse]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const create = async (idCareer: number, idUnit: number, semester: number) => {
    if (!selectedFile) {
      showErrorMessage('Archivo no seleccionado');
      return false;
    } else {
      createMultipleStudents(selectedFile, idCareer, idUnit, semester, multiCreate, result);
      return true;
    }
  };

  const { handleSubmit, resetForm, getFieldProps } = useFormik({
    initialValues: {
      semester: '',
      idUnitCampus: 0,
      idCareer: 0,
    },
    onSubmit: async (values) => {
      if (await create(+values.idCareer, +values.idUnitCampus, +values.semester)) {
        resetForm();
        setShowModal(false);
      }
      setSelectedFile(null);
    },
  });

  return (
    <div
      className="modal"
      tabIndex={-1}
      data-bs-backdrop="static"
      style={{ width: '100%', display: 'block', background: 'rgba(0,0,0,.5)' }}
    >
      <div className="modal-dialog modal-dialog-centered modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Importar archivo de estudiantes</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Cerrar"
              onClick={() => setShowModal(false)}
            ></button>
          </div>

          <div className="modal-body">
            <form onSubmit={handleSubmit} className="row mb-4" noValidate autoComplete="off">
              <div className="col-md-4 mb-3">
                <label className="form-label">Unidad</label>
                <select
                  className="form-select"
                  {...getFieldProps('idUnitCampus')}
                  aria-label="Selecciona una unidad"
                >
                  <option value={0}>Múltiples Unidades</option>
                  {units.map((unit: UnitCampus) => (
                    <option key={unit.id} value={unit.id}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Carrera</label>
                <select
                  className="form-select"
                  {...getFieldProps('idCareer')}
                  aria-label="Selecciona una carrera"
                >
                  <option value={0}>Múltiples Carreras</option>
                  {careers.map((career: Career) => (
                    <option key={career.id} value={career.id}>
                      {career.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Semestre</label>
                <input
                  type="text"
                  className="form-control"
                  {...getFieldProps('semester')}
                  placeholder="Ingrese el semestre"
                />
              </div>

              {/* Instrucciones */}
              <div className="col-12 mt-3">
                <div className="card">
                  <div className="card-header">
                    <h6>Instrucciones para la carga de estudiantes</h6>
                  </div>
                  <div className="card-body">
                    <ol>
                      <li>
                        Descarga el archivo de plantilla y utiliza el mismo formato de encabezados.{" "}
                        <a
                          href="src/assets/files/FormatoAlumnos.xlsx"
                          download="Registro_Alumnos.xlsx"
                          className="text-primary"
                        >
                          Descargar plantilla
                        </a>
                      </li>
                      <li>
                        Completa el archivo con los datos de los estudiantes. Los campos de
                        apellidos, nombres y número de control son obligatorios.
                      </li>
                      <li>
                        Si seleccionas opciones de unidad, carrera o semestre en este formulario, 
                        todos los estudiantes se asignarán a esas opciones. 
                        Para asignarlos a diferentes valores, especifica en el archivo de Excel.
                      </li>
                      <li>Selecciona el archivo y haz clic en "Guardar" para subirlo.</li>
                    </ol>
                  </div>
                </div>
              </div>

              {/* Cargar Archivo */}
              <div className="col-12 d-flex justify-content-between mt-4">
                <label htmlFor="excelFile" className="btn btn-outline-secondary">
                  Seleccionar archivo
                  <input
                    type="file"
                    id="excelFile"
                    style={{ display: 'none' }}
                    accept=".xls,.xlsx"
                    onChange={handleFileChange}
                  />
                </label>
                {selectedFile && (
                  <div className="alert alert-primary p-2" role="alert">
                    Archivo seleccionado: {selectedFile.name}
                  </div>
                )}
              </div>

              {/* Botón de Guardar */}
              <div className="text-end mt-4">
                <button type="submit" className="btn btn-primary">
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
