import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ModelmagicaApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner";

const left_arrow = "https://i.mdel.net/mdcdb/i/instafeed-l100.gif";
const right_arrow = "https://i.mdel.net/mdcdb/i/instafeed-r100.gif";

function WorkDetail() {
    const { id } = useParams();
    const [work, setWork] = useState("");
    //   work is { id, title, client, type, source, publishTime, images, crew }
    //   where images is [{ id, url }, ...] and crew is [{fullname, role}, ...]

    useEffect(() => {
        async function getWork() {
            let work = await ModelmagicaApi.getWork(id);
            setWork(work);
        }
        getWork();
    },[])

    if(!work) return <LoadingSpinner />;

    return (
        <div className="WorkDetail">
            <div className="row">
                <div className="mdcdb-font-size large-4 small-12 columns">
                    <div className="row work-left">
                        <div id="title-box" className="panel">
                            <h3>{work.client}</h3>
                            <h4>{work.title}</h4>
                            <a href={work.source}>work.source</a>
                            <p> Published: {work.publishTime}</p>
                        </div>
                        <div id="crew-box" className="show-for-large-up">
                            <div className="panel">
                                 All people in this show:
                                {
                                    work.crew.map(p => (
                                        <li>
                                            <Link to={`/people/${p.fullname}`}>{p.fullname} </Link>
                                            - {p.role}
                                        </li>))
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mdcdb-font-size large-4 small-12 columns">
                    <div className="row work-right">
                        <div className="small-12 columns">
                            <div className="row">
                                <div className="slickPrev slickNav slick-arrow slick-disabled">
                                    <img src={left_arrow} alt="left_arrow"></img>
                                </div>
                                <div className="small-12 columns">
                                    <div className="workSliderThumbs row slick-initialized slick-slider">
                                        {
                                            work.images.map(i => 
                                                (<div className="small-2 columns">
                                                    <div className="th" id={i.id}>
                                                        <a>
                                                            <img src={i.url}></img>
                                                        </a>
                                                    </div>
                                                </div>)
                                            )
                                        }
                                    </div>
                                </div>
                                <div className="slickNext slickNav slick-arrow">
                                    <img src={right_arrow} alt="right_arrow"></img>
                                </div>
                            </div>
                            <div className="workSlider row slick-initialized slick-slider">
                                <div className="small-12 thisHasMediaID columns">
                                    <img src={work.images[0].url} alt={work.images[0].id}></img>
                                    <div className="this-img panel">
                                        <span>
                                            In this picture: 
                                            {
                                                work.crew.filter(p => (p.role === "Model")).map( p => 
                                                    (<Link to={`/people/${p.fullname}`}>{p.fullname} </Link>)
                                                )
                                            }
                                        </span>
                                        <span>
                                            Credits for this picture: 
                                            {
                                                work.crew.filter(p => (p.role !== "Model")).map( p => 
                                                    (<Link to={`/people/${p.fullname}`}>{p.fullname} ({p.role}),</Link>)
                                                )
                                            }
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WorkDetail;