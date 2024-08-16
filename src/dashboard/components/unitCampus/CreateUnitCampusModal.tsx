import { Dispatch, FC, SetStateAction } from "react"
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface Props {
    setShowModal: Dispatch<SetStateAction<boolean>>
}

export const CreateUnitCampusModal: FC<Props> = ({ setShowModal }) => {

    const {
        handleSubmit,
        errors,
        touched,
        resetForm,
        getFieldProps } = useFormik({
            initialValues: {
                nameUnitCampus: '',
                text1: '',
                text2: '',
            },
            onSubmit: async (values) => {

                console.log(values);
                resetForm();
                setShowModal(false)

            },
            validationSchema: Yup.object({
                nameUnitCampus: Yup.string()
                    .required('Este campo es requerido.'),
                text1: Yup.string()
                    .required('Este campo es requerido.'),
                text2: Yup.string()
                    .required('Este campo es requerido.'),
            }),

        })



    return (
        <div className="modal" tabIndex={-1} style={{ display: 'block', background: 'rgba(0,0,0,.5)' }}>
            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                <div className="modal-content">
                    
                    <div className="modal-header">
                        <h5 className="modal-title">Agregar Unidad</h5>
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
                                <label className="btn-outline-secondary">Nombre Unidad</label>
                                <input
                                    type="text"
                                    placeholder="Nombre Unidad"
                                    {...getFieldProps('nameUnitCamp')}
                                    className="form-control mt-2"
                                    autoComplete="off"
                                />
                                {touched.nameUnitCampus && errors.nameUnitCampus && <span className="text-danger">{errors.nameUnitCampus}</span>}

                            </div>
                            <div className="col-md-5 mt-3">
                                <label className="btn-outline-secondary">text1</label>
                                <select
                                    className="form-select mt-2"
                                    aria-label="Default select example"
                                    {...getFieldProps('text1')}
                                >
                                    <option value="">Seleccione una unidad</option>
                                    <option value="1">PANTERA</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                                {touched.text1 && errors.text1 && <span className="text-danger">{errors.text1}</span>}

                            </div>
                            <div className="col-md-5 mt-3">
                                <label className="btn-outline-secondary">text2</label>
                                <input
                                    type="text"
                                    placeholder="Numero de semestres"
                                    className="form-control mt-2"
                                    {...getFieldProps('text2')}
                                    autoComplete="off"
                                />
                                {touched.text2 && errors.text2 && <span className="text-danger">{errors.text2}</span>}

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
