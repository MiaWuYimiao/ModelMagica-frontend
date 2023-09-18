import React, { useContext, useState, useEffect } from "react";
import "./Homepage.css";
import ModelmagicaApi from "../api/api"
import UserContext from "../auth/UserContext";
import CardContainerRow from "./CardContainerRow";
import LoadingSpinner from "../common/LoadingSpinner";

/** Homepage of site.
 *
 * Shows people list and work list
 *
 * Routed at /
 *
 * Routes -> Homepage
 */

function Homepage() {
  const { currentUser } = useContext(UserContext);
  console.debug("Homepage", "currentUser=", currentUser);

  const [works, setWorks] = useState([]);
  const [people, setPeople] = useState([]);

  useEffect(() => {
      async function getWorks() {
          let works = await ModelmagicaApi.getWorks();
          setWorks(works);
      }
      getWorks();
  },[])

  useEffect(() => {
    async function getPeople() {
        const data = {role: "Model"}
        let people = await ModelmagicaApi.getPeople(data);
        setPeople(people);
    }
    getPeople();
},[])

  if(!works || !people) {
      return <LoadingSpinner />
  }

  return (
      <div className="Homepage">
        <div className="container text-center">
          <div>
            <h2>Trending</h2>
            {works.length?
              <CardContainerRow items={{works}}/>
              : <p className="lead">Sorry, no results were found!</p>
            }
          </div>
          <div>
            <h2>Models</h2>
            {people.length?
              <CardContainerRow items={{people}}/>
              : <p className="lead">Sorry, no results were found!</p>
            }
          </div>
        </div>
      </div>
  );
}

export default Homepage;