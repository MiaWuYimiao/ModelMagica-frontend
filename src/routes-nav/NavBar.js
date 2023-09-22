import React, { useContext, useState } from "react";
import UserContext from "../auth/UserContext";
import SearchContext from "../common/SearchContext";
import { NavLink, useNavigate } from "react-router-dom";
import { InputGroup, FormControl, Button, Dropdown } from 'react-bootstrap';
import { CiSearch } from "react-icons/ci";
import { SlGrid, SlHeart } from "react-icons/sl";
import ModelmagicaApi from "../api/api";
import './NavBar.css';

function NavBar({logout}) {
    const { currentUser } = useContext(UserContext);
    const { setSearchResult } = useContext(SearchContext);

    const navigate = useNavigate();

    // Handle the search from the search box
    const [searchTerm, setSearchTerm] = useState("");

    function handleChange(evt) {
        evt.persist();
        setSearchTerm(evt.target.value);
        
    }

    async function handleSearchClick() {
        let term = searchTerm.trim();
        let data = {fullname: term, role:term};
        let people = await ModelmagicaApi.getPeople(data);
        setSearchResult(people);
        navigate('/search/people');
    }

    // Handle the search from the dropdown boxes
    async function handleSelect(e) {
        let data = {type: e};
        let works = await ModelmagicaApi.getWorks(data);
        setSearchResult(works);
        navigate('/search/works');
    }

    function loggedInNav() {
        return (
            <>
                <li className="nav-item me-4">
                    <NavLink className="nav-link" exact to="/favorites"><SlHeart/>  Favorites</NavLink>
                </li>
                <li className="nav-item me-4">
                    <NavLink className="nav-link" exact to="/profile">Profile</NavLink>
                </li>
                {currentUser.isAdmin?
                    (<li className="nav-item me-4">
                        <NavLink className="nav-link" exact to="/upload">Upload</NavLink>
                    </li>) : null
                }
                <li className="nav-item me-4">
                    <NavLink className="nav-link" onClick={logout} exact to="/">Log out {currentUser.username}</NavLink>
                </li>
            </>
        )
    }

    function loggedOutNav() {
        return (
            <>
                <li className="nav-item me-4">
                    <NavLink className="nav-link" exact to="/login">Login</NavLink>
                </li>
                <li className="nav-item me-4">
                    <NavLink className="nav-link" exact to="/signup">Sign Up</NavLink>
                </li>
            </>
        )
    }


    return (
        <nav className="Navigation navbar navbar-expand-md">
            <div className="container-fluid">
                <NavLink className="navbar-brand" exact to="/">ModelMagica</NavLink>
                <ul class="navbar-nav ms-auto">
                    <li className="nav-item me-4">
                        <InputGroup >
                            <FormControl 
                                placeholder="Search by name or role" 
                                type="text"
                                onChange={handleChange}
                                name="searchTerm"
                                value={searchTerm}
                            />
                            <Button onClick={handleSearchClick} variant="outline-secondary"><CiSearch /></Button>
                        </InputGroup>
                    </li>
                    <li className="nav-item me-4">
                        <Dropdown onSelect={handleSelect}>
                            <Dropdown.Toggle variant="second" id="dropdown-basic">
                                <SlGrid />  Updates
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item eventKey="Ediorial">Ediorial</Dropdown.Item>
                                <Dropdown.Item eventKey="Shows">Shows</Dropdown.Item>
                                <Dropdown.Item eventKey="Magazine Covers">Magazine Covers</Dropdown.Item>
                                <Dropdown.Item eventKey="Advertising">Advertising</Dropdown.Item>
                                <Dropdown.Item eventKey="Social Media">Social Media</Dropdown.Item>
                                <Dropdown.Item eventKey="Lookbooks/Catalogs">Lookbooks/Catalogs</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </li>
                    {currentUser? loggedInNav() : loggedOutNav()}
                </ul>
            </div>
        </nav>
    )
}

export default NavBar;