import { useMemo, useState } from "react";
import { CarrerList, CreateCarrerModal, EditCarrerModal } from "../../../components/carrer";
import { Paginator } from "../../../components/shared/Paginator";
import { useGetCareersQuery, useSearchCareersQuery } from "../../../../services/api/providers/careerApi";
import { Career } from "../../../../interfaces/career";

export const CarrerPage = () => {
    const [showModalCreate, setShowModalCreate] = useState<boolean>(false);
    const [showEditCareerModal, setShowEditCareerModal] = useState(false);
    const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
    const [page, setPage] = useState<number>(1)
    const [searchKeyword, setSearchKeyword] = useState<string>("");
    

    const res = (!searchKeyword) ? useGetCareersQuery({page: page, limit:  10,}) : useSearchCareersQuery ({page: page, limit:  10, keyword: searchKeyword},{skip:!searchKeyword});
    
    const {data: careerResponse } = res
    
    const careers = useMemo(() => careerResponse?.data || [], [careerResponse]);

    console.log(res);
    console.log("------------------------------------------------")
    console.log(careerResponse);



    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchKeyword(event.target.value);
        

    };

    return (
        <div className="p-2">


            {
                showModalCreate && <CreateCarrerModal setShowModal={setShowModalCreate} />
            }

            {
                showEditCareerModal && <EditCarrerModal setShowModal={setShowEditCareerModal} career={selectedCareer} />
            }

            <div className="card container p-2">
                <div className="d-flex flex-row">
                    <div className="input-group p-2">
                        <input
                            type="text"
                            className="form-control"
                            aria-label="Text input with dropdown button"
                            value={searchKeyword}
                            onChange={handleSearchChange}
                            placeholder="Buscar por carrera o clave"
                        />
                    </div>
                    <button type="button"
                        className="btn btn-primary m-2"
                        onClick={() => setShowModalCreate(true)}>
                         Nueva carrera <i className="fa-solid fa-plus"></i> 
                    </button>

                </div>
            </div>


            <CarrerList 
                careers={careers} 
                onCareerClick={(career) => {
                    setSelectedCareer(career);
                    setShowEditCareerModal(true);
                  }}
          />
                    
            {
                (!careerResponse)
                ?
                <></>
                :
                careerResponse!.total > 20 &&
                (
                    <Paginator
                        currentPage={page}
                        totalResults={careerResponse!.total}
                        setCurrentPage={(page: number) => setPage(page)} />
                )
                    
            }
        </div>
    );
}