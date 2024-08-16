
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useGetSpecialtiesQuery, useSearchSpecialtyQuery } from "../../../services/api/providers/specialtyApi";
import Loading from "../../components/shared/Loading";
import { CreateSpecialtyModal } from "../../components/specialty/CreateSpecialityModal";
import Select from "../../components/shared/Select";
import SearchBarWithButton from "../../components/shared/SearchBarWithButton";
import Button from "../../components/shared/Button";
import { SpecialtyList } from "../../components/specialty/SpecialtyList";
import { useGetPlansQuery, useSearchPlansByCareerQuery, useSearchPlansQuery } from "../../../services/api/providers/planApi";
import { useGetCareersQuery, useSearchCareersQuery } from "../../../services/api/providers/careerApi";
import { CreatePlanModal } from "../../components/plan/CreatePlanModal";
import { PlanList } from "../../components/plan/planList";
import { Career } from "../../../interfaces/career";



export const PlanPage = () => {

    const [page, setPage] = useState<number>(1);
    const [selectedCareer, setSelectedCareer] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [showCreatePlanModal, setShowCreatePlanModal] = useState<boolean>(false);
  
  
    const planRes = (!searchQuery && !selectedCareer) ? 
                      useGetPlansQuery({page: page, limit:  10}) 
                    : 
                      selectedCareer
                        ?
                          searchQuery
                            ?
                              useSearchPlansQuery({page: page, limit:  10, keyword: searchQuery, career_id: selectedCareer},{skip:!searchQuery})
                            :
                              useSearchPlansByCareerQuery({page: page, limit:  10, career_id: selectedCareer})
                        :
                          useSearchPlansQuery({page: page, limit:  10, keyword: searchQuery},{skip:!searchQuery});

    const {data: planResponse } = planRes;
    const plans = useMemo(() => planResponse?.data || [], [planResponse]);
    console.log(planRes);

    
    const careerRes = useGetCareersQuery({page: page, limit:  10,});
    const {data: careerResponse} = careerRes;
    const careers = useMemo(()=> careerResponse?.data || [], [careerResponse])
    console.log(careerRes);

    /*
    if (planRes.status === 'pending') {
      return <Loading></Loading>;
    }
      */
  
    return (
      <>
  
        {showCreatePlanModal && (
          <CreatePlanModal setShowModal={setShowCreatePlanModal} careers={careers} />
        )}
  
        
  
        <div className='d-flex flex-column p-5 gap-4'>
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
              <Select.Option key= '0' value=''>Todas las Carreras</Select.Option>
              {careers
                ? 
                  careers.map((career: Career) => (
                    <Select.Option key={career.id} value={career.id}>{career.name}</Select.Option>
                  ))
                :
                  <></>
              }
  
              
            </Select>
          </div>
  
          <SearchBarWithButton query={searchQuery} setQuery={setSearchQuery} placeholder='Buscar'>
            <Button
              className='d-flex align-items-center'
              onClick={() => setShowCreatePlanModal(true)}
            >
              Nuevo Plan de Estudios <i className='fa-solid fa-plus'></i>
            </Button>
  
          </SearchBarWithButton>
  
          <PlanList plans={plans} isFetching={planRes.isFetching} />
  
         
        </div>
      </>
    );
  }
  