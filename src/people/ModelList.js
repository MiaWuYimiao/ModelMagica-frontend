import React from "react";
import { peopleData} from "../helper/data";
import PersonCardLarge from "./PersonCardLarge";

function ModelList() {
    return (
        <div className="SearchList row">
            <div className="SearchListContainer">
                {                    
                    peopleData.map(person => (
                        <div className="medium-4 columns searchResultsImg">
                            <PersonCardLarge key={person.fullname} person={person}/>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default ModelList;