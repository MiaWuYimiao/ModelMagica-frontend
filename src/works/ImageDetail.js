import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ModelmagicaApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner";
import {getDispName} from "../helper/conveter"


function ImageDetail({image}) {
    const [crew, setCrew] = useState("");

    console.log(image);

    useEffect(() => {
        async function getCrew() {
            let crew = await ModelmagicaApi.getCrew(image.id);
            setCrew(crew);
        }
        getCrew();
    },[image])
    
    if(!crew) return<LoadingSpinner />


    return (
        <div className="workSlider row slick-initialized slick-slider" style={{width:'675px'}}>
            <div className="small-12 thisHasMediaID columns" style={{width: '100%', display: 'inline-block'}}>
                <img src={image.url} alt={image.id} boder="0"></img>
                <div className="this-img panel">
                    <span>
                        In this picture:  
                        {
                            crew.filter(p => (p.role === "Model")).map( p => 
                                (<Link to={`/people/${p.fullname}`}> {getDispName(p.fullname)} </Link>)
                            )
                        }
                    </span>
                    <hr></hr>
                    <span>
                        Credits for this picture: 
                        {
                            crew.filter(p => (p.role !== "Model")).map( p => 
                                (
                                <>
                                    <Link to={`/people/${p.fullname}`}> {getDispName(p.fullname)} </Link> 
                                    ({p.role})
                                </>
                                )
                            )
                        }
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ImageDetail;
