
import { Dispatch, FC, SetStateAction, useState } from 'react'
import Swal from 'sweetalert2'
import { useEditUnitMutation } from '../../../services/api/providers/unitApi'



interface Props {
  isActive?: boolean,
  unitId?: number,
  setIsLoading: Dispatch<SetStateAction<boolean>>
}

export const SwitchControl: FC<Props> = ({ isActive = false, unitId, setIsLoading }) => {

  const [value, setValue] = useState<boolean>(!isActive)
  const [editUnit] = useEditUnitMutation();

  const handleOnChange = async () => {
    if (unitId === undefined) {
      return;
    }
    const { isConfirmed } = await Swal.fire({
      title: '¿Estás seguro?',
      text: `Se ${value ? 'habilitará' : 'deshabilitará'} la Unidad.`,
      confirmButtonText: `¡Si, ${value ? 'habilitar' : 'deshabilitar'}!`,
      confirmButtonColor: '#20968E',
      showCancelButton: true,
      cancelButtonText: '¡No, cancelar!',
      cancelButtonColor: '#f23e3e',
    })

    if (!isConfirmed) return;
    const formData = {
      isActive: value,
    };
    
    setIsLoading(true);
    const res = await editUnit({ id: unitId, isActive: formData.isActive });
    console.log(res);
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
        checked={!value ?? false} />
    </div>
  )
}
