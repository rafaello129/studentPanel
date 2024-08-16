import { useFormik } from 'formik';
import { Dispatch, FC, SetStateAction, useMemo } from 'react';

import * as Yup from 'yup';


import user from '../../../assets/icons/usuario.png';
import { Career } from '../../../interfaces/career';
import { UnitCampus } from '../../../interfaces/unit-campus';

import {  useGetCareersQuery } from '../../../services/api/providers/careerApi';
import { useAddStudentMutation } from '../../../services/api/providers/studentApi';
import { useGetUnitsQuery } from '../../../services/api/providers/unitApi';

interface Props {
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

export const CreateStudentModal: FC<Props> = ({ setShowModal }) => {
  
  const res =  useGetCareersQuery({page: 1, limit:  10,});
  const {data: careerResponse } = res
  console.log(res);
  const careers = useMemo(() => careerResponse?.data || [], [careerResponse]);

  const resUnit = useGetUnitsQuery({page: 1, limit:  10,});
  const {data: unitResponse } = resUnit;
  console.log(resUnit);
  const units = useMemo(() => unitResponse?.data || [], [unitResponse]);

  const [createStudent] = useAddStudentMutation();

  const { handleSubmit, errors, touched, resetForm, getFieldProps } = useFormik(
    {
      initialValues: {
        name: '',
        lastName: '',
        motherLastName: '',
        noControl: '',
        semester: '',
        idCareer: 1,
        idUnitCampus: 1,
        career: undefined,
        unitCampus: undefined,
      },
      onSubmit: async (values) => {
        values.career = careers.find((career) => career.id === values.idCareer) as any;
          values.unitCampus = units.find((unit) => unit.id === values.idUnitCampus) as any;
        const res = await createStudent(values);
        console.log(res);
        resetForm();
        setShowModal(false);
      },
      validationSchema: Yup.object({
        name: Yup.string().required('Este campo es requerido.'),
        lastName: Yup.string().required('Este campo es requerido.'),
        motherLastName: Yup.string().required('Este campo es requerido.'),
        noControl: Yup.string().required('Este campo es requerido.'),
        semester: Yup.string().required('Este campo es requerido.'),
        idCareer: Yup.string().required('Este campo es requerido.'),
        idUnitCampus: Yup.string().required('Este campo es requerido.'),
      }),
    },
  );

  return (
    <div className='modal fade show' tabIndex={-1} style={{ display: 'block', background: 'rgba(0,0,0,.5)' }} role='dialog' aria-modal='true'>
      <div className='modal-dialog modal-lg modal-dialog-centered' role='document'>
        <div className='modal-content'>
          <div className='modal-header'>
            <img src={user} width={38} className='p-1' alt='User icon' />
            <h5 className='modal-title'>Agregar alumno</h5>
            <button type='button' className='btn-close' aria-label='Close' onClick={() => setShowModal(false)}></button>
          </div>
          <div className='modal-body'>
            <form noValidate onSubmit={handleSubmit} autoComplete='off' className='row g-3'>
              <div className='col-md-12'>
                <label className='form-label'>Nombre</label>
                <input type='text' {...getFieldProps('name')} className='form-control' />
                {touched.name && errors.name && <span className='text-danger'>{errors.name}</span>}
              </div>
              <div className='col-md-6'>
                <label className='form-label'>Apellido paterno</label>
                <input type='text' {...getFieldProps('lastName')} className='form-control' />
                {touched.lastName && errors.lastName && <span className='text-danger'>{errors.lastName}</span>}
              </div>
              <div className='col-md-6'>
                <label className='form-label'>Apellido materno</label>
                <input type='text' {...getFieldProps('motherLastName')} className='form-control' />
                {touched.motherLastName && errors.motherLastName && <span className='text-danger'>{errors.motherLastName}</span>}
              </div>
              <div className='col-md-4'>
                <label className='form-label'>No. Control</label>
                <input type='text' {...getFieldProps('noControl')} className='form-control' />
                {touched.noControl && errors.noControl && <span className='text-danger'>{errors.noControl}</span>}
              </div>
              <div className='col-md-4'>
                <label className='form-label'>Semestre</label>
                <input type='text' {...getFieldProps('semester')} className='form-control' />
                {touched.semester && errors.semester && <span className='text-danger'>{errors.semester}</span>}
              </div>
              <div className='col-md-6'>
                <label className='form-label'>Unidad</label>
                <select className='form-select' {...getFieldProps('idUnitCampus')} aria-label='Unidad'>
                  {units.map((resp: UnitCampus) => (
                    <option key={resp.id} value={resp.id}>{resp.name}</option>
                  ))}
                </select>
              </div>
              <div className='col-md-6'>
                <label className='form-label'>Carrera</label>
                <select className='form-select' {...getFieldProps('idCareer')} aria-label='Carrera'>
                  {careers.map((resp: Career) => (
                    <option key={resp.id} value={resp.id}>{resp.name}</option>
                  ))}
                </select>
              </div>
              <div className='modal-footer'>
                <button type='button' className='btn btn-secondary' onClick={() => setShowModal(false)}>Cancelar</button>
                <button type='submit' className='btn btn-primary'>Guardar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};