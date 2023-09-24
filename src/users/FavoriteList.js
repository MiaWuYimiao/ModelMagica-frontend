import React, { useState, useEffect, useContext } from "react";
import ModelmagicaApi from "../api/api";
import UserContext from "../auth/UserContext";
import PersonCardSmall from "../people/PersonCardSmall";
import { RxCross2 } from "react-icons/rx";
import "./FavoriteList.css";


function FavoriteList() {
    const { currentUser, deleteFavorite, favoriteArtists } = useContext(UserContext);
    //different from favoriteArtists state in App component
    //This state is array of artist object instead of a set of artist name
    const [favoriteArtistsObj, setFavoriteArtistsObj] = useState([]);


    useEffect( () => {
        async function getUserFavorites() {
            let favorites = await ModelmagicaApi.getFavorites(currentUser.username);
            setFavoriteArtistsObj(favorites);
        }
        getUserFavorites();
    }, [handleClick]);

    function handleClick(e) {
        console.log(e.target.value);
        deleteFavorite(e.target.value);
    }

    return (
        <div className="favList columns">
            <div className="listHeader">
                <h3>Favorites</h3>
            </div>
            <div className="listContainer">
            {
                favoriteArtistsObj.map((p,i) => (
                <div className="favorite-card" key={i}>
                    <div className="favorite-card-left">
                        <PersonCardSmall person={p}/>
                    </div>
                    <div className="favorite-card-right">
                        <button value={p.artist} onClick={handleClick} className="btn"><RxCross2 /> </button>
                    </div>
                </div>
                ))
            }
            </div>
        </div>
    );
}

export default FavoriteList;