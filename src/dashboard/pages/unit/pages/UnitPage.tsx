import { useMemo, useState } from "react";
import { CreateUnitModal, UnitList } from "../../../components/unit";
import { Paginator } from "../../../components/shared/Paginator";
import { useGetUnitsQuery, useSearchUnitsQuery } from "../../../../services/api/providers/unitApi";


export const UnitPage = () => {
    
    const [page, setPage] = useState<number>(1)
    const [searchKeyword, setSearchKeyword] = useState<string>("");
    const [showModalCreate, setShowModalCreate] = useState<boolean>(false);
    

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchKeyword(event.target.value);
    };

    const res = (!searchKeyword) ? useGetUnitsQuery({page: page, limit:  10,}) : useSearchUnitsQuery ({page: page, limit:  10, keyword: searchKeyword},{skip:!searchKeyword});
    const {data: unitResponse } = res;

    const units = useMemo(() => unitResponse?.data || [], [unitResponse]);

    console.log(res);
    console.log("------------------------------------------------")
    console.log(unitResponse);

    return (
        <div className="p-5">

            {
                showModalCreate && <CreateUnitModal setShowModal={setShowModalCreate} />
            }

            <div className="card container p-2">
                <div className="d-flex flex-row">
                    <div className="input-group p-2">
                        <input
                            type="text"
                            placeholder="Buscar..."
                            aria-label="Text input with dropdown button"
                            className="form-control"
                            value={searchKeyword}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <button type="button"
                        className="btn btn-primary"
                        onClick={() => setShowModalCreate(true)}>
                        Nueva unidad <i className="fa-solid fa-school"></i>
                    </button>

                </div>
            </div>
            <div className="d-flex justify-content-center mt-4 mb-5">
                <UnitList units={units}/>
            </div>


            {
                (!unitResponse)
                ?
                <></>
                :
                unitResponse.total > 10 &&
                (
                    <Paginator
                        currentPage={page}
                        totalResults={unitResponse!.total}
                        setCurrentPage={(page: number) => setPage(page)} />
                )
            }

        </div>
    );
}