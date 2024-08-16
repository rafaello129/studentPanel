import { FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { AppDispatch } from '../../../store/store'



interface Props {
  isActive?: boolean,
  userId?: number,
}

export const SwitchControl: FC<Props> = ({ isActive = false, userId }) => {

  const [value, setValue] = useState<boolean | undefined>(isActive)
  const dispatch = useDispatch<AppDispatch>();

  const handleOnChange = async () => {
    if (userId === undefined) {
      return;
    }
    const { isConfirmed } = await Swal.fire({
      title: '¿Estás seguro?',
      text: `Se ${!value ? 'habilitará' : 'deshabilitará'} la cuenta del.`,
      confirmButtonText: `¡Si, ${!value ? 'habilitar' : 'deshabilitar'}!`,
      confirmButtonColor: '#20968E',
      showCancelButton: true,
      cancelButtonText: '¡No, cancelar!',
      cancelButtonColor: '#f23e3e',
    })

    if (!isConfirmed) return;
    const formData = {
      isActive: value,
    };
    
    setValue(old => !old);

  }

  return (
    <div className="form-check form-switch d-flex align-items-center justify-content-center">
      <input
        className="form-check-input"
        type="checkbox"
        role="switch"
        onChange={handleOnChange}
        checked={value ?? false} />
    </div>
  )
}
