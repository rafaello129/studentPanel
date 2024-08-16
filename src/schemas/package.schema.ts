import * as yup from 'yup';

export const createPackageSchema = yup.object().shape({
  name: yup.string().required('El nombre es requerido'),
  unitCampus: yup.number().required('La unidad es requerida'),
});

export const updatePackageSchema = createPackageSchema.concat(
  yup.object().shape({
    isActive: yup.boolean().required('El estado del paquete es requerido'),
  }),
);
