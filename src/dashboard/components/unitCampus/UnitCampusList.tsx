import { NavLink } from "react-router-dom"


export const UnitCampusList = () => {
    return (
        <div className="card mt-3 p-2">
            <ul className="navbar-nav p-3">
                <li>
                    <div className="accordion" id="accordionExample2">
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <div className="d-flex align-items-center justify-content-center p-2">
                                    <button className="accordion-button collapsed p-2" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                        Centro Académico
                                    </button>
                                    
                                        <div className="form-check form-switch ms-2 md-3">
                                            <input className="form-check-input p-3" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                                        </div>

                                    <button type="button" className="btn btn-primary btn-sm me-2 p-2"><i className="fa-solid fa-pen"></i></button>
                                </div>

                            </h2>
                            <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample2">
                                <div className="accordion-body">
                                    


                                </div>
                            </div>
                        </div>
                    </div >
                </li>

            </ul>
        </div>

    )

}