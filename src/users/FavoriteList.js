import React, { useState, useEffect, useContext } from "react";
import ModelmagicaApi from "../api/api";
import UserContext from "../auth/UserContext";


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

    return (
        <div className="favList columns">
            <h1>Favorite List page</h1>
        </div>
    );
}

export default FavoriteList;