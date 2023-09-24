import React, { useContext, useState, useEffect } from "react";
import "./Homepage.css";
import ModelmagicaApi from "../api/api"
import { Link } from "react-router-dom";
import UserContext from "../auth/UserContext";
import CardContainerRow from "../common/CardContainerRow";
import LoadingSpinner from "../common/LoadingSpinner";
import {worksData, peopleData} from "../helper/data";

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
          //let works = worksData;
          setWorks(works);
      }
      async function getPeople() {
        const data = {role: "Model"}
        let people = await ModelmagicaApi.getPeople(data);
        //let people = peopleData;
        setPeople(people);
    }
      getPeople();
      getWorks();
  },[])



  if(!works || !people) {
      return <LoadingSpinner />
  }

  return (
      <div className="Homepage">
          <div id="TrendingRow" className="fullWidth section" >
            <div className="sb-container">
              <div className="sb-container-header">
                <h2 className="sb-title"> Trending</h2>
                <Link to="/works">SEE ALL </Link>
              </div>
            </div>
            <div className="trendsliderContainter">
              {works.length?
                <CardContainerRow items={{works}}/>
                : <p className="lead">Sorry, no results were found!</p>
              }
            </div>

          </div>
          <div id="ModelsRow" className="fullWidth section" >
            <div className="sb-container">
              <div className="sb-container-header">
                <h2 className="sb-title"> Models</h2>
                <Link to="/models">SEE ALL </Link>
              </div>
            </div>
            <div className="trendsliderContainter">
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