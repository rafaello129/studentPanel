import { useMemo, useState } from "react";
import question from '../../../../assets/icons/question.svg';
import { CreateSubjectModal } from "../../../components/subjects/createSubjectModal";
import { GeneralSubjectList } from '../../../components/subjects/generalSubjectsList';
import { useGetSpecialitySubjectsQuery, useGetSubjectsQuery, useSearchSpecialtySubjectsQuery, useSearchSubjectsQuery } from "../../../../services/api/providers/subjectsApi";
import Pagination from "../../../components/shared/Pagination";
import { SpecialtySubjectList } from "../../../components/subjects/specialtySubjectList";
import { CreateSpSubjectModal } from "../../../components/subjects/createSpSubjectModal";

function GeneralSubjectPage() {
    const [searchKeyword, setSearchKeyword] = useState<string>("");
    const [searchKeyword2, setSearchKeyword2] = useState<string>("");
    const [showModalCreate, setShowModalCreate] = useState<boolean>(false);
    const [showModalCreate2, setShowModalCreate2] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const limit = 10;
    
    

    const [page2, setPage2] = useState<number>(1);
    const limit2 = 5;

    const res = (!searchKeyword) 
        ? useGetSubjectsQuery({ page, limit, specialty:false }) 
        : useSearchSubjectsQuery({ page, limit, keyword: searchKeyword }, { skip: !searchKeyword });
    const { data: subjectResponse } = res;
    const subjects = useMemo(() => subjectResponse?.data || [], [subjectResponse]);
    const totalSubjects = subjectResponse?.total || 0; // Total de materias para la paginación

    
    console.log(page === page2)

    const ressp = (!searchKeyword2) 
    ? useGetSpecialitySubjectsQuery({ page: page2, limit: limit2, specialty: true  }) 
    : useSearchSpecialtySubjectsQuery({ page: page2, limit: limit2, keyword: searchKeyword2}, { skip: !searchKeyword2 });
    const { data: subjectspResponse } = ressp;
    const subjectssp = useMemo(() => subjectspResponse?.data || [], [subjectspResponse]);
    const totalspSubjects = subjectspResponse?.total || 0; // Total de materias para la paginación

    console.log("subjectResponse",res)
    console.log("specialtySubjectResponse",ressp)

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchKeyword(event.target.value);
    };
    const handleSearchChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchKeyword2(event.target.value);
    };

    return (
        <div className="p-2">
            {showModalCreate && (
                <CreateSubjectModal setShowModal={setShowModalCreate} />
            )}
            {showModalCreate2 && (
                <CreateSpSubjectModal setShowModal={setShowModalCreate2} />
            )}
        <div>

            <div className="card container p-2 mb-2">
                <div className="card-header text-center bg-primary text-bg-primary fw-medium">
                    MATERIAS GENERALES
                </div>
                <div className="d-flex flex-row mt-2">
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
                        <span>Crear Materia</span>
                        <i className="fa-regular fa-square-plus me-2"></i>
                    </button>
                </div>
                <GeneralSubjectList subjects={subjects} isLoading={res.isLoading} />
                
            </div>
            <Pagination
                currentPage={page}
                pageSize={limit}
                totalCount={totalSubjects}
                onPageChange={(newPage) => setPage(newPage)}
                className='justify-content-center'
            />

        </div>
        <div>

            <div className="card container p-2 mt-4 mb-2">
                 <div className="card-header text-center bg-primary text-bg-primary fw-medium">
                    MATERIAS DE ESPECIALIDAD
                </div>
                <div className="d-flex flex-row mt-2">
               
                    <div className="input-group p-2">
                        <input
                            type="text"
                            className="form-control"
                            aria-label="Text input with dropdown button"
                            value={searchKeyword2}
                            onChange={handleSearchChange2}
                            placeholder="Buscar por materia o clave"
                        />
                    </div>

                    <button type="button" className="btn btn-outline-success btn-add-subject" onClick={() => setShowModalCreate2(true)}>
                        <span>Crear Materia </span>
                        <i className="fa-regular fa-square-plus me-2"></i>
                    </button>
                </div>
                <SpecialtySubjectList subjects={subjectssp} isLoading={ressp.isLoading}  />
            </div>


            {/* Renderiza el componente de paginación */}
            <Pagination
            currentPage={page2}
            pageSize={limit2}
            totalCount={totalspSubjects}
            onPageChange={(newPage) => setPage2(newPage)}
            className='justify-content-center'
            />
            </div>
        </div>
    );
}

export default GeneralSubjectPage;
