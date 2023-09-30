import React, { useState } from "react";
import {getDispName} from "../helper/conveter"


function ImageAdd({key, image, crew, setImageCrew }) {
    const [checkedState, setCheckedState] = useState(
        new Array(crew.length).fill(true)
    );

    function handleOnChange(position) {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );

        setCheckedState(updatedCheckedState);
        setImageCrew((oldList) => {
            let objIndex = oldList.findIndex((obj => obj.url === image));
            oldList[objIndex].crew = updatedCheckedState;
            return oldList;
        });
    }

    return (
        <div className="card">
            <div className="card-body" style={{display: "flex"}}>
                <img src={image} width="90px" height="90px" alt=""></img>
                <div className="ps-3">
                    {crew.map((person, index) => (
                        <label className="ps-2">
                            <input type="checkbox" 
                                    id={`custom-checkbox-${index}`}
                                    name={person.fullname}
                                    value={person.fullname} 
                                    checked={checkedState[index]}
                                    onChange={() => handleOnChange(index)}
                            />
                            <label htmlFor={`custom-checkbox-${index}`}>{getDispName(person.fullname)}</label>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ImageAdd;