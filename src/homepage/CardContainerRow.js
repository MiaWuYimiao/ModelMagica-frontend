import React from "react";
import WorkCardLarge from "../works/WorkCardLarge";
import PersonCardLarge from "../people/PersonCardLarge";

function CardContainerRow({ items }) {
    const category = Object.keys(items)[0];
    const Items = Object.values(items)[0];

    console.log("category: ", category);
    console.log("Items: ", Items);

    function workcards() {
        return (
            <section>
                {Items.map( item => ( <WorkCardLarge work={item}/>) )}
            </section>
        )
    }

    function peoplecards() {
        return (
            <section>
                {Items.map( item => ( <PersonCardLarge person={item}/>) )}
            </section>
        )
    }

    return (
        <div className="CardContainerRow ">
            <div className="row-body">
               {category==="works"? workcards() : peoplecards()}
            </div>
        </div>
    )
}

export default CardContainerRow;