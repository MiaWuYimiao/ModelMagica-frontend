import React from "react";
import {worksData, peopleData} from "../helper/data";
import WorkCardLarge from "./WorkCardLarge";

function WorkList() {
    return (
        <div className="SearchList row">
            <div className="SearchListContainer">
                {                    
                    worksData.map(work => (
                        <div className="medium-4 columns searchResultsImg">
                            <WorkCardLarge key={work.id} work={work}/>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default WorkList;