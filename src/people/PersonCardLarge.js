import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../auth/UserContext";

function PersonCardLarge({person}) {
    const { currentUser, hasAppliedToJob, applyToJob } = useContext(UserContext);
    // function handleClick() {
    //     applyToJob(job.id);
    // }

    return (
        <Link className="PersonCardLarge card"  to={`/people/${person.fullname}`}>
            <div className="card-body">
                <div className="card-text">
                    <h6>{person.fullname} </h6>
                </div>
                <div className="card-img">
                    <img src={person.profileImgUrl} alt={person.fullname}/>
                </div>
            </div>
        </Link>
    )
}

export default PersonCardLarge;