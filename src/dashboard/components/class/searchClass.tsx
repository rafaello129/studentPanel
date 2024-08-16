
import { Subject} from "../../../interfaces/subject";
import { useEffect, useMemo, useState } from "react";
import { Class } from "../../../interfaces/class";
import { useGetCareersQuery } from "../../../services/api/providers/careerApi";
import { useGetSubjectsQuery } from "../../../services/api/providers/subjectsApi";
import { ClassQueryParams } from "../../../services/api/providers/classApi";
import { Career } from "../../../interfaces/career";


interface props{
    classes: Class[],
    careers: Career[],
    subjects: Subject[]
}

export const SearchClass = () => {
    
    const [semesters, setSemesters] = useState<number[] | undefined>(undefined);
    const [career_, setCareer] = useState<string | undefined>(undefined);
    const [subject, setSubject] = useState<string | undefined>(undefined);
    const [semester, setSemester] = useState<string | undefined>(undefined);
    const [params, setParams] = useState<ClassQueryParams>({ page: 1, limit: 10 });


    const subRes = useGetSubjectsQuery({page: params.page, limit:  params.limit,});
    const {data: subjectResponse } = subRes
    const subjects = useMemo(() => subjectResponse?.data || [], [subjectResponse]);
    console.log(subRes);

    
    const { data: careerResponse } = useGetCareersQuery({page : 1, limit : 10, isActive: true});
    const careers = useMemo(() => careerResponse?.data || [], [careerResponse]);

    const classRes = useGetSubjectsQuery({page: params.page, limit:  params.limit,});
    const {data: classResponse } = classRes
    const classes = useMemo(() => classResponse?.data || [], [classResponse]);
    console.log(classRes);


    

    const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>, inputName: string) => {
        const value = event.target.value;

        switch (inputName) {
            case 'career':
                setCareer(value);
                setSubject(undefined);
                setSemesters(undefined);
                if (value) {
                    const selectedCareer = careers.find((item) => item.id === +value);
                    const maxSemester = selectedCareer?.semester ? parseInt(selectedCareer.semester) : 0;
                    setSemesters(Array.from({ length: maxSemester }, (_, i) => i + 1));
                    
                } else {
                    setSemester(undefined);
                    
                }
                break;
            case 'semester':
                setSemester(value);
                setSubject(undefined);
                if (value) {
                    
                } else {
                    
                }
                break;
            case 'subject':
                setSubject(value);
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        setParams({ page: 1, limit: 10, idCareer: career_, semester, subjectId: subject, isDeleted: false , relationCheck: true});
    }, [careers, semester, subject]);


    return (
        <div className="container mt-5">
            <div className="card shadow-sm">
                <div className="card-header bg-primary text-white">
                    <h4 className="mb-0">Buscar Clases</h4>
                </div>
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
                                    disabled={!semesters}
                                >
                                    <option value="">Seleccione una opción</option>
                                    {semesters?.map((s) => (
                                        <option key={s} value={s}>
                                            {s}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="form-group">
                                <label className="form-label">Materia</label>
                                <select
                                    className="form-select"
                                    value={subject || ''}
                                    onChange={(e) => handleOnChange(e, 'subject')}
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




//dispatch(getAllSubjectFilter({ page: 1, limit: 1000, idCareer: value, semester, isActive: 'true' }));
//dispatch(getAllSubjectFilter({ page: 1, limit: 1000, idCareer: career_, semester: value, isActive: 'true' }));