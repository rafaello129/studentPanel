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

import { useGetSpecialtiesQuery, useSearchSpecialtyByCareerQuery, useSearchSpecialtyQuery } from '../../../../services/api/providers/specialtyApi';
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
  const limit = 10;

  const specialtyRes = (!searchQuery && !selectedCareer) ? 
                            useGetSpecialtiesQuery({page: page, limit:  10,}) 
                          : 
                            selectedCareer
                              ?
                                searchQuery ?
                                    useSearchSpecialtyQuery({page: page, limit:  10, keyword: searchQuery, career_id:selectedCareer},{skip:!searchQuery})
                                  :
                                    useSearchSpecialtyByCareerQuery({page: page, limit:  10, career_id: selectedCareer})
                              :
                              useSearchSpecialtyQuery({page: page, limit:  10, keyword: searchQuery},{skip:!searchQuery});


                            
  const {data: specialtyResponse } = specialtyRes
  const specialties = useMemo(() => specialtyResponse?.data || [], [specialtyResponse]);
  console.log(specialtyRes);
  const totalSpecialties = specialtyResponse?.total || 0;


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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
};

  return (
    <>

      {showCreateSpecialtyModal && (
        <CreateSpecialtyModal setShowModal={setShowCreateSpecialtyModal} plans={plans}/>
      )}

      

      <div className='d-flex flex-column gap-4'>
        
        {
          

        <div className='col-md-6'>
          <label htmlFor='package'>Selecciona una carrera</label>

          <Select
            name='career'
            id='career'
            onChange={(e) => {
              setSelectedCareer(+e.target.value);
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
        
      }

        
<div className="card container p-2">
                <div className="d-flex flex-row">
                    <div className="input-group p-2">
                        <input
                            type="text"
                            className="form-control"
                            aria-label="Text input with dropdown button"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Buscar por plan o clave"
                        />
                    </div>

                    <Button
                      className='d-flex align-items-center'
                      onClick={() => setShowCreateSpecialtyModal(true)}
                    >
                      Nuevo Plan de Especialidad <i className='fa-solid fa-plus'></i>
                    </Button>

                </div>
            </div>


         
        

        <SpecialtyList specialties={specialties} isLoading={specialtyRes.isLoading} plans={plans} />

        <Pagination
                currentPage={page}
                pageSize={limit}
                totalCount={totalSpecialties}
                onPageChange={setPage}
                className='justify-content-center'
            />
       
      </div>
    </>
  );
}
