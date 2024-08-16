import { Dispatch, FC, SetStateAction, useMemo } from "react"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Subject } from "../../../interfaces/subject";
import Swal from "sweetalert2";
import {  useEditSubjectMutation, useGetSubjectsQuery } from "../../../services/api/providers/subjectsApi";
import { Plan } from "../../../interfaces/plan";
import { useEditPlanMutation } from "../../../services/api/providers/planApi";


interface Props {
    setShowModal: Dispatch<SetStateAction<boolean>>
    plan: Plan | null

}


export const EditPlanModal: FC<Props> = ({ setShowModal, plan }) => {

    
    const [editPlan, result] = useEditPlanMutation();


    const {
        handleSubmit,
        errors,
        touched,
        resetForm,
        getFieldProps } = useFormik({
            initialValues: {
                name: plan?.name,
            },
            onSubmit: async (values) => {
                const id = plan?.id;
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
                    
                    await editPlan({id, ...values});
                    console.log(result);
                    resetForm();
                    setShowModal(false);
                }

            },
            validationSchema: Yup.object({
                name: Yup.string()
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
                                <label className="btn-outline-secondary">Plan</label>
                                <input
                                    type="text"
                                    {...getFieldProps('name')}
                                    className="form-control mt-2"
                                    autoComplete="off"
                                />
                                {touched.name && errors.name && <span className="text-danger">{errors.name}</span>}

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

export default EditPlanModal;