import { useFormik } from 'formik';
import { useState } from "react";
import { AuthLayout } from "../layouts/AuthLayout";
import ver from './../../assets/ver.png';
import esconder from './../../assets/esconder.png';
import * as Yup from 'yup';
import { useCreateUserMutation } from '../../services/api/providers/userApi';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, logout, setIsLoading } from '../../store/auth/authSlice';
import { RootState } from '../../store/store';
import { useLoginMutation } from '../../services/api/providers/authProvider';

export const LoginForm: React.FC = () => {
    const [login] = useLoginMutation();
    const [createUser] = useCreateUserMutation();
    const [showPwd, setShowPwd] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoading = useSelector((state: RootState) => state.auth.isLoading);

    const {
        errors,
        touched,
        handleSubmit,
        getFieldProps,
        resetForm,
    } = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        onSubmit: async (values) => {
            dispatch(setIsLoading(true));
            try {
                const response = await login({ username: values.username, password: values.password }).unwrap();
                if (response.status) {
                    const userToCreate = {
                        username: response.user.username,
                        name: response.user.name,
                        lastName: response.user.lastName,
                        motherLastName: response.user.motherLastName,
                        picture: `${response.user.id}/${response.user.picture}`,
                        isActive: response.user.isActive
                    };
                    localStorage.setItem('token', response.access_token);
                    localStorage.setItem('user', JSON.stringify(response.user));
                    const tokenExpiration = new Date().getTime() + (60 * 60 * 1000); 
                    localStorage.setItem('tokenExpiration', tokenExpiration.toString());
                    try {
                        await createUser(userToCreate).unwrap();
                        console.log('User created/updated in PEESAD Lista');
                        Swal.fire({
                            icon: 'success',
                            title: 'Éxito',
                            text: 'Usuario autenticado con éxito.'
                        });
                        dispatch(loginSuccess(response));
                        navigate('/home');
                    } catch (error) {
                        console.error('Error creating/updating user:', error);
                        dispatch(logout());
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops!',
                            text: 'Error creating/updating user.'
                        });
                    }
                } else {
                    dispatch(logout());

                    Swal.fire({
                        icon: 'error',
                        title: 'Oops!',
                        text: response.message
                    });
                }
            } catch (error: any) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops!',
                    text: error.message
                });
            }
            dispatch(setIsLoading(false));
            resetForm();
        },
        validationSchema: Yup.object({
            username: Yup.string().min(6, 'Mínimo 6 caracteres.').required('Este campo es requerido'),
            password: Yup.string().min(6, 'Mínimo 6 caracteres').required("Este campo es Requerido")
        })
    });

    if (isLoading) {
        return (
            <div className="text-center p-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visualmente-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    return (
        <AuthLayout>
            <div className='d-flex flex-column align-items-center justify-content-center'>
                <form noValidate autoComplete='off' onSubmit={handleSubmit} >
                    <div className="mt-3">
                        <label className="btn-outline-secondary">Usuario</label>
                        <input
                            type="text"
                            {...getFieldProps('username')}
                            className="form-control form-control-lg mt-2"
                            autoComplete="off"
                        />
                        {touched.username && errors.username && <span className="text-danger">{errors.username}</span>}
                    </div>
                    <div className="position-relative mt-1">
                        <label htmlFor="inputPassword">Contraseña</label>
                        <input
                            id="inputPassword"
                            type={showPwd ? "text" : "password"}
                            className="form-control mt-1 form-control-lg"
                            {...getFieldProps('password')}
                        />
                        <button
                            className='position-absolute top-50 end-0 me-3 my-3 translate-middle-y btn'
                            type="button"
                            onClick={() => setShowPwd(!showPwd)}>
                            {showPwd ? <img src={ver} width={25} /> : <img src={esconder} width={25} />}
                        </button>
                    </div>
                    {touched.password && errors.password && <span className="text-danger">{errors.password}</span>}
                    <div className="d-grid gap-2 mt-2">
                        <button className="btn btn-primary btn-lg my-2" type="submit">
                            Iniciar Sesión
                        </button>
                    </div>
                </form>
            </div>
        </AuthLayout>
    )
}
