import { useFormik } from 'formik';
import { Dispatch, FC, SetStateAction } from 'react';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import { UnitCampus } from '../../../interfaces/unit-campus';
import { useEditUnitMutation } from '../../../services/api/providers/unitApi';


interface Props {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  unit: UnitCampus | null;
}

export const EditUnitModal: FC<Props> = ({ setShowModal, unit }) => {

  const [editUnit] = useEditUnitMutation();

  const { handleSubmit, errors, touched, resetForm, getFieldProps } = useFormik(
    {
      initialValues: {
        name: unit?.name,
        key: unit?.key,
        location: unit?.location,
        boss: unit?.boss,
      },
      onSubmit: async (values) => {
        const id = unit?.id;
        if (id) {
          const { isConfirmed } = await Swal.fire({
            title: '¿Estás seguro?',
            text: `Se editará la información de la unidad.`,
            confirmButtonText: '¡Si, actualizar!',
            confirmButtonColor: '#20968E',
            showCancelButton: true,
            cancelButtonText: '¡No, cancelar!',
            cancelButtonColor: '#f23e3e',
          });

          if (!isConfirmed) return;
          const result = await editUnit({id, ...values});
          console.log(result);
          resetForm();
          setShowModal(false);
        }
      },
      validationSchema: Yup.object({
        name: Yup.string().required('Este campo es requerido.'),
        key: Yup.string().required('Este campo es requerido.'),
        location: Yup.string().required('Este campo es requerido.'),
        boss: Yup.string().required('Este campo es requerido.'),
      }),
    },
  );

  return (
    <div
      className='modal'
      tabIndex={-1}
      data-bs-backdrop='static'
      style={{ display: 'block', background: 'rgba(0,0,0,.5)' }}
    >
      <div
        className='modal-dialog modal-lg modal-dialog-centered'
        role='document'
      >
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>Agregar Unidad</h5>
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
              <div className=' mt-3'>
                <label className='btn-outline-secondary'>
                  Nombre de la unidad
                </label>
                <input
                  type='text'
                  {...getFieldProps('name')}
                  className='form-control mt-2'
                  autoComplete='off'
                />
                {touched.name && errors.name && (
                  <span className='text-danger'>{errors.name}</span>
                )}
              </div>
              <div className='col-md-5 mt-3'>
                <label className='btn-outline-secondary'>
                  Jefe de la unidad
                </label>
                <input
                  type='text'
                  {...getFieldProps('boss')}
                  className='form-control mt-2'
                  autoComplete='off'
                />
                {touched.boss && errors.boss && (
                  <span className='text-danger'>{errors.boss}</span>
                )}
              </div>
              <div className='col-md-5 mt-3'>
                <label className='btn-outline-secondary'>Ubicación</label>
                <input
                  type='text'
                  {...getFieldProps('location')}
                  className='form-control mt-2'
                  autoComplete='off'
                />
                {touched.location && errors.location && (
                  <span className='text-danger'>{errors.location}</span>
                )}
              </div>
              <div className='col-md-5 mt-3'>
                <label className='btn-outline-secondary'>Clave</label>
                <input
                  type='text'
                  placeholder='ABC123'
                  {...getFieldProps('key')}
                  className='form-control mt-2'
                  autoComplete='off'
                />
                {touched.key && errors.key && (
                  <span className='text-danger'>{errors.key}</span>
                )}
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
