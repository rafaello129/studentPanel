import { useMemo, useState, Dispatch, useEffect, SetStateAction, FC } from 'react';
import { usePageQueryParams } from '../../../hooks/usePageQueryParams';
import { AppDispatch, RootState } from '../../../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../components/shared/Loading';
import { CreateSpecialtyModal } from '../../../components/specialty/CreateSpecialityModal';
import EditClassModal from '../../../components/class/EditClassModal';
import { Specialty } from '../../../../interfaces/specialty';
import EditSpecialtyModal from '../../../components/specialty/EditSpecialityModal';
import Select from '../../../components/shared/Select';
import { Plan } from '../../../../interfaces/plan';
import SearchBarWithButton from '../../../components/shared/SearchBarWithButton';
import Button from '../../../components/shared/Button';
import { SpecialtyList } from '../../../components/specialty/SpecialtyList';
import Pagination from '../../../components/shared/Pagination';

import { useGetSpecialtiesQuery, useSearchSpecialtyQuery } from '../../../../services/api/providers/specialtyApi';
import { useGetPlansQuery, useSearchPlansQuery } from '../../../../services/api/providers/planApi';
import { useGetCareersQuery } from '../../../../services/api/providers/careerApi';

interface props{
}

export const SpecialtyPage: FC<props> = () => {

  const [page, setPage] = useState<number>(1);
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const [selectedCareer, setSelectedCareer] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [showCreateSpecialtyModal, setShowCreateSpecialtyModal] = useState<boolean>(false);

  

  const specialtyRes = (!searchQuery) ? useGetSpecialtiesQuery({page: page, limit:  10,}) : useSearchSpecialtyQuery({page: page, limit:  10, keyword: searchQuery},{skip:!searchQuery});
  const {data: specialtyResponse } = specialtyRes
  const specialties = useMemo(() => specialtyResponse?.data || [], [specialtyResponse]);
  console.log(specialtyRes);


  const planRes = useGetPlansQuery({page: page, limit:  10,}) ;
  const {data: planResponse} = planRes
  const plans = useMemo(() => planResponse?.data || [], [planResponse]);
  console.log(planResponse);

  const careerRes = useGetCareersQuery({page: page, limit:  10,});
    const {data: careerResponse} = careerRes;
    const careers = useMemo(()=> careerResponse?.data || [], [careerResponse])
    console.log(careerRes);

  /*
  if (specialtyRes.isLoading) {
    return <Loading />;
  }
  */

  return (
    <>

      {showCreateSpecialtyModal && (
        <CreateSpecialtyModal setShowModal={setShowCreateSpecialtyModal} plans={plans}/>
      )}

      

      <div className='d-flex flex-column p-2 gap-4'>
        
        {
          /*

        <div className='col-md-6'>
          <label htmlFor='package'>Selecciona una carrera</label>

          <Select
            name='career'
            id='career'
            onChange={(e) => {
              setSelectedPlan(+e.target.value);
              setPage(1);
            }}
          >
            <Select.Option value='0'>Todas las Carreras</Select.Option>

            {
              careers ? 
              careers.map((crs) => (
                <Select.Option key={crs.id} value={crs.id}>
                  {crs.name}
                </Select.Option>
              ))
              :
              <></>
            }
          </Select>
        </div>
        */
      }

        <SearchBarWithButton query={searchQuery} setQuery={setSearchQuery} placeholder='Buscar'>
          <Button
            className='d-flex align-items-center'
            onClick={() => setShowCreateSpecialtyModal(true)}
          >
            Nuevo Plan de Especialidad <i className='fa-solid fa-plus'></i>
          </Button>

        </SearchBarWithButton>

        <SpecialtyList specialties={specialties} isLoading={specialtyRes.isLoading} plans={plans} />

       
      </div>
    </>
  );
}
