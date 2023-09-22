import React from "react";
import WorkCardLarge from "../works/WorkCardLarge";
import PersonCardLarge from "../people/PersonCardLarge";
import "./CardContainerRow.css";

function CardContainerRow({ items }) {
    const category = Object.keys(items)[0];
    const Items = Object.values(items)[0];

    function workcards() {
        return (
            Items.slice(0,6).map( item => ( <WorkCardLarge key={item.id} work={item}/>) )
        )
    }

    function peoplecards() {
        return (
            Items.slice(0,6).map( item => ( <PersonCardLarge key={item.fullname} person={item}/>) )
        )
    }

    return (
        <div className="CardContainerRow">
            <div className="slickPre rowPre slickNav"><i className="fas fa-arrow-left"></i></div>
            <div className="row-slider">
                <div className="sb-grid sb-grid--6">
                    {category==="works"? workcards() : peoplecards()}
                </div>
            </div>
            <div className="slickNext rowNext slickNav"><i className="fas fa-arrow-right"></i></div>
        </div>
    )
}

export default CardContainerRow;