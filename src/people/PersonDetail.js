import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ModelmagicaApi from "../api/api";
import UserContext from "../auth/UserContext";
import LoadingSpinner from "../common/LoadingSpinner";
import WorkCardSmall from "../works/WorkCardSmall";
import PersonCardSmall from "./PersonCardSmall";
import { BsHeart, BsHeartFill, BsInstagram } from "react-icons/bs";
import { getDispName, getDispDate, nFormatter } from "../helper/conveter";
import "./PersonDetail.css";

function PersonDetail() {
    const { fullname } = useParams();
    const [person, setPerson] = useState("");
    const { currentUser, addFavorite, hasAddFavorite } = useContext(UserContext);
    const navigate = useNavigate();
//   person: { fullname, profileImgUrl, role, biography, birthday, 
//             nationalities, socialMedia, follower, works, relatedPeople }
//    where works is [{ id, coverImgUrl, title, publishTime, client, type } ...]
//    Where relatedPeople is [{ fullname, role, profileImgUrl} ...]
    
    useEffect(() => {
        async function getPerson() {
            let person = await ModelmagicaApi.getPerson(fullname);
            setPerson(person);
        }
        getPerson();
    },[fullname])

    if(!person) return <LoadingSpinner />;

    let relatedPeople = person.relatedPeople;

    function addFavButton() {
        return (
            <button onClick={handleAddFavorite} className="btn">
                <BsHeart /> Add to Favorites
            </button>
        )
    }

    function favButton() {
        return (
            <button onClick={handleFavorites} className="btn">
                <BsHeartFill /> Favorites
            </button>
        )
    }

    function handleAddFavorite() {
        addFavorite(fullname);
    }

    function handleFavorites() {
        navigate('/favorites');
    }
    
    return (
        <div className="personDetail">
            <div className="row">
                <div className="large-12 medium-12 small-12 columns" id="p-namediv">
                    <h3>{getDispName(person.fullname)}</h3>
                </div>
            </div>
            <div className="row">
                <div className="large-3 medium-5 small-12 columns">
                    <div id="model-left" className="text-center">
                        <div id="photo" className="text-center">

                        </div>
                        <img src={person.profileImgUrl}/>
                        <div className="photo-credit"></div>
                    </div>
                    {currentUser? 
                       (<div id="add-fav" className="EditButtonRow">
                            <div>
                                {hasAddFavorite(fullname)? favButton() : addFavButton() }
                            </div>
                        </div>) : null
                    }
                    <div className="p-leftinfo">
                        <h4>Role</h4>
                        {
                            person.role==="Model"?
                            <Link to={"/models"}>{person.role} </Link>
                            : <h5>{person.role}</h5>
                        }
                    </div>
                </div>
                <div className="large-7 medium-7 small-12 columns" id="p-centerdiv">
                    <div className="row" id="profile-tab">
                        <div className="small-12 columns">
                            <h4 className="bbottomline">Biography</h4>
                        </div>
                        <div className="small-12 columns" id="biodata">
                            {person.birthday?
                            <div>Birth Date: {getDispDate(person.birthday)} </div> : null
                            }
                            {person.nationalities?   
                            <div>Nationality: {person.nationalities} </div> : null
                            }
                        </div>
                        <div className="small-12 columns" id="biotxt">
                            <div>{person.biography} </div>
                        </div>
                    </div>
                    <div className="row" id="updatesHeader">
                        <h4 className="bbottomline">Updates</h4>
                    </div>
                    <div className="row workRow">
                        {person.works.length>0 ? 
                            person.works.map(w => (<WorkCardSmall key={w.id} work={w}/>)) : null
                        }
                    </div>
                </div>
                <div className="large-2 small-12 columns" id="p-rightdiv">
                    <div id="model-right" className="row">
                        <div id="socialLinks">
                            <h4>Social Media</h4>
                            {person.socialMedia? 
                                <div><a href={person.socialMedia} aria-label="instagram" target="_blank"><BsInstagram /></a> {nFormatter(person.follower)} </div>
                                : null
                            }
                        </div>
                        <div id="related-people-root">
                            <div className="related-people-head"><h4>Related People</h4></div>
                            <div className="related-people-list">
                                {relatedPeople.length > 0?
                                    relatedPeople.map(p => (<div className="relateCard" key={p.fullname} ><PersonCardSmall key={p.fullname} person={p}/></div>))
                                    : null
                                }
                            </div>
                            <a>see more</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PersonDetail;