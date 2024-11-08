import { useEffect, useMemo, useState } from "react";
import { useGetCareersQuery } from "../../../services/api/providers/careerApi";
import { useGetUnitsQuery } from "../../../services/api/providers/unitApi";
import { Career } from "../../../interfaces/career";
import { UnitCampus } from "../../../interfaces/unit-campus";
import { ClassQueryParams } from "../../../services/api/providers/classApi";

interface StudentFilterProps {
    onFilterChange: (
        careerId?: number,
        semester?: string,
        unitCampus?: UnitCampus
    ) => void;
    isDisabled: boolean; // Nueva propiedad para controlar la habilitación de los filtros
}

const semesterOptions = Array.from({ length: 9 }, (_, i) => i + 1); // Opciones de semestre del 1 al 9

export const StudentFilter = ({ onFilterChange, isDisabled }: StudentFilterProps) => {
    const [career, setCareer] = useState<number | undefined>(undefined);
    const [unit, setUnit] = useState<string | undefined>(undefined);
    const [semester, setSemester] = useState<string | undefined>(undefined);
    const [params, setParams] = useState<ClassQueryParams>({ page: 1, limit: 10 });

    const { data: careerResponse } = useGetCareersQuery({ page: 1, limit: 10, isActive: true });
    const { data: unitResponse } = useGetUnitsQuery({ page: 1, limit: 10 });

    const careers = useMemo(() => careerResponse?.data || [], [careerResponse]);
    const units = useMemo(() => unitResponse?.data || [], [unitResponse]);

    const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>, inputName: string) => {
        const value = event.target.value;

        switch (inputName) {
            case 'career':
                const careerId = value ? parseInt(value, 10) : undefined;
                setCareer(careerId);
                setUnit(undefined); // Limpiar unidad al cambiar de carrera
                setSemester(undefined); // Limpiar semestre al cambiar de carrera
                onFilterChange(careerId, undefined, undefined);
                break;
            case 'semester':
                setSemester(value);
                onFilterChange(career, value, undefined);
                break;
            case 'unit':
                const selectedUnit = units.find((u) => u.id === parseInt(value, 10));
                setUnit(selectedUnit?.id?.toString());
                onFilterChange(career, semester, selectedUnit);
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        setParams({
            page: 1,
            limit: 10,
            idCareer: career ? career.toString() : undefined,
            semester,
            isDeleted: false,
            relationCheck: true
        });
    }, [career, semester, unit]);

    return (
        <div className="container mt-3">
            <div className="card shadow-sm">
                <div className="card-body">
                    <div className="row mb-3">
                        {/* Carrera */}
                        <div className="col-md-4">
                            <div className="form-group">
                                <label className="form-label">Carrera</label>
                                <select
                                    className="form-select"
                                    value={career || ''}
                                    onChange={(e) => handleOnChange(e, 'career')}
                                    disabled={isDisabled} // Deshabilitar si isDisabled es true
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

                        {/* Semestre */}
                        <div className="col-md-4">
                            <div className="form-group">
                                <label className="form-label">Semestre</label>
                                <select
                                    className="form-select"
                                    value={semester || ''}
                                    onChange={(e) => handleOnChange(e, 'semester')}
                                    disabled={isDisabled} // Deshabilitar si isDisabled es true
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

                        {/* Unidad */}
                        <div className="col-md-4">
                            <div className="form-group">
                                <label className="form-label">Unidad</label>
                                <select
                                    className="form-select"
                                    value={unit || ''}
                                    onChange={(e) => handleOnChange(e, 'unit')}
                                    disabled={isDisabled} // Deshabilitar si isDisabled es true
                                >
                                    <option value="">Seleccione una opción</option>
                                    {units.map((u) => (
                                        <option key={u.id} value={u.id}>
                                            {u.name}
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
