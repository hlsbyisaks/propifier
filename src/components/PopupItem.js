import React from 'react'

// Horse list single item
const PopupItem = ({ horse }) => {
    return (
        <>
        <ol>
            {horse.map((hors, index) => (
                <li>{index + 1}. Häst: {hors[1]} Prispengar: {hors[0]} Ålder: {hors[3]} Kön: {hors[4]} Tränare: {hors[5]} Tränarstatus: {hors[8]}</li>
                ))}  
        </ol>
        </>
    )
}

export default PopupItem
