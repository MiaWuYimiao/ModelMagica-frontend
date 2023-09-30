import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./WorkCardLarge.css"

function WorkCardLarge({work}) {
    let myStyle={
        backgroundImage: `url(${work.url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'top center',
    };
    return (
        <Link to={`/works/${work.id}`}>
            <div className="row itemcontainer">
                <div id={work.id} className="imagecontainer" style={myStyle}></div>
                <hr/>
                <div className="card-text">
                    <h6 className="card-title">{work.client} </h6>
                    <p className="card-subtitle">{work.title}</p>
                </div>
            </div>
        </Link>
    )
}

export default WorkCardLarge;