import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./WorkCardLarge.css"

function WorkCardLarge({work}) {
    return (
        <Link className="WorkCardLarge card"  to={`/works/${work.id}`}>
            <div className="card-body">
                <div className="card-text">
                    <h6 className="card-title">{work.client} </h6>
                    <p className="card-subtitle">{work.title}</p>
                </div>
                <div className="card-img">
                    <img src={work.url} alt={work.id}/>
                </div>
            </div>
        </Link>
    )
}

export default WorkCardLarge;