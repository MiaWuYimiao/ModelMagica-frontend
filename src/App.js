import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { isExpired, decodeToken } from "react-jwt";
import NavBar from './routes-nav/NavBar';
import RoutesAll from './routes-nav/RoutesAll';
import UserContext from './auth/UserContext';
import SearchContext from './common/SearchContext';
import useLocalStorage from './hooks/useLocalStorage';
import ModelmagicaApi from "./api/api";
import background from "./img/image.png";

// Key name for storing token in localStorage for "remember me" re-login
export const TOKEN_STORAGE_ID = "modelmagica-token";

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [favoriteArtists, setFavoriteArtists] = useState(new Set([]));

  useEffect( () => {
    async function getCurrentUser() {
      if(token) {
        try {
          let decodedToken = decodeToken(token);
          ModelmagicaApi.token = token;
          let res = await ModelmagicaApi.getCurrentUser(decodedToken.username);
          setCurrentUser(res);
          let resFav = await ModelmagicaApi.getFavorites(decodedToken.username);
          console.log(resFav);
          setFavoriteArtists(oldArtist => (new Set(resFav.map(o => (o.artist)))));
          return {success: true};
        } catch(err) {
          return {success:false, err};
        }
      }
    }
    getCurrentUser();
  }, [token]);


  function logout() {
    setCurrentUser(null);
    setToken(null);
    setFavoriteArtists(new Set([]));
  }

  async function login(loginForm) {
    try {
      const token = await ModelmagicaApi.login(loginForm);
      setToken(token);
      return {success: true};
    } catch(err) {
      console.log("login error:", err);
      return {success:false, err};
    }
  }

  async function signup(signupForm) {
    try {
      const token = await ModelmagicaApi.signup(signupForm);
      setToken(token);
      return {success: true};
    } catch(err) {
      console.log("signup error:", err);
      return {success:false, err};
    }
  }

  function hasAddFavorite(artist) {
    console.log("favArtists", favoriteArtists);
    return favoriteArtists.has(artist)
  }

  async function addFavorite(artist) {
    try {
      ModelmagicaApi.addFavorite(currentUser.username, artist);
      setFavoriteArtists(oldArtists => (new Set([...oldArtists, artist])))
      return {success: true};
    } catch(err) {
      return {success:false, err};
    }
  }

  async function deleteFavorite(artist) {
    try {
      ModelmagicaApi.deleteFavorite(currentUser.username, artist);
      setFavoriteArtists(oldArtists => (new Set([...oldArtists]).delete(artist)));
      return {success: true};
    } catch(err) {
      return {success:false, err};
    }
  }

  return (
    <UserContext.Provider value={{currentUser, setCurrentUser, hasAddFavorite, addFavorite, deleteFavorite}}>
      <SearchContext.Provider value={{searchResult, setSearchResult}}>
        <div className="App">
          <BrowserRouter>
            <NavBar logout={logout}/>
            <div className="Route" >
              <RoutesAll signup={signup} login={login}/>
            </div>
          </BrowserRouter >
        </div>
      </SearchContext.Provider>
    </UserContext.Provider>
  );
}

export default App;