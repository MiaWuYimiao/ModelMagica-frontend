import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./WorkCardLarge.css"

function WorkCardLarge({work}) {
    let myStyle={
        backgroundImage: `url(${work.url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        height: "200px"
    };
    return (
        <Link className=" card small-12 medium-4 columns searchResultsImg"  to={`/works/${work.id}`}>
            <div className="row itemcontainer">
                <div className="imagecontainer">
                    <div id={work.id} className="DivImgContainer" style={myStyle}></div>
                </div>
                <hr></hr>
                <div className="">
                    <h6 className="card-title">{work.client} </h6>
                    <p className="card-subtitle">{work.title}</p>
                </div>

            </div>
        </Link>
    )
}

export default WorkCardLarge;