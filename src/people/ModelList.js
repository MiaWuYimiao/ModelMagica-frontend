import React, { useState, useEffect } from "react";
import PersonCardLarge from "./PersonCardLarge";
import ModelmagicaApi from "../api/api"

function ModelList() {
    const [people, setPeople] = useState([]);
  
    useEffect(() => {
        async function getPeople() {
          const data = {role: "Model"}
          let people = await ModelmagicaApi.getPeople(data);
          //let people = peopleData;
          setPeople(people);
      }
        getPeople();
    },[]);


    return (
        <div className="SearchList row">
            <div className="SearchListContainer">
                {                    
                    people.map(person => (
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