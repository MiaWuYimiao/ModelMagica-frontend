import React from "react";

function PersonCardSmall({person}) {
    let myStyle={
        backgroundImage: `url(${person.profileImgUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        height: "200px"
    };

    return (
        <div className="personCardSmall">
            <div style={myStyle}></div>
            <div>
                <h4>{person.artist}</h4>
                <h5>{person.role}</h5>
            </div>
        </div>
    );
}

export default PersonCardSmall;