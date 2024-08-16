import { useState } from 'react';
import { EditUnitModal, SwitchControl } from '.';
import unitIcon from '../../../assets/icons/unit.png';
import { UnitCampus } from '../../../interfaces/unit-campus';
import question from '../../../assets/icons/question.svg';


type UnitListProps = {
  units: UnitCampus[];
};

export const UnitList = ({units}: UnitListProps) => {
  
  const [isLoading, setIsLoading] = useState<boolean>(false)
  
  const [showModalEdit, setShowModalEdit] = useState<boolean>(false);
  const [selectedUnit, setSelectedUnit] = useState<UnitCampus | null>(null);
 

  const handleSelectUnit = (selectedUnit: UnitCampus) => {
    setSelectedUnit(selectedUnit);
    setShowModalEdit(true);
  };




  if (units.length === 0) {
    return (
      <div className="mt-3 p-2 text-center">
        <div className="d-flex justify-content-center mt-5">
          <img src={question} alt="escudo-y-logo" width={180} style={{ borderRadius: 10 }} />
        </div>
        No hay unidades creadas.
      </div>
    );
  }

  return (
    <div className='accordion w-75' id='accordionExample'>
      {showModalEdit && (
        <EditUnitModal setShowModal={setShowModalEdit} unit={selectedUnit} />
      )}

      {units.map((unit: UnitCampus) => (
        <div className='accordion-item' key={unit.id}>
          <h2 className='accordion-header'>
            <button
              className='accordion-button'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target={`#unidad-${unit.id}`}
              aria-expanded='true'
              aria-controls={`unidad-${unit.id}`}
            >
              <div className='d-flex align-items-center'>
                <img
                  style={{ borderRadius: '100%' }}
                  width='35'
                  className='me-2'
                  src={unitIcon}
                  alt='unit image'
                />
                <span>
                  <strong>{unit.name} -</strong> {unit.key}{' '}
                </span>
              </div>
            </button>
          </h2>
          <div
            id={`unidad-${unit.id}`}
            className='accordion-collapse collapse'
            data-bs-parent='#accordionExample'
          >
            {' '}
            <div className='accordion-body'>
              <div className='d-flex  justify-content-between'>
                <div className='d-flex flex-column '>
                  <span className='mb-3'>
                    <strong>Nombre de la unidad:</strong> {unit.name}
                  </span>
                  <span className=''>
                    <strong>Jefe de la unidad: </strong>
                    {unit.boss}
                  </span>
                  <span className=''>
                    <strong>Clave: </strong>
                    {unit.key}
                  </span>
                  {/*<span className="">Tutor asignado: Mariana olivas</span> */}
                  <span className=''>
                    <strong>Ubicación:</strong> {unit.location}
                  </span>
                </div>
                <div className='d-flex flex-column  justify-content-evenly'>
                  <div className='form-check form-switch'>
                    <SwitchControl isActive={unit.isActive} unitId={unit.id} setIsLoading={setIsLoading} />
                    <label className='form-check-label'>
                      Deshabilitar / Habilitar
                    </label>
                  </div>

                  <button
                    type='button'
                    className='btn btn-secondary'
                    onClick={() => handleSelectUnit(unit)}
                  >
                    Editar datos
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {isLoading &&
                <div className='d-flex flex-column align-items-center justify-content-center'>

                    <div className="text-center p-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Cargando...</span>
                        </div>
                    </div>
                </div>
            }

    </div>
  );
};
