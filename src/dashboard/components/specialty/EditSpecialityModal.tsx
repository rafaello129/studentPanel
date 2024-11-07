import { Dispatch, FC, SetStateAction } from "react"
import { Specialty } from "../../../interfaces/specialty";
import { useFormik } from 'formik';
import Swal from "sweetalert2";
import * as Yup from 'yup';
import Select from "../shared/Select";
import { Plan } from "../../../interfaces/plan";
import { useEditSpecialtyMutation } from "../../../services/api/providers/specialtyApi";

interface Props {
    setShowModal: Dispatch<SetStateAction<boolean>>
    specialty: Specialty | null
    plans: Plan[]
    
}


export const EditSpecialtyModal: FC<Props> = ({ setShowModal, specialty, plans}) => {

    
    const [editSpecialty, result] = useEditSpecialtyMutation();

    const {
        values,
        handleChange,
        handleSubmit,
        errors,
        touched,
        resetForm,
        getFieldProps } = useFormik({
            initialValues: {
                name: specialty?.name,
                planId: specialty?.plan?.id ,
                key: specialty?.key,
                isCurrent: specialty?.isCurrent,
                isDeleted: specialty?.isDeleted,
            },
            onSubmit: async () => {
                const id = specialty?.id;
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
                    console.log("Edit Specialty Values", values);
                    console.log("Mutation Result",result);
                    console.log("PlanID", values.planId);
                    console.log("PlanID", values.planId);
                    const patchResult = await editSpecialty({id, name: values.name, planId: values.planId, key: values.key, isCurrent: values.isCurrent, isDeleted: values.isDeleted});
                    console.log("Patch Result", patchResult);
                    resetForm();
                    setShowModal(false);
                }

            },
            validationSchema: Yup.object({
                name: Yup.string()
                    .required('Este campo es requerido.'),
                planId: Yup.number()
                    .required('El plan es requerido.'),
                key: Yup.string()
                    .required('La clave es necesaria'),
            }),

        })


  return (
    
    <div className="modal" tabIndex={-1} style={{ display: 'block', background: 'rgba(0,0,0,.5)' }}>
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Editar Plan de Especialidad</h5>
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
                                <label className="btn-outline-secondary">Nombre del plan de especialidad</label>
                                <input
                                    type="text"
                                    {...getFieldProps('name')}
                                    className="form-control mt-2"
                                    autoComplete="off"
                                />
                                {touched.name && errors.name && <span className="text-danger">{errors.name}</span>}

                            </div>


                            <div className=" mt-3">
                                <label className="btn-outline-secondary">Clave de la especialidad</label>
                                <input
                                    type="text"
                                    {...getFieldProps('key')}
                                    className="form-control mt-2"
                                    autoComplete="off"
                                />
                                {touched.key && errors.key && <span className="text-danger">{errors.key}</span>}

                            </div>


                            <div className="mt-3">

                                <label className="btn-outline-secondary mb-2">Plan Asignado</label>
                                <Select
                                    id='planId'
                                    name='planId'
                                    key={values.planId-1}
                                    onChange={handleChange}
                                    >
                                    {
                                        values.planId ?
                                                <Select.Option key={values.planId} value={values.planId}>{plans.find((pln)=>pln.id == values.planId).name}</Select.Option>
                                            :
                                            <Select.Option value="">Sin Asignar</Select.Option>
                                    }
                                    

                                    {
                                        plans?
                                                plans.map((pln) => (
                                                    
                                                    (values.planId && pln.id == values.planId  ) 
                                                        ?
                                                            <></>
                                                        :
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
        </div>
  )
}

export default EditSpecialtyModal