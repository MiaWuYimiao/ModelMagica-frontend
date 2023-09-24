import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ModelmagicaApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner";
import ImageDetail from "./ImageDetail";
import {getDispName, getDispDate} from "../helper/conveter"
import "./WorkDetail.css"

const left_arrow = "https://i.mdel.net/mdcdb/i/instafeed-l100.gif";
const right_arrow = "https://i.mdel.net/mdcdb/i/instafeed-r100.gif";

function WorkDetail() {
    const { id } = useParams();
    const [work, setWork] = useState("");
    const [currentImage, setCurrentImage] = useState("");
    //   work is { id, title, client, type, source, publishTime, images, crew }
    //   where images is [{ id, url }, ...] and crew is [{fullname, role}, ...]
    //   currentImage is {id, url}

    useEffect(() => {
        async function getWork() {
            let work = await ModelmagicaApi.getWork(id);
            setWork(work);
            setCurrentImage(work.images[0]);
        }
        getWork();
    },[])

    function handleClick(e) {
        let ind = e.target.alt;
        console.log("ind", ind);
        setCurrentImage(work.images[ind]);
    }

    if(!work) return <LoadingSpinner />;

    return (
        <div className="WorkDetail">
            <div className="row">
                <div className="mdcdb-font-size large-4 small-12 columns">
                    <div className="row work-left">
                        <div id="title-box" className="panel">
                            <h3>{work.client}</h3>
                            <h5>{work.title}</h5>
                            Source: 
                            <a href={work.source}> work.source</a>
                            <p> Published: {getDispDate(work.publishTime)}</p>
                        </div>
                        <div id="crew-box" className="show-for-large-up">
                            <div className="panel">
                                 All people in this work:
                                 <br style={{height:"16px"}}/> 
                                 <br style={{height:"16px"}}/> 
                                {
                                    work.crew.map(p => (
                                        <li>
                                            <Link to={`/people/${p.fullname}`}>{getDispName(p.fullname)} </Link>
                                            - {p.role}
                                        </li>))
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mdcdb-font-size large-8 small-12 columns">
                    <div className="row work-right">
                        <div className="small-12 columns">
                            <div className="row">
                                <div className="slickPrev slickNav slick-arrow slick-disabled hidden">
                                    <img src={left_arrow} alt="left_arrow"></img>
                                </div>
                                <div className="small-12 columns">
                                    <div className="workSliderThumbs row slick-initialized slick-slider">
                                        {
                                            work.images.map((i, index) => 
                                                (<div className="small-2 columns">
                                                    <div className={currentImage===i? "th current-img" : "th"} id={i.id}>
                                                        <a>
                                                            <img src={i.url} alt={index} onClick={handleClick}></img>
                                                        </a>
                                                    </div>
                                                </div>)
                                            )
                                        }
                                    </div>
                                </div>
                                <div className="slickNext slickNav slick-arrow hidden">
                                    <img src={right_arrow} alt="right_arrow"></img>
                                </div>
                            </div>
                            <ImageDetail image={currentImage}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WorkDetail;