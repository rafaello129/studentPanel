import { useFormik } from 'formik';
import { useMemo } from 'react';
import { Class } from '../../../interfaces/class';
import { updateClassSchema } from '../../../schemas/class.schema';
import { useEditClassMutation } from '../../../services/api/providers/classApi';
import { useGetPackagesQuery } from '../../../services/api/providers/packageApi';
import { useGetSubjectsQuery } from '../../../services/api/providers/subjectsApi';
import { useGetTeachersQuery } from '../../../services/api/providers/teacherApi';
import { useGetTutorsQuery } from '../../../services/api/providers/tutorsApi';

import Button from '../shared/Button';
import Modal from '../shared/Modal';
import Select from '../shared/Select';

type EditClassModalProps = {
  cls: Class;
  onDismiss: () => void;
};

export default function EditClassModal({
  cls,
  onDismiss,
}: EditClassModalProps) {
  const { data: packagesData } = useGetPackagesQuery({
    page: 1,
    limit: 0,
    isActive: true,
  });
  const { data: subjectsData } = useGetSubjectsQuery({
    page: 1,
    limit: 0,
    isActive: true,
  });
  const { data: tutorsData } = useGetTutorsQuery({
    page: 1,
    limit: 0,
    isActive: true,
  });
  const { data: teachersData } = useGetTeachersQuery({
    page: 1,
    limit: 0,
    isActive: true,
  });
  const [editClass] = useEditClassMutation();

  const packages = useMemo(() => packagesData?.data || [], [packagesData]);
  const subjects = useMemo(() => subjectsData?.data || [], [subjectsData]);
  const teachers = useMemo(() => teachersData?.data || [], [teachersData]);
  const tutors = useMemo(() => tutorsData?.data || [], [tutorsData]);
  const tutorid = cls.tutor? cls.tutor.id : ''

  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: {
      package: cls.package.id,
      subject: cls.subject.id,
      teacher: cls.teacher.id,
      isCurrent: cls.isCurrent,
      isDeleted: cls.isDeleted,
      tutor: tutorid,
    },
    onSubmit: () => {
      const tutoridSubmit = values.tutor? +values.tutor : undefined
      editClass({
        id: cls.id,
        packageId: values.package,
        subjectId: values.subject,
        teacherId: values.teacher,
        isCurrent: values.isCurrent,
        isDeleted: values.isDeleted,
        tutorId: tutoridSubmit
      });
      console.log(
        `Edited with: ${values.package}, ${values.subject} and ${values.teacher}`,
      );
      onDismiss();
    },
    validationSchema: updateClassSchema,
  });

  return (
    <Modal>
      <Modal.Header>
        <Modal.Header.Title>Editar clase</Modal.Header.Title>

        <Button
          variant='outlinePrimary'
          data-bs-dismiss='modal'
          aria-label='close'
          className='btn-close'
          onClick={onDismiss}
        ></Button>
      </Modal.Header>

      <Modal.Body>
        <div className='container'>
          <form noValidate onSubmit={handleSubmit} autoComplete='off'>
            <div className='row'>
              <div className='col-md-6 mb-3'>
                <label htmlFor='package' className='btn-outline-secondary'>
                  Paquete
                </label>

                <Select
                  id='package'
                  name='package'
                  value={values.package}
                  onChange={handleChange}
                >
                  <Select.Option value=''>Selecciona una opción</Select.Option>

                  {packages.map((pkg) => (
                    <Select.Option key={pkg.id} value={pkg.id}>
                      {pkg.name}
                    </Select.Option>
                  ))}
                </Select>

                {errors.package && touched.package && (
                  <span className='text-danger'>{errors.package}</span>
                )}
              </div>
              <div className='col-md-6 mb-3'>
                <label htmlFor='subject' className='btn-outline-secondary'>
                  Materia
                </label>

                <Select
                  id='subject'
                  name='subject'
                  value={values.subject}
                  onChange={handleChange}
                >
                  <Select.Option value=''>Selecciona una opción</Select.Option>

                  {subjects.map((subject) => (
                    <Select.Option key={subject.id} value={subject.id}>
                      {subject.name}
                    </Select.Option>
                  ))}
                </Select>

                {errors.subject && touched.subject && (
                  <span className='text-danger'>{errors.subject}</span>
                )}
              </div>
            </div>
            <div className='mb-3'>
              <label htmlFor='teacher' className='btn-outline-secondary'>
                Maestro
              </label>

              <Select
                id='teacher'
                name='teacher'
                value={values.teacher}
                onChange={handleChange}
              >
                <Select.Option value=''>Selecciona una opción</Select.Option>

                {teachers.map((teacher) => (
                  <Select.Option key={teacher.id} value={teacher.id}>
                    {teacher.user.fullName}
                  </Select.Option>
                ))}
              </Select>

              {errors.teacher && touched.teacher && (
                <span className='text-danger'>{errors.teacher}</span>
              )}
            </div>

            <div className='mb-3'>
              <label htmlFor='tutor' className='btn-outline-secondary'>
                Tutor
              </label>

              <Select
                id='tutor'
                name='tutor'
                value={values.tutor}
                onChange={handleChange}
              >
                <Select.Option value=''>Selecciona una opción</Select.Option>

                {tutors.map((tutor) => (
                  <Select.Option key={tutor.id} value={tutor.id}>
                    {tutor.user.fullName}
                  </Select.Option>
                ))}
              </Select>

              {errors.teacher && touched.teacher && (
                <span className='text-danger'>{errors.teacher}</span>
              )}
            </div>

            <div className='row'>
              <div className='col-md-6 mb-3'>
                <div className='form-check form-switch form-check-reverse'>
                  <input
                    type='checkbox'
                    name='isCurrent'
                    id='isCurrent'
                    className='form-check-input'
                    role='switch'
                    checked={values.isCurrent}
                    onChange={handleChange}
                  />
                  <label htmlFor='isCurrent' className='btn-outline-secondary'>
                    Está habilitada
                  </label>
                  {errors.isCurrent && touched.isCurrent && (
                    <span className='text-danger'>{errors.isCurrent}</span>
                  )}
                </div>
              </div>
              <div className='col-md-6 mb-3'>
                <div className='form-check form-switch form-check-reverse'>
                  <input
                    type='checkbox'
                    name='isDeleted'
                    id='isDeleted'
                    className='form-check-input'
                    role='switch'
                    checked={values.isDeleted}
                    onChange={handleChange}
                  />
                  <label htmlFor='isDeleted' className='btn-outline-secondary'>
                    Está eliminada
                  </label>
                  {errors.isDeleted && touched.isDeleted && (
                    <span className='text-danger'>{errors.isDeleted}</span>
                  )}
                </div>
              </div>
            </div>

            <Button type='submit'>Guardar clase</Button>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}
