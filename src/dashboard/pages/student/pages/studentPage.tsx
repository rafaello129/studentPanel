import { useMemo, useState } from "react";
import { CreateStudentModal, StudentCardList, UploadFileStudent } from "../../../components/student";
import { Paginator } from "../../../components/shared/Paginator";
import { useGetStudentsQuery, useSearchStudentsQuery } from "../../../../services/api/providers/studentApi";
import { StudentFilter } from "../../../components/student/StudentFilter";
import { UnitCampus } from "../../../../interfaces/unit-campus";

export const StudentPage = () => {
    const [searchKeyword, setSearchKeyword] = useState<string>("");
    const [showModalCreate, setShowModalCreate] = useState<boolean>(false);
    const [showModalUpload, setShowModalUpload] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [selectedCareer, setSelectedCareer] = useState<number | undefined>();
    const [selectedSemester, setSelectedSemester] = useState<string | undefined>();
    const [selectedUnitCampus, setSelectedUnitCampus] = useState<UnitCampus | undefined>(undefined);
    const limit = 10;

    const studentRes = (!searchKeyword)
        ? useGetStudentsQuery({
            page,
            limit,
            careerId: selectedCareer,
            semester: selectedSemester,
            idUnitCampus: selectedUnitCampus?.id
        })
        : useSearchStudentsQuery(
            { page, limit, keyword: searchKeyword },
            { skip: !searchKeyword }
        );

    const { data: studentResponse } = studentRes;
    const students = useMemo(() => studentResponse?.data || [], [studentResponse]);
    const totalStudents = studentResponse?.total || 0;

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchKeyword(event.target.value);
        setPage(1);
    };

    const handleFilterChange = (careerId?: number, semester?: string, unitCampus?: UnitCampus) => {
        setSelectedCareer(careerId);
        setSelectedSemester(semester);
        setSelectedUnitCampus(unitCampus);
        setPage(1);
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

                <div className="student-filter p-2">
                    <StudentFilter onFilterChange={handleFilterChange} />
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
