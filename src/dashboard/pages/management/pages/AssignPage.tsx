import { useEffect, useMemo, useState } from "react";
import HeaderClass, { HeaderClassProps } from "../../../components/class/HeaderClass";

import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import RegisteredStudent from "../../../components/class/RegisteredStudents";
import SearchStudent from "../../../components/class/searchStudent";
import { Class } from "../../../../interfaces/class";
import { useGetStudentsQuery } from "../../../../services/api/providers/studentApi";

export const AssignPage = ({ cls }: HeaderClassProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const [currentClass, setCurrentClass] = useState<Class>(cls);


    const [page, setPage] = useState<number>(1);

    const res = useGetStudentsQuery({page: page, limit:  10,});
    
    const {data: studentResponse } = res
    
    const students = useMemo(() => studentResponse?.data || [], [studentResponse]);

    console.log(res);


    const updateClass = (updatedClass: Class) => {
        setCurrentClass(updatedClass);
        console.log(updatedClass);
    };

    return (
        <div>
            <HeaderClass cls={currentClass}></HeaderClass>
            <RegisteredStudent cls={currentClass}></RegisteredStudent>
            <SearchStudent cls={currentClass} updateClass={updateClass}></SearchStudent>
        </div>
    );
}
