import React from "react";
import { getDispDate } from "../helper/conveter";
import { Link } from "react-router-dom";

function WorkCardSmall({work}) {
    return (
        <div className="row">
            <div id={work.id} className="qtipdiv work-box small-12 columns">
                <div className="small-4 large-3 columns small-only-text-center">
                    <div className="con-box-img">
                        <img src={work.coverImgUrl} alt={work.title} width="125" height="125" border="0"></img>
                    </div>
                </div>
                <div className="small-8 large-9 columns peopleWorkDetails">
                    <Link to={`/works/${work.id}`}><div>{work.title}</div></Link>
                    <div>{work.client} ( {work.type} )</div>
                    <div className="credits">{getDispDate(work.publishTime)}</div>
                </div>
            </div>
        </div>
    );
}

export default WorkCardSmall;