import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import defaultUserImage from "../../assets/icons/userpicture.png";
import { RootState } from "../../store/store";
import { logout } from "../../store/auth/authSlice";

export const Navbar = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const urlImage = import.meta.env.VITE_API_URL_AUTH;

    const handleLogout = () => {
        dispatch(logout());
        navigate('/auth/login');
    };

    return (
        <nav className="navbar navbar-expand navbar-light fixed-top shadow-sm">
            <div className="container-fluid">
                <a className="d-lg-none" data-bs-toggle="offcanvas" href="#offcanvasExample" aria-controls="offcanvasExample">
                    <i className="material-icons">menu</i>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link mt-2" href="/settings">
                                <i className="material-icons">settings</i>
                            </a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle d-flex align-items-center" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <img
                                    width={40}
                                    className="me-2 rounded-circle"
                                    src={user!.picture === "none" ? defaultUserImage : `${urlImage}/files/users/${user!.id}/${user!.picture}`}
                                    alt="User"
                                    onError={(e) => e.currentTarget.src = defaultUserImage}
                                    loading="lazy"
                                />
                                <div className='d-flex flex-column me-2'>
                                    <span style={{ fontSize: '14px'}}>{ user?.name } { user?.lastName }</span>
                                </div>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end shadow animate__animated animate__flipInY" aria-labelledby="navbarDropdown">
                                <li><a href="/profile" className="dropdown-item">Mi Perfil</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><button className="dropdown-item" onClick={handleLogout}><i className="material-icons me-2">logout</i>Cerrar sesión</button></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};
