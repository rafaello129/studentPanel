import { useFormik } from 'formik';
import { useMemo } from 'react';
import { createPackageSchema } from '../../../schemas/package.schema';
import { useAddPackageMutation } from '../../../services/api/providers/packageApi';
import { useGetUnitsQuery } from '../../../services/api/providers/unitApi';
import Button from '../shared/Button';
import Modal from '../shared/Modal';
import Select from '../shared/Select';

type CreatePackageModalProps = {
  onDismiss: () => void;
};

export default function CreatePackageModal({
  onDismiss,
}: CreatePackageModalProps) {
  const { data: unitCampusesData } = useGetUnitsQuery({
    page: 1,
    limit: 0,
    isActive: true,
  });
  const [addPackage] = useAddPackageMutation();

  const unitCampuses = useMemo(
    () => unitCampusesData?.data || [],
    [unitCampusesData],
  );

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        name: '',
        unitCampus: '',
      },
      onSubmit: () => {
        addPackage({
          name: values.name,
          unitCampusId: +values.unitCampus,
        });
        console.log(`Created with: ${values.name} and ${values.unitCampus}`);
        onDismiss();
      },
      validationSchema: createPackageSchema,
    });

  return (
    <Modal>
      <Modal.Header>
        <Modal.Header.Title>Nuevo paquete</Modal.Header.Title>

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
                <label htmlFor='name'>Nombre del paquete</label>

                <input
                  type='text'
                  name='name'
                  id='name'
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <br />
                {errors.name && touched.name && (
                  <span className='text-danger'>{errors.name}</span>
                )}
              </div>
              <div className='col-md-6 mb-'>
                <label htmlFor='unitCampus'>Unidad</label>

                <Select
                  id='unitCampus'
                  name='unitCampus'
                  value={values.unitCampus}
                  onChange={handleChange}
                >
                  <Select.Option value=''>Selecciona una opción</Select.Option>

                  {unitCampuses.map((unitCampus) => (
                    <Select.Option key={unitCampus.id} value={unitCampus.id}>
                      {unitCampus.name}
                    </Select.Option>
                  ))}
                </Select>

                {errors.unitCampus && touched.unitCampus && (
                  <span className='text-danger'>{errors.unitCampus}</span>
                )}
              </div>
            </div>
            <Button type='submit'>Crear paquete</Button>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}
