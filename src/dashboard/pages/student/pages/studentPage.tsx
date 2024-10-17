import { useMemo, useState } from "react";
import { CreateStudentModal, StudentCardList, UploadFileStudent } from "../../../components/student";
import { Paginator } from "../../../components/shared/Paginator";
import { useGetStudentsQuery, useSearchStudentsQuery } from "../../../../services/api/providers/studentApi";

export const StudentPage = () => {
    const [searchKeyword, setSearchKeyword] = useState<string>("");
    const [showModalCreate, setShowModalCreate] = useState<boolean>(false);
    const [showModalUpload, setShowModalUpload] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1); // Inicializa la página en 1
    const limit = 10; // Límite de estudiantes por página

    const studentRes = (!searchKeyword)
        ? useGetStudentsQuery({ page, limit })
        : useSearchStudentsQuery({ page, limit, keyword: searchKeyword }, { skip: !searchKeyword });

    const { data: studentResponse } = studentRes;
    const students = useMemo(() => studentResponse?.data || [], [studentResponse]);
    const totalStudents = studentResponse?.total || 0; // Total de estudiantes

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchKeyword(event.target.value);
        setPage(1); // Reinicia la paginación al realizar una búsqueda
    };

    return (
        <div className="p-5">

            {showModalCreate && <CreateStudentModal setShowModal={setShowModalCreate} />}
            {showModalUpload && <UploadFileStudent setShowModal={setShowModalUpload} />}

            <div className="card container p-2">
                <div className="d-flex flex-row">
                    <div className="input-group p-2">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Buscar..." 
                            value={searchKeyword}
                            onChange={handleSearchChange}
                            aria-label="Text input with dropdown button" 
                        />
                    </div>
                    <button 
                        type="button"
                        className="btn btn-primary m-2"
                        onClick={() => setShowModalCreate(true)}>
                        Nuevo estudiante <i className="fa-solid fa-graduation-cap"></i>
                    </button>
                    <button 
                        type="button"
                        className="btn btn-secondary m-2"
                        onClick={() => setShowModalUpload(true)}>
                        Subir archivo <i className="fa-solid fa-file-export"></i>
                    </button>
                </div>

                <div className="d-flex justify-content-center flex-wrap mt-4 mb-5">
                    {studentRes.isFetching 
                        ? <></> 
                        : <StudentCardList students={students} isLoading={studentRes.isLoading} />
                    }
                </div>
            </div>

            {studentResponse && totalStudents > limit && (
                <Paginator
                    currentPage={page}
                    totalResults={totalStudents}
                    setCurrentPage={(page: number) => setPage(page)}
                />
            )}
        </div>
    );
};
