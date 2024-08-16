import { Dispatch, FC, SetStateAction } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { useFormik } from "formik";
import * as Yup from 'yup';


interface Props {
    setShowModal: Dispatch<SetStateAction<boolean>>
}

export const CreateUsersModal: FC<Props> = ({ setShowModal }) => {
    const dispatch = useDispatch<AppDispatch>();

    const {
        handleSubmit,
        errors,
        touched,
        resetForm,
        getFieldProps } = useFormik({
            initialValues: {
                name: '',
                key: '',
            },
            onSubmit: async (values) => {
                resetForm();
                setShowModal(false)
            },
            validationSchema: Yup.object({
                name: Yup.string()
                    .required('Este campo es requerido.'),
                key: Yup.string()
                    .required('Este campo es requerido.'),
            }),

        })



    return (
        <div className="modal" tabIndex={-1} style={{ display: 'block', background: 'rgba(0,0,0,.5)' }}>
            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title"> <i className="fa-solid fa-user-plus me-2"></i> Agregar Usuario</h5>
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
                            <div className="col-md-5 mt-3">
                                <label className="btn-outline-secondary">Nombre</label>
                                <input
                                    type="text"
                                    {...getFieldProps('name')}
                                    className="form-control mt-2"
                                    autoComplete="off"
                                />
                                {touched.name && errors.name && <span className="text-danger">{errors.name}</span>}

                            </div>
                            <div className="col-md-3 mt-3">
                                <label className="btn-outline-secondary">Apellido paterno</label>
                                <input
                                    type="text"
                                    {...getFieldProps('key')}
                                    className="form-control mt-2"
                                    autoComplete="off"
                                />
                                {touched.key && errors.key && <span className="text-danger">{errors.key}</span>}

                            </div>
                            <div className="col-md-3 mt-3">
                                <label className="btn-outline-secondary">Apellido materno</label>
                                <input
                                    type="text"
                                    {...getFieldProps('key')}
                                    className="form-control mt-2"
                                    autoComplete="off"
                                />
                                {touched.key && errors.key && <span className="text-danger">{errors.key}</span>}

                            </div>
                            <div className="col-md-5 mt-3">
                                <label className="btn-outline-secondary">Tipo de usuario</label>
                                <select className="form-select mt-2" aria-label="Default select example">
                                    <option value="1">Administrativo</option>
                                    <option value="2">Tutor</option>
                                    <option value="3">Docente</option>
                                </select>
                            </div>
                            <div className="col-md-5 mt-3">
                                <label className="btn-outline-secondary">Especialidad</label>
                                <input
                                    type="text"
                                    {...getFieldProps('key')}
                                    className="form-control mt-2"
                                    autoComplete="off"
                                />
                                {touched.key && errors.key && <span className="text-danger">{errors.key}</span>}

                            </div>
                            <div className="col-md-5 mt-3">
                                <label className="btn-outline-secondary">Area</label>
                                <input
                                    type="text"
                                    {...getFieldProps('key')}
                                    className="form-control mt-2"
                                    autoComplete="off"
                                />
                                {touched.key && errors.key && <span className="text-danger">{errors.key}</span>}

                            </div>
                            <div className="col-md-5 mt-3">
                                <label className="btn-outline-secondary">Cargo</label>
                                <input
                                    type="text"
                                    {...getFieldProps('key')}
                                    className="form-control mt-2"
                                    autoComplete="off"
                                />
                                {touched.key && errors.key && <span className="text-danger">{errors.key}</span>}

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