import { Dispatch, FC, SetStateAction, useMemo } from "react"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Subject } from "../../../interfaces/subject";
import Swal from "sweetalert2";
import {  useEditSubjectMutation, useGetSubjectsQuery } from "../../../services/api/providers/subjectsApi";


interface Props {
    setShowModal: Dispatch<SetStateAction<boolean>>
    subject: Subject | null

}


export const EditSubjectModal: FC<Props> = ({ setShowModal, subject }) => {

    const res = useGetSubjectsQuery({page: 1, limit:  10,}) ;
    
    const {data: subjectResponse } = res
    
    const subjects = useMemo(() => subjectResponse?.data || [], [subjectResponse]);

    const [editSubject] = useEditSubjectMutation();

    console.log(res);
    
    const {
        handleSubmit,
        errors,
        touched,
        resetForm,
        getFieldProps } = useFormik({
            initialValues: {
                name: subject?.name,
                clave: subject?.clave
            },
            onSubmit: async (values) => {
                const id = subject?.id;
                if (id) {
                    const { isConfirmed } = await Swal.fire({
                        title: '¿Estás seguro?',
                        text: `Se editará la información de la materia`,
                        confirmButtonText: '¡Si, actualizar!',
                        confirmButtonColor: '#20968E',
                        showCancelButton: true,
                        cancelButtonText: '¡No, cancelar!',
                        cancelButtonColor: '#f23e3e',
                    })

                    if (!isConfirmed) return;
                    
                    const result = await editSubject({id, ...values});
                    console.log(result);
                    resetForm();
                    setShowModal(false);
                }

            },
            validationSchema: Yup.object({
                name: Yup.string()
                    .required('Este campo es requerido.'),
                clave: Yup.string()
                    .required('Este campo es requerido.'),
            }),

        })


  return (
    
    <div className="modal" tabIndex={-1} style={{ display: 'block', background: 'rgba(0,0,0,.5)' }}>
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Editar Materia</h5>
                        <button
                            type="button"
                            className="btn-close btn-outline-secondary"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={() => setShowModal(false)}></button>
                    </div>
                    <div className="modal-body">
                        <form
                            noValidate
                            onSubmit={handleSubmit}
                            autoComplete='off'
                            className="row mb-5">
                            <div className=" mt-3">
                                <label className="btn-outline-secondary">Materia</label>
                                <input
                                    type="text"
                                    {...getFieldProps('name')}
                                    className="form-control mt-2"
                                    autoComplete="off"
                                />
                                {touched.name && errors.name && <span className="text-danger">{errors.name}</span>}

                            </div>
                            <div className=" mt-3">
                                <label className="btn-outline-secondary">Clave</label>
                                <input
                                    type="text"
                                    {...getFieldProps('clave')}
                                    className="form-control mt-2"
                                    autoComplete="off"
                                />
                                {touched.clave && errors.clave && <span className="text-danger">{errors.clave}</span>}

                            </div>



                            <div className="text-end mt-4">
                                <button
                                    type='submit'
                                    className="btn btn-primary">Guardar</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default EditSubjectModal