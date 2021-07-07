import { FaTimes } from 'react-icons/fa'
import { BsCheck } from 'react-icons/bs'
import { GiTrophyCup } from 'react-icons/gi'
import { useState } from 'react'

const Task = ({ task, onDelete, onToggle }) => {

    var Start_Type
    if (task.Start_Type == '0') {
        Start_Type = 'Unspecified'
    } else if( task.Start_Type == '1' ) {
        Start_Type = 'Voltstart'
    } else {
        Start_Type = 'Autostart'
    } 
    const tempDate = new Date()
    const [year, month, day] = [tempDate.getFullYear(), tempDate.getMonth()+1, tempDate.getDate()];

    return (
        <div className={`task ${task.reminder ?
        'reminder' : ''}`} onDoubleClick={() => onToggle(task.id)}>
            <h3>Jägersro Proposition# {year + "-" + month + "-" + day}<FaTimes onClick={() => onDelete(task.id)} style ={{color: 'rgb(104, 111, 109)', cursor: 'pointer'}}/></h3>
            <div>
                
                    <p>{ task.Startsum_Lowest }-{ task.Startsum_Highest }:- </p>
                    <p>{ task.Age_Lowest}-{task.Age_Highest} år</p>
                    <p>{ task.Distance }m { Start_Type }</p>
                    <p><GiTrophyCup></GiTrophyCup> <br></br>{task.First_Price}:-</p>
                
                
                    <p>{ task.Mare ? 'Stolopp' : '' }{ task.Mare && task.Addition ? ', ' : ''}{ task.Addition ? 'Tillägg' : ''} </p>
                    <p>Prel. anm.: { task.predictApplicants }</p>
                    <p>{ task.predict ? <BsCheck style ={{color: 'green'}}></BsCheck> : <BsCheck style ={{color: 'red'}}></BsCheck>}</p>
                
            </div>
        </div>
    )
}

export default Task
