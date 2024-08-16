import { Dispatch, FC, SetStateAction } from "react"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAddSubjectMutation } from "../../../services/api/providers/subjectsApi";



interface Props {
    setShowModal: Dispatch<SetStateAction<boolean>>
}   

    export const CreateSubjectModal: FC<Props> = ({ setShowModal}) => {

    const [createSubject, result] = useAddSubjectMutation();
    

    const {
        handleSubmit,
        errors,
        touched,
        resetForm,
        getFieldProps } = useFormik({
            initialValues: {
                name: '',
                clave: '',
            },
            onSubmit: async (values) => {
                console.log(values)
                const res = await createSubject(values);
                console.log(res);
                console.log(result);
                resetForm();
                setShowModal(false)
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
            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Agregar Materia</h5>
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
                                <label className="btn-outline-secondary">Nombre de la materia</label>
                                <input
                                    type="text"
                                    {...getFieldProps('name')}
                                    className="form-control mt-2"
                                    autoComplete="off"
                                />
                                {touched.name && errors.name && <span className="text-danger">{errors.name}</span>}

                            </div>
                            <div className=" mt-3">
                                <label className="btn-outline-secondary">Clave de la Materia</label>
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
        </div>)


}
