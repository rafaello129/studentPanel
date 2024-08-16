import { Dispatch, FC, SetStateAction, useState } from "react"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import esconder from '../../../assets/esconder.png'
import ver from '../../../assets/ver.png'

interface Props {
  setShowModal: Dispatch<SetStateAction<boolean>>
}

export const PasswordUserModal: FC<Props> = ({ setShowModal }) => {
  const [showPwd, setShowPwd] = useState(false);
  const [showPwdTwo, setShowPwdTwo] = useState(false);


  const {
    handleSubmit,
    errors,
    touched,
    resetForm,
    getFieldProps } = useFormik({
      initialValues: {
        password: '',
        confirm_password: ''
      },
      onSubmit: async ({ password }) => {

        const { isConfirmed } = await Swal.fire({
          title: '¿Estás seguro?',
          text: `Se cambiará la contraseña del Usuario.`,
          confirmButtonText: '¡Si, actualizar!',
          confirmButtonColor: '#20968E',
          showCancelButton: true,
          cancelButtonText: '¡No, cancelar!',
          cancelButtonColor: '#f23e3e',
        })

        if (!isConfirmed) return;


        resetForm();
        setShowModal(false);

      },
      validationSchema: Yup.object({
        password: Yup.string()
          .min(6, 'Mínimo 6 carácteres.')
          .matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'La contraseña debe tener al menos una mayúscula, letras minusculas y al menos un número' })
          .required('Este campo es requerido.'),
        confirm_password: Yup.string()
          .required('Este campo es requerido.')
          .oneOf([Yup.ref('password')], 'Las contraseña no coinciden')
      }),

    })


  return (
    <div className="modal" style={{ display: 'block', background: 'rgba(0,0,0,.5)' }} tabIndex={-1} role="dialog">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{}</h5>
            <button
              type="button"
              className="btn btn-outline-secondary"
              data-dismiss="modal"
              onClick={() => setShowModal(false)}><i className="fa-solid fa-xmark"></i></button>
          </div>
          <div className="modal-body">


            <form noValidate
              autoComplete='off'
              onSubmit={handleSubmit}
              className="row mb-5">

              <div className="position-relative col-md-12 mt-3">
                <label>Contraseña</label>
                <input
                  type={showPwd ? "text" : "password"}
                  placeholder="Contraseña"
                  className="form-control mt-2"
                  {...getFieldProps('password')}
                  autoComplete="off"
                />
                <button
                  className='position-absolute top-50 end-0 me-3 my-3 translate-middle-y btn'
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}>
                  {showPwd ? <img src={ver} width={25} /> : <img src={esconder} width={25} />}
                </button>
              </div>
              {touched.password && errors.password && <span className="text-danger">{errors.password}</span>}



              <div className="position-relative col-md-12 mt-3">
                <label>Confirma contraseña</label>
                <input
                  type={showPwdTwo ? "text" : "password"}
                  placeholder="Contraseña"
                  className="form-control mt-2"
                  {...getFieldProps('confirm_password')}
                  autoComplete="off"
                />
                <button
                  className='position-absolute top-50 end-0 me-3 my-3 translate-middle-y btn'
                  type="button"
                  onClick={() => setShowPwdTwo(!showPwdTwo)}>
                  {showPwdTwo ? <img src={ver} width={25} /> : <img src={esconder} width={25} />}
                </button>
              </div>
              {touched.confirm_password && errors.confirm_password && <span className="text-danger">{errors.confirm_password}</span>}


              <div className="text-end mt-4">
                <button
                  type='submit'
                  className="btn btn-primary">Guardar cambios</button>
              </div>

            </form>

          </div>
        </div>
      </div>
    </div>
  )
}
