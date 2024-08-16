import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import { Class } from "../../../../interfaces/class";
import unitIcon from "../../../../assets/icons/unit.png"

import { SearchClass } from "../../../components/class/searchClass";
import { useGetClassesQuery } from "../../../../services/api/providers/classApi";
import { useGetUnitsQuery, useSearchUnitsQuery } from "../../../../services/api/providers/unitApi";


interface props {
    setSelectedClass: Dispatch<SetStateAction<Class>>,
}


export const ManagementPage = ({setSelectedClass}:props) => {



    const [page, setPage] = useState<number>(1)
    const [searchKeyword, setSearchKeyword] = useState<string>("");


    const classRes = useGetClassesQuery({page:1,limit:10,relationCheck:true});
    const {data: classesResponse } = classRes
    const classes = useMemo(() => classesResponse?.data || [], [classesResponse]);
    console.log(classRes);


    const unitRes = (!searchKeyword) ? useGetUnitsQuery({page: page, limit:  10,}) : useSearchUnitsQuery ({page: page, limit:  10, keyword: searchKeyword},{skip:!searchKeyword});
    const {data: unitResponse } = unitRes;
    const units = useMemo(() => unitResponse?.data || [], [unitResponse]);
    console.log(unitRes);

    
    const urlImage = import.meta.env.VITE_API_URL_AUTH

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchKeyword(event.target.value);
    };

    return (

        

        <div className="p-5">

        <SearchClass></SearchClass>

        <div className="d-flex justify-content-center mt-4 mb-5">
                <div className="accordion w-75" id="accordionExample">
                

                    {
                        classes.map((cls: Class) => (
                            <div className="accordion-item" key={cls.id}>
                                <h2 className="accordion-header">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#clase-${cls.id}`} aria-expanded="true" aria-controls={`clase-${cls.id}`}>
                                        <div className="d-flex align-items-center">
                                            <img
                                                style={{ borderRadius: '100%' }}
                                                width="35"
                                                className='me-2'
                                                alt="class image" 
                                                src={unitIcon}
                                                />
                                            <span><strong>{cls.package.name} - {cls.subject.name}</strong> {/*cls.subject.career.name*/}// </span>

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
                                                src={cls.teacher.user.picture === "none" ? undefined : `${urlImage}/files/users/${cls.teacher.user.picture}`}
                                                alt="User image"
                                                onError={(e) => e.currentTarget.src = ""}
                                                loading="lazy"
                                            />
                                        </div>
                                        <div className="d-flex flex-column  m-3">
                                            <span className=""><strong>Profesor:</strong> {cls.teacher.user.name} {cls.teacher.user.lastName} {cls.teacher.user.motherLastName}</span>
                                            <span className=""><strong>Unidad: </strong>{cls.package.unitCampus.name}</span>
                                            <span className=""><strong>Clave: </strong>{cls.subject.clave}</span>
                                        </div>
                                        <div className="mt-auto">
                                            <NavLink
                                                type="button"
                                                className="btn btn-secondary"
                                                onClick={()=>{setSelectedClass(cls)}}
                                                to="/assign">
                                                <span className='fs-6'>Agregar alumnos</span>
                                            </NavLink>
                                        </div>
                                    </div>




                                </div>
                                </div>

                            </div>
                        ))
                    }

                </div>
            </div>
        </div>

       
    )
    
}


    
