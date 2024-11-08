
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
import Pagination from "../../components/shared/Pagination";



export const PlanPage = () => {

    const [page, setPage] = useState<number>(1);
    const [selectedCareer, setSelectedCareer] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [showCreatePlanModal, setShowCreatePlanModal] = useState<boolean>(false);

    const limit = 10;

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
  };

  
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

    const totalPlans = planResponse?.total || 0;

    
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
  
        
  
        <div className='d-flex flex-column gap-4'>
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
                      onClick={() => setShowCreatePlanModal(true)}
                    >
                        Nuevo Plan de Estudios <i className='fa-solid fa-plus'></i>
                    </Button>
                </div>
            </div>


  
          <PlanList plans={plans} isFetching={planRes.isFetching} />
              
          <Pagination
                currentPage={page}
                pageSize={limit}
                totalCount={totalPlans}
                onPageChange={setPage}
                className='justify-content-center'
            />
         
        </div>
      </>
    );
  }
  