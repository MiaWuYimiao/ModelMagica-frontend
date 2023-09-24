import React, { useState, useEffect } from "react";
import {worksData} from "../helper/data";
import WorkCardLarge from "./WorkCardLarge";
import ModelmagicaApi from "../api/api"

function WorkList() {
    const [works, setWorks] = useState([]);
  
    useEffect(() => {
        async function getWorks() {
            let works = await ModelmagicaApi.getWorks();
            //let works = worksData;
            setWorks(works);
        }
        getWorks();
    },[])

    return (
        <div className="SearchList row">
            <div className="SearchListContainer">
                {                    
                    works.map(work => (
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