import { useEffect, useMemo, useState } from "react";
import HeaderClass, { HeaderClassProps } from "../../../components/class/HeaderClass";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import RegisteredStudent from "../../../components/class/RegisteredStudents";
import { Class } from "../../../../interfaces/class";
import { useGetStudentsQuery } from "../../../../services/api/providers/studentApi";
import SearchStudent from "../../../components/class/searchStudent";

export const AssignPage = ({ cls }: HeaderClassProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const [currentClass, setCurrentClass] = useState<Class>(cls);
    const [page, setPage] = useState<number>(1);
    const [selectedCareer, setSelectedCareer] = useState<number | undefined>();
    const [selectedSemester, setSelectedSemester] = useState<string | undefined>();

    const { data: studentResponse } = useGetStudentsQuery({ page, limit: 10, careerId: selectedCareer, semester: selectedSemester });
    const students = useMemo(() => studentResponse?.data || [], [studentResponse]);

    const updateClass = (updatedClass: Class) => {
        setCurrentClass(updatedClass);
        console.log(updatedClass);
    };

    const handleFilterChange = (careerId?: number, semester?: string) => {
        setSelectedCareer(careerId);
        setSelectedSemester(semester);
        setPage(1); // Resetear a la primera página al aplicar filtros
    };

    return (
        <div>
            <HeaderClass cls={currentClass} />
            <RegisteredStudent cls={currentClass} />
            <SearchStudent cls={currentClass} updateClass={updateClass} onFilterChange={handleFilterChange} />
        </div>
    );
}
