import { useMemo, useState } from "react";
import { CreateStudentModal, UploadFileStudent } from "../../../components/student";
import { Paginator } from "../../../components/shared/Paginator";
import { useGetStudentsQuery, useSearchStudentsQuery, useDownloadCreateStudentTemplateQuery, useUploadCreateStudentExcelMutation } from "../../../../services/api/providers/studentApi";
import { StudentFilter } from "../../../components/student/StudentFilter";
import { UnitCampus } from "../../../../interfaces/unit-campus";
import StudentTable from "../../../components/student/studentTable";
import { Accordion, Button } from 'react-bootstrap';

export const StudentPage = () => {
    const [searchKeyword, setSearchKeyword] = useState<string>("");
    const [showModalCreate, setShowModalCreate] = useState<boolean>(false);
    const [showModalUpload, setShowModalUpload] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [selectedCareer, setSelectedCareer] = useState<number | undefined>();
    const [selectedSemester, setSelectedSemester] = useState<string | undefined>();
    const [selectedUnitCampus, setSelectedUnitCampus] = useState<UnitCampus | undefined>(undefined);
    const limit = 10;

    // Determina si hay filtros activos
    const hasFilters = !!selectedCareer || !!selectedSemester || !!selectedUnitCampus;

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

    const { data: template, refetch: refetchTemplate } = useDownloadCreateStudentTemplateQuery();
    const [uploadCreateStudentExcel] = useUploadCreateStudentExcelMutation();

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchKeyword(event.target.value);
        setPage(1);
    };

    const handleFilterChange = (careerId?: number, semester?: string, unitCampus?: UnitCampus) => {
        setSelectedCareer(careerId);
        setSelectedSemester(semester);
        setSelectedUnitCampus(unitCampus);
        setPage(1);
        // Limpiar el campo de búsqueda cuando se aplican filtros
        setSearchKeyword("");
    };

    const handleDownloadCreateStudentTemplate = () => {
        if (template) {
            const url = URL.createObjectURL(template);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'student-template.xlsx');
            document.body.appendChild(link);
            link.click();
            link.remove();
        }
    };

    const handleCreateStudentUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            await uploadCreateStudentExcel(formData);
        }
    };

    return (
        <div className="p-2">
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
                            disabled={hasFilters}  // Deshabilitar si hay filtros activos
                        />
                    </div>
                    <button
                        type="button"
                        className="btn btn-primary m-2"
                        onClick={() => setShowModalCreate(true)}>
                        Nuevo estudiante <i className="fa-solid fa-graduation-cap"></i>
                    </button>
                </div>

                {/* Sección de instrucciones y opciones de Excel */}
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 m-2 mb-0">
                    {/* Instrucciones para carga rápida */}
                    <Accordion className="col-md-8">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>
                                <strong>Instrucciones para la Creación Rápida de Estudiantes</strong>
                            </Accordion.Header>
                            <Accordion.Body>
                                <p>
                                    Para crear estudiantes en lote, descarga la plantilla de Excel, completa los datos necesarios en cada columna y luego carga el archivo de regreso aquí. Asegúrate de seguir las instrucciones en cada columna de la plantilla.
                                </p>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>

                    {/* Botones de descarga y carga de plantilla */}
                    <div className="d-flex gap-2">
                        <Button
                            variant="warning"
                            className="d-flex align-items-center"
                            onClick={handleDownloadCreateStudentTemplate}
                        >
                            Descargar Plantilla <i className="fa-solid fa-download ms-1"></i>
                        </Button>
                        <label htmlFor="uploadExcel" className="btn btn-outline-secondary d-flex align-items-center mb-0">
                            Subir Excel <i className="fa-solid fa-upload ms-1"></i>
                        </label>
                        <input
                            type="file"
                            id="uploadExcel"
                            onChange={handleCreateStudentUpload}
                            style={{ display: 'none' }}
                        />
                    </div>
                </div>

                <div className="student-filter p-2">
                    <StudentFilter
                        onFilterChange={handleFilterChange}
                        isDisabled={!!searchKeyword}  // Deshabilitar los filtros si hay texto en la búsqueda
                    />

                    <div className="mt-4">
                        {studentRes.isFetching
                            ? <div className="text-center">Cargando...</div>
                            : <StudentTable students={students} />}
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
        </div>
            );
};
