import { Dispatch, FC, SetStateAction, useState } from 'react'
import Swal from 'sweetalert2'
import { useEditCareerMutation } from '../../../services/api/providers/careerApi'


interface Props {
  isActive?: boolean,
  careerId?: number,
  setIsLoading: Dispatch<SetStateAction<boolean>>
}

export const SwitchControl: FC<Props> = ({ isActive = false, careerId, setIsLoading }) => {

  const [value, setValue] = useState<boolean | undefined>(isActive)
  const [editCareer] = useEditCareerMutation();

  const handleOnChange = async () => {
    if (careerId === undefined) {
      return;
    }
    const { isConfirmed } = await Swal.fire({
      title: '¿Estás seguro?',
      text: `Se ${!value ? 'habilitará' : 'deshabilitará'} la carrera.`,
      confirmButtonText: `¡Si, ${!value ? 'habilitar' : 'deshabilitar'}!`,
      confirmButtonColor: '#20968E',
      showCancelButton: true,
      cancelButtonText: '¡No, cancelar!',
      cancelButtonColor: '#f23e3e',
    })

    if (!isConfirmed) return;
    const formData = {
      isActive: !value,
    };
    setIsLoading(true);
    await editCareer({ id: careerId, isActive: formData.isActive })
    setValue(old => !old);
    setIsLoading(false);

  }

  return (
    <div className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        role="switch"
        onChange={handleOnChange}
        checked={value ?? false} />
    </div>
  )
}
