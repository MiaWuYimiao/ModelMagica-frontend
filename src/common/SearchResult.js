import React, { useContext } from "react";
import SearchContext from "./SearchContext";
import WorkCardLarge from "../works/WorkCardLarge";
import PersonCardLarge from "../people/PersonCardLarge";
import { NavLink, useParams } from "react-router-dom";
import { peopleData, worksData } from "../helper/data";
import './searchResult.css';

function SearchResult() {
    const { searchResult } = useContext(SearchContext);
    const { type } = useParams();

    if(searchResult.length === 0) {
        return (
            <div>
                <h4>No result found!</h4>
            </div>
        )
    }

    return (
        <div className="SearchList row">
            <div className="SearchListContainer">
                {
                    searchResult.map( item => 
                        ( 
                            <div className="medium-4 columns searchResultsImg">
                                {type==="works"? <WorkCardLarge key={item.id} work={item}/> : <PersonCardLarge key={item.fullname} person={item}/> }
                            </div>
                        ) 
                    )
                }
            </div>
        </div>
    );
}

export default SearchResult;