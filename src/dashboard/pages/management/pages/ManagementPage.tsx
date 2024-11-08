import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import { Class } from "../../../../interfaces/class";
import unitIcon from "../../../../assets/icons/unit.png";
import usuarioIcon from "../../../../assets/icons/usuario.png";

import { useGetClassesQuery } from "../../../../services/api/providers/classApi";
import { useGetUnitsQuery, useSearchUnitsQuery } from "../../../../services/api/providers/unitApi";
import Pagination from "../../../components/shared/Pagination";

interface props {
    setSelectedClass: Dispatch<SetStateAction<Class>>,
}

export const ManagementPage = ({ setSelectedClass }: props) => {
    const limit = 10;
    const [page, setPage] = useState<number>(1);
    const [searchKeyword, setSearchKeyword] = useState<string>("");

    const classRes = useGetClassesQuery({ page, limit, relationCheck: true });
    const { data: classesResponse } = classRes;
    const classes = useMemo(() => classesResponse?.data || [], [classesResponse]);
    const totalClasses = classesResponse?.total || 0;

    const unitRes = (!searchKeyword) 
        ? useGetUnitsQuery({ page: 1, limit: 10 }) 
        : useSearchUnitsQuery({ page: 1, limit: 10, keyword: searchKeyword }, { skip: !searchKeyword });
    const { data: unitResponse } = unitRes;
    const units = useMemo(() => unitResponse?.data || [], [unitResponse]);

    return (
        <div className="p-3">
            {/* Título y sección de instrucciones */}
            <div className="mb-4">
                <h1 className="text-center mb-3">Gestión de Clases</h1>
                <div className="alert alert-info" role="alert">
                    <strong>Instrucciones:</strong>
                    <ul className="mt-2">
                        <li>Revisa la lista de clases disponibles y accede a más detalles haciendo clic en cada clase.</li>
                        <li>Para agregar alumnos a una clase, selecciona la opción "Agregar alumnos" dentro de cada clase.</li>
                        <li>Utiliza la paginación al final de la lista para navegar entre las diferentes clases.</li>
                        <li>Observa los detalles de cada clase, incluyendo el profesor, la unidad, el período actual, y el subperíodo.</li>
                    </ul>
                </div>
            </div>

            <div className="d-flex justify-content-center mt-4 mb-5">
                <div className="accordion w-75" id="accordionExample">
                    {classes.map((cls: Class) => (
                        <div className="accordion-item" key={cls.id}>
                            <h2 className="accordion-header">
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#clase-${cls.id}`} aria-expanded="true" aria-controls={`clase-${cls.id}`}>
                                    <div className="d-flex align-items-center">
                                        <img
                                            style={{ borderRadius: '100%' }}
                                            width="35"
                                            className="me-2"
                                            alt="class image"
                                            src={unitIcon}
                                        />
                                        <span><strong>{cls.package.name} - {cls.subject.name}</strong></span>
                                    </div>
                                </button>
                            </h2>
                            <div id={`clase-${cls.id}`} className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <div className="d-flex flex-column justify-content-center align-items-center flex-md-row justify-content-md-between align-items-md-start">
                                        <div className="d-flex flex-column align-items-center mt-2">
                                            <img
                                                height={100}
                                                className="me-2 rounded-circle"
                                                style={{ width: '100%', maxWidth: '100px', objectFit: 'cover' }}
                                                src={usuarioIcon}
                                                alt="User image"
                                                onError={(e) => e.currentTarget.src = ""}
                                                loading="lazy"
                                            />
                                        </div>
                                        <div className="d-flex flex-column m-3">
                                            <span><strong>Profesor:</strong> {cls.teacher.user.name} {cls.teacher.user.lastName} {cls.teacher.user.motherLastName}</span>
                                            <span><strong>Unidad:</strong> {cls.package.unitCampus.name}</span>
                                            <span><strong>Clave:</strong> {cls.subject.clave}</span>
                                            <span><strong>Período Actual:</strong> {cls.period?.name} ({cls.period?.key})</span>
                                            <span><strong>Subperíodo:</strong> {cls.subperiod?.name} ({cls.subperiod?.key})</span>
                                        </div>
                                        <div className="mt-auto">
                                            <NavLink
                                                type="button"
                                                className="btn btn-secondary"
                                                onClick={() => { setSelectedClass(cls); }}
                                                to="/assign">
                                                <span className="fs-6">Agregar alumnos</span>
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Pagination
                className="justify-content-center"
                currentPage={page}
                totalCount={totalClasses}
                pageSize={limit}
                onPageChange={setPage}
            />
        </div>
    );
};
