import React, { useContext } from "react";
import SearchContext from "./SearchContext";
import WorkCardLarge from "../works/WorkCardLarge";
import PersonCardLarge from "../people/PersonCardLarge";
import { NavLink, useParams } from "react-router-dom";
import { peopleData, worksData } from "../data";
import './searchResult.css';

function SearchResult() {
    //const { searchResult } = useContext(SearchContext);
    const { type } = useParams();

    // if(!searchResult) {
    //     return (
    //         <div>
    //             <h4>No result found!</h4>
    //         </div>
    //     )
    // }

    let Items = peopleData;

    return (
        <div className="SearchResult">
            <div className="grid-container">
                {
                    Items.map( item => 
                        ( type==="work"? <WorkCardLarge work={item}/> : <PersonCardLarge person={item}/> ) 
                    )
                }
            </div>
        </div>
    );
}

export default SearchResult;