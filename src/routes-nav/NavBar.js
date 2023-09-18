import React, { useContext } from "react";
import UserContext from "../auth/UserContext";
import SearchContext from "../common/SearchContext";
import { NavLink } from "react-router-dom";
import './NavBar.css';

function NavBar({logout}) {
    const { currentUser } = useContext(UserContext);
    const { setSearchResult } = useContext(SearchContext);

    function loggedInNav() {
        return (
            <section>
                <li className="nav-item me-4">
                    <NavLink className="nav-link" exact to="/favorites">Favorites</NavLink>
                </li>
                <li className="nav-item me-4">
                    <NavLink className="nav-link" exact to="/profile">Profile</NavLink>
                </li>
                <li className="nav-item me-4">
                    <NavLink className="nav-link" onClick={logout} exact to="/">Log out {currentUser.username}</NavLink>
                </li>
            </section>
        )
    }

    function loggedOutNav() {
        return (
            <section>
                <li className="nav-item me-4">
                    <NavLink className="nav-link" exact to="/login">Login</NavLink>
                </li>
                <li className="nav-item me-4">
                    <NavLink className="nav-link" exact to="/signup">Sign Up</NavLink>
                </li>
            </section>
        )
    }


    return (
        <nav className="Navigation navbar navbar-expand-md">
            <div className="container-fluid">
                <NavLink className="navbar-brand" exact to="/">ModelMagica</NavLink>
                <ul class="navbar-nav ms-auto">
                    <li className="nav-item me-4">
                        <input type="text" placeholder="search by name or role"/>
                    </li>
                    <li className="nav-item me-4">
                        <button>Updates</button>
                    </li>
                    {currentUser? loggedInNav() : loggedOutNav()}
                </ul>
            </div>
        </nav>
    )
}

export default NavBar;