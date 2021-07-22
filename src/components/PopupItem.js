import React from 'react'
import Popup from './Popup'

// Horse list single item
const PopupItem = ({ horse }) => {
    let trainersFemale = []
    let trainersMale = []

    horse.map((hors) => (
        hors[6] == 1 ? trainersFemale.push(hors) : trainersMale.push(hors)
    ))


    return (
        <div>
            <ol>
                <h3>Kvinnliga tränare: {trainersFemale.length}</h3>
                {trainersFemale.map((hors, index) => (
                    <li>{index + 1}. {hors[0]}:- {hors[1]} {hors[3]} år {hors[4] == 'v' ? 'Vallack' : hors[4] == 'h' ? 'Hingst' : 'Sto'} {hors[5]} {hors[8] == 1 ? 'A-Licens' : 'B-Licens'}</li>
                ))}
            </ol>
            <ol>
                <h3>Manliga tränare: {trainersMale.length}</h3>
                {trainersMale.map((hors, index) => (
                    <li>{index + 1}. {hors[0]}:- {hors[1]} {hors[3]} år {hors[4] == 'v' ? 'Vallack' : hors[4] == 'h' ? 'Hingst' : 'Sto'} {hors[5]} {hors[8] == 1 ? 'A-Licens' : 'B-Licens'}</li>
                ))}
            </ol>
        </div>
    )
}

export default PopupItem
