import { useFormik } from 'formik';
import { useMemo } from 'react';
import { createClassSchema } from '../../../schemas/class.schema';
import { useAddClassMutation } from '../../../services/api/providers/classApi';
import { useGetPackagesQuery } from '../../../services/api/providers/packageApi';
import { useGetSubjectsQuery } from '../../../services/api/providers/subjectsApi';
import { useGetTeachersQuery } from '../../../services/api/providers/teacherApi';
import { useGetTutorsQuery } from '../../../services/api/providers/tutorsApi';
import Button from '../shared/Button';
import Modal from '../shared/Modal';
import Select from '../shared/Select';

type CreateClassModalProps = {
  onDismiss: () => void;
};

export default function CreateClassModal({ onDismiss }: CreateClassModalProps) {
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
  const { data: teachersData } = useGetTeachersQuery({
    page: 1,
    limit: 0,
    isActive: true,
  });
  const { data: tutorsData } = useGetTutorsQuery({
    page: 1,
    limit: 0,
    isActive: true,
  });
  const [addClass] = useAddClassMutation();

  const packages = useMemo(() => packagesData?.data || [], [packagesData]);
  const subjects = useMemo(() => subjectsData?.data || [], [subjectsData]);
  const teachers = useMemo(() => teachersData?.data || [], [teachersData]);
  const tutors = useMemo(() => tutorsData?.data || [], [tutorsData]);

  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: {
      package: '',
      subject: '',
      teacher: '',
      tutor: ''
    },
    onSubmit: async () => {
      const tutorId = values.tutor ? +values.tutor : undefined;
      addClass({
        package_id: +values.package,
        subject_id: +values.subject,
        teacher_id: +values.teacher,
        tutor_id: tutorId
      });
      onDismiss();
    },
    validationSchema: createClassSchema,
  });

  return (
    <Modal>
      <Modal.Header>
        <Modal.Header.Title>Nueva clase</Modal.Header.Title>

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
                <label htmlFor='package'>Paquete</label>

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
              <div className='col-md-6 mb-'>
                <label htmlFor='subject'>Materia</label>

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
              <label htmlFor='teacher'>Maestro</label>

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
              <label htmlFor='tutor'>Tutor</label>

              <Select
                id='tutor'
                name='tutor'
                value={values.tutor}
                onChange={handleChange}
              >
                <Select.Option value=''>Sin Asignar</Select.Option>

                {tutors.map((tutor) => (
                  <Select.Option key={tutor.id} value={tutor.id}>
                    {tutor.user.fullName}
                  </Select.Option>
                ))}
              </Select>
            </div>

            <Button type='submit'>Crear clase</Button>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}
