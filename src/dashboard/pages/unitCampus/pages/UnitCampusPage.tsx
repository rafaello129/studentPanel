import { useState } from "react";
import { CreateUnitCampusModal, UnitCampusList } from "../../../components/unitCampus";

export const UnitCampusPage = () => {

    const [showModalCreate, setShowModalCreate] = useState<boolean>(false);


    return (
        <div className="p-5">

            {
                showModalCreate && <CreateUnitCampusModal setShowModal = {setShowModalCreate}/>
            }

            <div className="card container p-2">
                <div className="d-flex flex-row">
                    <div className="input-group p-2">
                        <button className="btn btn-outline-secondary" type="button"><i className="fa-solid fa-magnifying-glass"></i></button>
                        <input type="text" className="form-control" aria-label="Text input with dropdown button" />
                    </div>
                    <button type="button"
                        className="btn btn-primary"
                        onClick={() => setShowModalCreate(true)}
                    >
                        Nueva unidad
                    </button>

                </div>
            </div>


            <UnitCampusList />
        </div>
    );
}