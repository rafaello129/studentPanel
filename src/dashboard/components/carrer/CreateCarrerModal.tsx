import { Dispatch, FC, SetStateAction, useState } from "react"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAddCareerMutation } from "../../../services/api/providers/careerApi";

interface Props {
    setShowModal: Dispatch<SetStateAction<boolean>>
}

export const CreateCarrerModal: FC<Props> = ({ setShowModal }) => {
    const[isLoading, setIsLoading] = useState<boolean>(false)
    const [createCareer] = useAddCareerMutation();

    const {
        handleSubmit,
        errors,
        touched,
        resetForm,
        getFieldProps } = useFormik({
            initialValues: {
                name: '',
                key: '',
                semester: '',
            },
            onSubmit: async (values) => {
                setIsLoading(true)
                const res = await createCareer(values);
                console.log(res);
                resetForm();
                setIsLoading(false)
                setShowModal(false)
            },
            validationSchema: Yup.object({
                name: Yup.string()
                    .required('Este campo es requerido.'),
                key: Yup.string()
                    .required('Este campo es requerido.'),
                semester: Yup.string()
                    .required('Este campo es requerido.'),
            }),

        })



    return (
        <div className="modal" tabIndex={-1} style={{ display: 'block', background: 'rgba(0,0,0,.5)' }}>
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Agregar carrera</h5>
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
                                <label className="btn-outline-secondary">Carrera</label>
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
                                    {...getFieldProps('key')}
                                    className="form-control mt-2"
                                    autoComplete="off"
                                />
                                {touched.key && errors.key && <span className="text-danger">{errors.key}</span>}

                            </div>
                            <div className=" mt-3">
                                <label className="btn-outline-secondary">No. Semestres</label>
                                <input
                                    type="text"
                                    {...getFieldProps('semester')}
                                    className="form-control mt-2"
                                    autoComplete="off"
                                />
                                {touched.semester && errors.semester && <span className="text-danger">{errors.semester}</span>}

                            </div>



                            <div className="text-end mt-4">
                                <button
                                    type='submit'
                                    className="btn btn-primary">
                                    {isLoading ? 'Guardando...' : 'Guardar'}

                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>)


}
