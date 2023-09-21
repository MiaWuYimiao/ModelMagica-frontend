import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./PersonCardLarge.css";

function PersonCardLarge({person}) {
    const { currentUser } = useContext(UserContext);

    let myStyle={
        backgroundImage: `url(${person.profileImgUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        height: "200px"
    };

    return (
        <Link className="card small-12 medium-4 columns searchResultsImg"  to={`/people/${person.fullname}`}>
            <div className="row itemcontainer">
                <div className="imagecontainer">
                    <div id={person.fullname} className="DivImgContainer" style={myStyle}></div>
                </div>
                <div className="card-text">
                    <h6>{person.fullname} </h6>
                </div>

            </div>
        </Link>
    )
}

export default PersonCardLarge;