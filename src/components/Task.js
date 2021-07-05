import { FaTimes } from 'react-icons/fa'
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
            <h3>{year + "-" + month + "-" + day} Jägersro, { task.Startsum_Lowest }-{ task.Startsum_Highest }:- <FaTimes onClick={() => onDelete(task.id)} style ={{color: 'rgb(104, 111, 109)', cursor: 'pointer'}}/></h3>
            <p>{ task.Age_Lowest}-{task.Age_Highest} y/o</p>
            <p>{ task.Distance }m { Start_Type }</p>
            <p>First Price: {task.First_Price}:-</p>
            <p>{ task.Mare ? 'Mare Only' : '' }{ task.Mare && task.Addition ? ', ' : ''}{ task.Addition ? 'Addition' : ''} </p>
            <p>Predicted applicants: { task.predictApplicants }, { task.predict } proposition</p>
        </div>
    )
}

export default Task
