import React from "react";
import { Routes, Route } from "react-router-dom";

import Homepage from "../homepage/Homepage";
import SearchResult from "../common/SearchResult";
import WorkList from "../works/WorkList";
import WorkDetail from "../works/WorkDetail";
import UploadForm from "../works/UploadForm";
import ModelList from "../people/ModelList";
import PersonDetail from "../people/PersonDetail";
import ProfileForm from "../users/ProfileForm";
import FavoriteList from "../users/FavoriteList";
import SignupForm from "../auth/SignupForm";
import LoginForm from "../auth/LoginForm";
import PrivateRoute from "./PrivateRoute";

function RoutesAll({login, signup}) {
    return (
        <Routes>
            <Route exact path="/" element={<Homepage />} />
            <Route exact path="/search/:type" element={
                <SearchResult />} 
            />
            <Route exact path="/models" element={
                <ModelList />} 
            />
            <Route exact path="/works" element={
                <WorkList />} 
            />
            <Route exact path="/works/:id" element={
                <WorkDetail />}
            />
            <Route exact path="/people/:fullname" element={
                <PersonDetail />}
            />
            <Route exact path="/favorites" element={
                <PrivateRoute><FavoriteList /></PrivateRoute>}
            />
            <Route exact path="/upload" element={
                <PrivateRoute><UploadForm /></PrivateRoute>} 
            />
            <Route exact path="/profile" element={
                <PrivateRoute><ProfileForm /></PrivateRoute>} 
            />
            <Route exact path="/signup" element={<SignupForm signup={signup}/>} />
            <Route exact path="/login" element={<LoginForm login={login}/>} />
            <Route exact path="*" element={<Homepage />} />
        </Routes>
    )
}

export default RoutesAll;