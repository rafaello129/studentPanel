

import Swal from "sweetalert2";

export const showLoading = () => {
    return Swal.fire({
        html:
            ` 
        <div className='d-flex flex-column align-items-center justify-content-center'>

        <div className="text-center p-5">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
            </div>
        </div>
    </div>        `,
        customClass: {
            container: 'overflow-hidden',
            popup: 'overflow-hidden',
        },
        allowEscapeKey: false,
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: () => {
            console.log(Swal.getHtmlContainer()?.classList.add("overflow-hidden"));

        }
    })

}


export const showErrorMessage = (errorMessage: string) => {
    return Swal.fire({
        title: 'Oops!',
        text: errorMessage,
        icon: 'error',
        timer: 1000,
        showConfirmButton: false,
        allowEscapeKey: false,
        allowOutsideClick: false,
    })
}
export const showSuccessMessage = (message: string) => {
    return Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: message
    })
}