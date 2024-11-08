import { useMemo, useState } from "react";
import question from '../../../../assets/icons/question.svg';
import { CreateSubjectModal } from "../../../components/subjects/createSubjectModal";
import { GeneralSubjectList } from '../../../components/subjects/generalSubjectsList';
import { useGetSubjectsQuery, useSearchSubjectsQuery } from "../../../../services/api/providers/subjectsApi";
import Pagination from "../../../components/shared/Pagination";

function GeneralSubjectPage() {
    const [page, setPage] = useState<number>(1);
    const [searchKeyword, setSearchKeyword] = useState<string>("");
    const [showModalCreate, setShowModalCreate] = useState<boolean>(false);
    const limit = 10;

    const res = (!searchKeyword) 
        ? useGetSubjectsQuery({ page, limit }) 
        : useSearchSubjectsQuery({ page, limit, keyword: searchKeyword }, { skip: !searchKeyword });


    const { data: subjectResponse } = res;
    const subjects = useMemo(() => subjectResponse?.data || [], [subjectResponse]);
    const totalSubjects = subjectResponse?.total || 0; // Total de materias para la paginación


    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchKeyword(event.target.value);
    };

    return (
        <div className="p-2">
            {showModalCreate && (
                <CreateSubjectModal setShowModal={setShowModalCreate} />
            )}
           
            <div className="card container p-2">
                <div className="d-flex flex-row">
                    <div className="input-group p-2">
                        <input
                            type="text"
                            className="form-control"
                            aria-label="Text input with dropdown button"
                            value={searchKeyword}
                            onChange={handleSearchChange}
                            placeholder="Buscar por materia o clave"
                        />
                    </div>

                    <button type="button" className="btn btn-outline-success btn-add-subject" onClick={() => setShowModalCreate(true)}>
                        <span>Agregar materia</span>
                        <i className="fa-regular fa-square-plus me-2"></i>
                    </button>
                </div>
            </div>

            <GeneralSubjectList subjects={subjects} isLoading={res.isLoading} />

            {/* Renderiza el componente de paginación */}
            <Pagination
                currentPage={page}
                pageSize={limit}
                totalCount={totalSubjects}
                onPageChange={setPage}
                className='justify-content-center'
            />
        </div>
    );
}

export default GeneralSubjectPage;
