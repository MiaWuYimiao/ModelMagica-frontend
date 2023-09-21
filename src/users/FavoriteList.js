import React, { useState, useEffect, useContext } from "react";
import ModelmagicaApi from "../api/api";
import UserContext from "../auth/UserContext";
import PersonCardSmall from "../people/PersonCardSmall";


function FavoriteList() {
    const { currentUser, deleteFavorite } = useContext(UserContext);
    //different from favoriteArtists state in App component
    //This state is array of artist object instead of a set of artist name
    const [favoriteArtists, setFavoriteArtists] = useState([]);


    useEffect( () => {
        async function getUserFavorites() {
            let favorites = await ModelmagicaApi.getFavorites(currentUser.username);
            setFavoriteArtists(favorites);
        }
        getUserFavorites();
    }, []);

    function handleClick(e) {
        deleteFavorite(e.target.value);
    }

    return (
        <div className="favList columns">
            <h1>Favorites</h1>
            {
                favoriteArtists.map((p,i) => (
                <div className="favorite-card" key={i}>
                    <PersonCardSmall person={p}/>
                    <button value={p.artist} onClick={handleClick}>delete</button>
                </div>
                ))
            }
            
        </div>
    );
}

export default FavoriteList;