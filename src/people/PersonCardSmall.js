import React from "react";
import { Link } from "react-router-dom";
import "./PersonCardSmall.css"
import {getDispName} from "../helper/conveter";

function PersonCardSmall({person}) {
    let myStyle={
        backgroundImage: `url(${person.profileImgUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        height: "200px"
    };
    let name = "";
    if(person.fullname) {
        name = person.fullname;
    } else {
        name = person.artist;
    }

    return (   
        <div className="personCardSmall">
            <div className="person-small-card-image">
                <img src={person.profileImgUrl} alt="profile" className="ui small circular centered image"/>
            </div>
            <div className="person-small-card-text">
                <div><Link to={`/people/${name}`}>{getDispName(name)}</Link></div>
                <div className="listSubtitle-text">{person.role}</div>
            </div>
        </div>
    );
}

export default PersonCardSmall;