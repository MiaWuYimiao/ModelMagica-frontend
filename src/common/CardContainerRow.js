import React from "react";
import WorkCardLarge from "../works/WorkCardLarge";
import PersonCardLarge from "../people/PersonCardLarge";

function CardContainerRow({ items }) {
    const category = Object.keys(items)[0];
    const Items = Object.values(items)[0];

    function workcards() {
        return (
            <section>
                {Items.map( item => ( <WorkCardLarge key={item.id} work={item}/>) )}
            </section>
        )
    }

    function peoplecards() {
        return (
            <section>
                {Items.map( item => ( <PersonCardLarge key={item.fullname} person={item}/>) )}
            </section>
        )
    }

    return (
        <div className="CardContainerRow sliderContainer">
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