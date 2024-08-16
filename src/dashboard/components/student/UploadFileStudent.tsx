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
  fileSelected?: File
}

let fileSelected: File | null;

export const UploadFileStudent: FC<Props> = ({ setShowModal }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [multiCreate, result] = useMultiAddStudentMutation();
  
  const res =  useGetCareersQuery({page: 1, limit:  10,});
  const {data: careerResponse } = res
  console.log(res);
  const careers = useMemo(() => careerResponse?.data || [], [careerResponse]);

  const resUnit = useGetUnitsQuery({page: 1, limit:  10,});
  const {data: unitResponse } = resUnit;
  console.log(resUnit);
  const units = useMemo(() => unitResponse?.data || [], [unitResponse]);
  

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      fileSelected = file;
      setSelectedFile(file);
    }
  };

  const create = async (idCareer: number, idUnit: number, semester: number) => {

      if(!fileSelected){
        showErrorMessage('Archivo no seleccionado');
        return false;
      } else {
          console.log("PUNTO PREVIO A CREACIÓN");
          console.log(fileSelected)
          createMultipleStudents(fileSelected, idCareer, idUnit, semester, multiCreate, result);
        return true;
      }
  };

  const { handleSubmit, errors, touched, resetForm, getFieldProps } = useFormik(
    {
      initialValues: {
        semester: '',
        idUnitCampus: 0,
        idCareer: 0,
      },
      onSubmit: async (values) => {
        console.log(values)
        if (  await create(+values.idCareer, +values.idUnitCampus, +values.semester)) {
          resetForm();
          setShowModal(false);
        }
        fileSelected = null
      },
    },
  );

  return (
    <div
      className='modal'
      tabIndex={-1}
      data-bs-backdrop='static'
      style={{ width: '100%', display: 'block', background: 'rgba(0,0,0,.5)' }}
    >
      <div className='modal-dialog modal-dialog-centered modal-xl' role='document'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>Importar archivo</h5>
            <button
              type='button'
              className='btn-close btn-outline-secondary'
              data-bs-dismiss='modal'
              aria-label='Cerrar'
              onClick={() => setShowModal(false)}
            ></button>
          </div>
          <div className='modal-body'>
            <form
              noValidate
              onSubmit={handleSubmit}
              autoComplete='off'
              className='row mb-5'
            >
              <div className='mt-1'>
                <label className='btn-outline-secondary'>Unidad</label>
                <select
                  className='form-select'
                  {...getFieldProps('idUnitCampus')}
                  aria-label='Default select example'
                >
                  <option value={0} key={0}>Multiples Unidades</option>
                  {units.map((resp: UnitCampus) => (
                    <option key={resp.id} value={resp.id}>{resp.name}</option>
                  ))}
                </select>
              </div>
              <div className='mt-3'>
                <label className='btn-outline-secondary'>Carrera</label>
                <select
                  className='form-select'
                  {...getFieldProps('idCareer')}
                  aria-label='Default select example'
                >
                  <option key={0} value={0}>Multiples Carreras</option>
                  {careers.map((resp: Career) => (
                    <option key={resp.id} value={resp.id}>{resp.name}</option>
                  ))}
                </select>
              </div>
              <div className=' mt-3'>
                <label className='btn-outline-secondary'>Semestre</label>
                <input
                  type='text'
                  {...getFieldProps('semester')}
                  className='form-control mt-2'
                  autoComplete='off'
                />
              </div>
              <div className='p-3'>
                <p>Sigue estos pasos para cargar tu archivo:</p>
                <ol>
                  <li>
                    Descarga el siguiente archivo o utiliza el mismo formato de encabezados.{" "}
                    <a href="src/assets/files/FormatoAlumnos.xlsx" download="Registro Alumnos.xlsx" className="text-primary" style={{cursor: 'pointer'}}>
                       Click aquí
                    </a>
                    
                  </li>
                  <li>
                    Modifica el archivo e introduce los datos de los estudiantes (Apellidos, nombres y numero de control son campos obligatorios)
                  </li>
                  <li>
                    Si se selecciona una de las opciones de la parte superior, todos los alumnos seran registrados a esa opcion. En caso de que se quiera agregar los alumnos a diferentes unidades, carreras o semestres, se debera especificar en el archivo de excel.
                  </li>
                  <li>
                    Haz clic en "Seleccionar archivo" y elige el archivo que
                    deseas subir.
                  </li>
                  <li>
                    Una vez seleccionado, el nombre del archivo aparecerá
                    debajo.
                  </li>
                  <li>Revisa que has elegido el archivo correcto.</li>
                  <li>
                    Haz clic en "Guardar" para completar la subida del archivo.
                  </li>
                </ol>
              </div>

              <div className='d-flex justify-content-center mt-3'>
                <div className='d-flex align-items-center'>
                  <label
                    htmlFor='excelFile'
                    className='form-label btn-outline-secondary btn me-3'
                  >
                    Seleccionar archivo:
                    <input
                      type='file'
                      id='excelFile'
                      style={{ display: 'none' }}
                      accept='.xls,.xlsx'
                      className='form-control'
                      onChange={handleFileChange}
                    />
                  </label>
                  {selectedFile && (
                    <div className='alert alert-primary p-2 mt-2' role='alert'>
                      Archivo seleccionado: {selectedFile?.name}
                    </div>
                  )}
                </div>
              </div>
              <div className='text-end mt-4'>
                <button type='submit' className='btn btn-primary'>
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
function dispatch(arg0: (dispatch: import("../../../store/store").AppDispatch) => Promise<void>) {
  throw new Error('Function not implemented.');
}

