import { Dispatch, FC, SetStateAction } from "react"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Select from "../shared/Select";
import { useAddSpecialtyMutation } from "../../../services/api/providers/specialtyApi";
import { Plan } from "../../../interfaces/plan";
import Swal from "sweetalert2";


interface Props {
    setShowModal: Dispatch<SetStateAction<boolean>>,
    plans: Plan[]
    
}   

    export const CreateSpecialtyModal: FC<Props> = ({ setShowModal, plans}) => {

    
      const [createSpecialty, result] = useAddSpecialtyMutation();



    const {values,
        handleSubmit,
        errors,
        touched,
        resetForm,
        getFieldProps } = useFormik({
            initialValues: {
                name: '',
                plan_id: '',
            },
            onSubmit: async (values) => {
                
                
                if(values.plan_id === ''){
                    await Swal.fire({
                        icon: 'warning',
                        title: 'FORMULARIO INCOMPLETO',
                        text: `Seleccione un plan`,
                        closeButtonAriaLabel: 'Entendido'
                        }   
                    )
                }
                else{
                    console.log(values)
                    const res = await createSpecialty({plan_Id: +values.plan_id, name: values.name });
                    console.log(res);
                    console.log(result)
                    resetForm();
                    setShowModal(false)
                }
                
            },
            validationSchema: Yup.object({
                name: Yup.string()
                    .required('Este campo es requerido.'),
                plan_id: Yup.string()
                    .required('Este campo es requerido.'),
            }),

        })



    return (
        <div className="modal" tabIndex={-1} style={{ display: 'block', background: 'rgba(0,0,0,.5)' }}>
            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Agregar Plan de Especialidad</h5>
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
                                <label className="btn-outline-secondary">Nombre del Plan de Especialidad</label>
                                <input
                                    type="text"
                                    {...getFieldProps('name')}
                                    className="form-control mt-2"
                                    autoComplete="off"
                                />
                                {touched.name && errors.name && <span className="text-danger">{errors.name}</span>}

                            </div>
                            <label className= "mt-3" htmlFor='plans'>Planes Disponibles</label>
                            
                            <div className="mt-3 mb-3">

                                <Select 
                                    
                                    id='plan'
                                    name='plan'
                                    {...getFieldProps('plan_id')}
                                    >
                                    <Select.Option value=''>Selecciona un plan de estudios</Select.Option>

                                    {
                                        plans ?
                                            plans.map((pln) => (
                                                <Select.Option key={pln.id} value={pln.id}>
                                                {pln.name}
                                                </Select.Option>
                                            ))
                                        :
                                            <></>
                                    }
                                </Select>


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
