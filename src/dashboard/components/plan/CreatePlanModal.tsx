import { Dispatch, FC, SetStateAction } from "react"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Select from "../shared/Select";
import { Plan } from "../../../interfaces/plan";
import { useAddPlanMutation } from "../../../services/api/providers/planApi";
import { Career } from "../../../interfaces/career";
import Swal from "sweetalert2";

interface Props {
    setShowModal: Dispatch<SetStateAction<boolean>>,
    careers: Career[]
    
}   

    export const CreatePlanModal: FC<Props> = ({ setShowModal, careers}) => {

    
    const [createPlan, result] = useAddPlanMutation();
    

    const {values,
        handleSubmit,
        errors,
        touched,
        resetForm,
        getFieldProps } = useFormik({
            initialValues: {
                name: '',
                career_id: '',
            },
            onSubmit: async (values) => {

                if(values.career_id === '0'){
                    await Swal.fire({
                        icon: 'warning',
                        title: 'FORMULARIO INCOMPLETO',
                        text: `Seleccione una carrera`,
                        closeButtonAriaLabel: 'Entendido'
                        }   
                    )
                }
                else{
                    console.log(values)
                    const res = createPlan({career_id: +values.career_id, name: values.name});
                    console.log(res);
                    console.log(result);
                    resetForm();
                    setShowModal(false)
                }
                
            },
            validationSchema: Yup.object({
                name: Yup.string()
                    .required('Este campo es requerido.'),
                career_id: Yup.string()
                    .required('Este campo es requerido.'),
            }),

        })



    return (
        <div className="modal" tabIndex={-1} style={{ display: 'block', background: 'rgba(0,0,0,.5)' }}>
            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Crear Plan de Estudios</h5>
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
                            <div className=" mt-3 mb-3">
                                <label className="btn-outline-secondary">Nombre del Plan</label>
                                <input
                                    type="text"
                                    {...getFieldProps('name')}
                                    className="form-control mt-2"
                                    autoComplete="off"
                                />
                                {touched.name && errors.name && <span className="text-danger">{errors.name}</span>}

                            </div>
                            
                            <div className=' mt-3 mb-3'>
                                <label className="btn-outline-secondary" htmlFor='plans'>Carreras Disponibles</label>
                                <select className='form-select mt-2' {...getFieldProps('career_id')} aria-label='Carreras Disponibles'>
                                    <option key={'0'} value={'0'}>Seleccione una carrera</option>
                                    {careers.map((resp: Career) => (
                                        <option key={resp.id} value={resp.id}>{resp.name}</option>
                                    ))}
                                </select>
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
