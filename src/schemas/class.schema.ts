import * as yup from 'yup';

export const createClassSchema = yup.object().shape({
  package: yup.number().required('El paquete es requerido'),
  subject: yup.number().required('La materia es requerida'),
  teacher: yup.number().required('El profesor es requerido'),
});

export const updateClassSchema = createClassSchema.concat(
  yup.object().shape({
    isCurrent: yup.boolean().required('El estado de la clase es requerido'),
    isDeleted: yup.boolean().required('El estado de la clase es requerido'),
  }),
);
