import React from 'react'
import { FaTimes } from 'react-icons/fa'
import PopupItem from './PopupItem'

// Display list of available horses
const Popup = ({ horseList, horses, onSetHorses }) => {
    let horseTotal = 0
    horses.map((horse, index) => (
        horseTotal = horse.length
    ))

    return (
            <div className="popupContainer flex">
                <div><h3 className='flex'>Tillgängliga hästar: {horseTotal}<FaTimes onClick={() => onSetHorses('')} style ={{color: 'rgb(104, 111, 109)', cursor: 'pointer'}}/></h3></div>
                {horses.map((horse, index) => (
                    <PopupItem key={index} horse={horse} />
                ))}          
            </div>
    )
}

export default Popup
