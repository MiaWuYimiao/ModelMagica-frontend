import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../auth/UserContext";
import { getDispName } from "../helper/conveter";
import "./PersonCardLarge.css";

function PersonCardLarge({person}) {
    const { currentUser } = useContext(UserContext);

    let myStyle={
        backgroundImage: `url(${person.profileImgUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
    };

    console.log("fullname",person.fullname)

    let disName = getDispName(person.fullname);

    return (
        <Link to={`/people/${person.fullname}`}>
            <div className="row itemcontainer">
                <div id={person.fullname} className="imagecontainer" style={myStyle}></div>
                <hr/>
                <div className="card-text">
                    <h6>{disName} </h6>
                </div>

            </div>
        </Link>
    )
}

export default PersonCardLarge;