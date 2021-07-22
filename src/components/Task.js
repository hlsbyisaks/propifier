import { FaTimes } from 'react-icons/fa'
import { BsCheck } from 'react-icons/bs'
import { GiTrophyCup } from 'react-icons/gi'
import { RiFileList2Line } from 'react-icons/ri'
import ReactTooltip from 'react-tooltip'

// Single task component
const Task = ({ task, onDelete, onToggle, onShowHorses }) => {

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
            <h3><div><RiFileList2Line data-tip='Lista lämpliga hästar' data-type='info' data-effect='solid' onClick={() => onShowHorses(task.id)} style ={{marginRight: '5px', marginBottom: '-3px', color: 'rgb(104, 111, 109)', cursor: 'pointer'}}/>Proposition #{task.id} {year + "-" + month + "-" + day}</div><FaTimes onClick={() => onDelete(task.id)} style ={{color: 'rgb(104, 111, 109)', cursor: 'pointer'}}/></h3>
            <ReactTooltip />
            <div>
                
                <p data-tip='Startsumma' data-type='info' data-effect='solid'>{ task.Startsum_Lowest }-{ task.Startsum_Highest }:- </p>
                <ReactTooltip />
                <p data-tip='Ålder' data-type='info' data-effect='solid'>{ task.Age_Lowest}-{task.Age_Highest} år</p>
                <ReactTooltip />
                <p data-tip='Sträcka & Starttyp' data-type='info' data-effect='solid'>{ task.Distance }m { Start_Type }</p>
                <ReactTooltip />
                <p data-tip='Förstapris' data-type='info' data-effect='solid'><GiTrophyCup></GiTrophyCup> <br></br>{task.First_Price}:-</p>
                <ReactTooltip />
                <p data-tip='Loppkriterier' data-type='info' data-effect='solid'>{ task.Mare ? 'Stolopp' : '' }{ task.Mare && task.Addition ? ', ' : ''}{ !task.Mare && !task.Addition ? '-' : ''}{ task.Addition ? 'Tillägg' : ''} </p>
                <ReactTooltip />
                <p data-tip='Preliminärt antal anmälningar' data-type='info' data-effect='solid'>{ task.predictApplicants }</p>
                <ReactTooltip />
                <p data-tip='Preliminärt antal kvinnor till start' data-type='info' data-effect='solid'>{ task.predictApplicantsFemale }</p>
                <ReactTooltip />
                <p data-tip='Grön = bra, röd = dålig. Baserat på antal anmälningar' data-type='info' data-effect='solid'>{ task.predict ? <BsCheck size={24} style ={{color: 'green'}}></BsCheck> : <BsCheck size={24} style ={{color: 'red'}}></BsCheck>}</p>
                <ReactTooltip />
                    
            </div>
        </div>
    )
}

export default Task
