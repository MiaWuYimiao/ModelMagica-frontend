import React from "react";
import { Link } from "react-router-dom";
import "./PersonCardSmall.css"

function PersonCardSmall({person}) {
    let myStyle={
        backgroundImage: `url(${person.profileImgUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        height: "200px"
    };

    return (
        <Link to={`/people/${person.fullname}`}>
            <div className="personCardSmall">
                <div>
                    <img src={person.profileImgUrl} alt="profile" className="ui small circular centered image"/>
                </div>
                <div>
                    <div>{person.artist}</div>
                    <div className="listSubtitle-text">{person.role}</div>
                </div>
            </div>
        </Link>
    );
}

export default PersonCardSmall;