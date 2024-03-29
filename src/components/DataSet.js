import { useState } from 'react'

// Form to add a new prop
const DataSet = ({ onAdd, onSuccess, retrainModel, onTrain }) => {
    const [Startsum_Lowest, setStartsum_Lowest] = useState('')
    const [Startsum_Highest, setStartSumHigh] = useState('')
    const [Age_Lowest, setAgeLow] = useState('')
    const [Age_Highest, setAgeHigh] = useState('')
    const [Distance, setDistance] = useState('')
    const [Start_Type, setStartType] = useState('')
    const [Mare, setGenderHorse] = useState(false)
    const [Addition, setAddition] = useState(false)
    const [First_Price, setFirstPrice] = useState('')
    const [Applicants, setApplicants] = useState('')
    const [Starting_Total, setStartingTotal] = useState('')
    const [Starting_Women, setStartingWomen] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()

        onAdd ({ Startsum_Lowest, Startsum_Highest, Age_Lowest, Age_Highest, Distance, Start_Type, 
            Mare, Addition, First_Price, Applicants, Starting_Total, Starting_Women })
    }
    
    return (
        <form id='add-form' className='add-form' onSubmit={onSubmit}>
            <h3 style={{textAlign: 'Center'}}>Fyll i fält och skicka för att uppdatera dataset</h3>
            <div>
                <div>
                    <div className='form-control'>
                        <label>Startsumma Lägsta</label>
                        <input type='number' placeholder='' value={Startsum_Lowest} required onChange={(e) => setStartsum_Lowest(e.target.value)} />
                    </div>
                    <div className='form-control'>
                        <label>Startsumma Högsta</label>
                        <input type='number' placeholder='' value={Startsum_Highest} required onChange={(e) => setStartSumHigh(e.target.value)}/>
                    </div>
                    <div className='form-control'>
                        <label>Ålder Lägsta</label>
                        <input type='number' placeholder='' min='0' value={Age_Lowest} required onChange={(e) => setAgeLow(e.target.value)} />
                    </div>
                    <div className='form-control'>
                        <label>Ålder Högsta</label>
                        <input type='number' placeholder='' max='12' value={Age_Highest} required onChange={(e) => setAgeHigh(e.target.value)}/>
                    </div>
                    <div className='form-control'>
                        <label>Sträcka</label>
                        <select name='Distance' placeholder='' value={Distance} required onChange={(e) => setDistance(e.target.value)}>
                            <option value='1640'>1640m</option>
                            <option value='2140'>2140m</option>
                            <option value='2640'>2640m</option>
                            <option value='3140'>3140m</option>
                        </select>
                    </div>
                </div>
                <div>
                    <div className='form-control'>
                        <label>Starttyp</label>
                        <select name='Starttype' placeholder='' value={Start_Type} onChange={(e) => setStartType(e.target.value)}>
                            <option value='0'>Ospecificerat</option>
                            <option value='1'>Voltstart</option>
                            <option value='2'>Autostart</option>
                        </select>
                    </div>
                    <div className='form-control'>
                        <label>Förstapris</label>
                        <input type='number' placeholder='' value={First_Price} required onChange={(e) => setFirstPrice(e.target.value)} />
                    </div>
                    <div className='form-control'>
                        <label>Antal Anmälda</label>
                        <input type='number' placeholder='' value={Applicants} required onChange={(e) => setApplicants(e.target.value)} />
                    </div>
                    <div className='form-control'>
                        <label>Antal startande</label>
                        <input type='number' placeholder='' value={Starting_Total} required onChange={(e) => setStartingTotal(e.target.value)} />
                    </div>
                    <div className='form-control'>
                        <label>Kvinnliga Tränare till Start</label>
                        <input type='number' placeholder='' value={Starting_Women} required onChange={(e) => setStartingWomen(e.target.value)} />
                    </div>
                    <div className='form-control form-control-check'>
                        <label>Stolopp</label>
                        <input 
                        type='checkbox'
                        checked={Mare}
                        value={Mare} 
                        onChange={(e) => setGenderHorse(e.currentTarget.checked)}/>
                    </div>
                    <div className='form-control form-control-check'>
                        <label>Tillägg</label>
                        <input 
                        type='checkbox'
                        checked={Addition}
                        value={Addition} 
                        onChange={(e) => setAddition(e.currentTarget.checked)}/>
                    </div>
                </div>
            </div>
            <input className ='btn btn-block' type='submit' value='Skicka'></input>
            <input className ='btn btn-block' id='retrainBtn' type='button' value='Träna Propifier' onClick={retrainModel}></input>
            {onSuccess && <span>Uppladdningen lyckades</span>}
            {onTrain && <span>Propifier uppdaterad</span>}
        </form>
    )
}

export default DataSet
