import { Class } from "../../../interfaces/class";
import { Career } from "../../../interfaces/career";
import { UnitCampus } from "../../../interfaces/unit-campus";
import { useEffect, useMemo, useState } from "react";
import { useGetCareersQuery } from "../../../services/api/providers/careerApi";
import { useGetUnitsQuery } from "../../../services/api/providers/unitApi";
import { ClassQueryParams } from "../../../services/api/providers/classApi";

interface StudentFilterProps {
    onFilterChange: (
        careerId?: number,
        semester?: string,
        unitCampus?: UnitCampus) => void;
}

interface props {
    classes: Class[],
    careers: Career[],
    units: UnitCampus[]
}

const semesterOptions = Array.from({ length: 9 }, (_, i) => i + 1); 

export const StudentFilter = ({ onFilterChange }: StudentFilterProps) => {

    const [semesters, setSemesters] = useState<number[] | undefined>(undefined);
    const [career_, setCareer] = useState<number | undefined>(undefined);
    const [unit, setUnit] = useState<string | undefined>(undefined);
    const [semester, setSemester] = useState<string | undefined>(undefined);
    const [params, setParams] = useState<ClassQueryParams>({ page: 1, limit: 10 });


    const unitRes = useGetUnitsQuery({ page: params.page, limit: params.limit, });
    const { data: unitResponse } = unitRes
    const subjects = useMemo(() => unitResponse?.data || [], [unitResponse]);
    console.log(unitRes);


    const { data: careerResponse } = useGetCareersQuery({ page: 1, limit: 10, isActive: true });
    const careers = useMemo(() => careerResponse?.data || [], [careerResponse]);

    const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>, inputName: string) => {
        const value = event.target.value;

        switch (inputName) {
            case 'career':
                const careerId = value ? parseInt(value, 10) : undefined;
                setCareer(careerId);
                setUnit(undefined);
                setSemesters(undefined);
                onFilterChange(careerId, undefined, undefined);
                break;
            case 'semester':
                setSemester(value);
                setUnit(undefined);
                onFilterChange(career_, value, undefined);
                break;
            case 'unit':
                const selectedUnit = unitResponse?.data.find((u) => u.id === parseInt(value, 10));
                console.log("Unidad seleccionada:", selectedUnit);  
                setUnit(selectedUnit?.id?.toString());
                onFilterChange(career_, semester, selectedUnit);
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        setParams({ page: 1, limit: 10, idCareer: career_ ? career_.toString() : undefined, semester, isDeleted: false, relationCheck: true });
    }, [career_, semester, unit]);


    return (
        <div className="container mt-5">
            <div className="card shadow-sm">
                <div className="card-body">
                    <div className="row mb-3">
                        <div className="col-md-4">
                            <div className="form-group">
                                <label className="form-label">Carrera</label>
                                <select
                                    className="form-select"
                                    value={career_ || ''}
                                    onChange={(e) => handleOnChange(e, 'career')}
                                >
                                    <option value="">Seleccione una opción</option>
                                    {careers.map((c) => (
                                        <option key={c.id} value={c.id}>
                                            {c.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="form-group">
                                <label className="form-label">Semestre</label>
                                <select
                                    className="form-select"
                                    value={semester || ''}
                                    onChange={(e) => handleOnChange(e, 'semester')}
                                >
                                    <option value="">Seleccione una opción</option>
                                    {semesterOptions.map((s) => (
                                        <option key={s} value={s}>
                                            {s}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="form-group">
                                <label className="form-label">Unidad</label>
                                <select
                                    className="form-select"
                                    value={unit || ''}
                                    onChange={(e) => handleOnChange(e, 'unit')}
                                >
                                    <option value="">Seleccione una opción</option>
                                    {subjects.map((s) => (
                                        <option key={s.id} value={s.id}>
                                            {s.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};