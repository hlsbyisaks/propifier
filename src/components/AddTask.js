import { useState } from 'react'

const AddTask = ({ onAdd }) => {
    const [Startsum_Lowest, setStartsum_Lowest] = useState('')
    const [Startsum_Highest, setStartSumHigh] = useState('')
    const [Age_Lowest, setAgeLow] = useState('')
    const [Age_Highest, setAgeHigh] = useState('')
    const [Distance, setDistance] = useState('')
    const [Start_Type, setStartType] = useState('')
    const [Mare, setGenderHorse] = useState(false)
    const [Addition, setAddition] = useState(false)
    const [First_Price, setFirstPrice] = useState('')
    
    const onSubmit = (e) => {
        e.preventDefault()


        if(!Startsum_Lowest) {
            alert('Please fill form')
            return
        }

        onAdd ({ Startsum_Lowest, Startsum_Highest, Age_Lowest, Age_Highest, Distance, Start_Type, 
            Mare, Addition, First_Price })
    }
    
    return (
        <form id='add-form' className='add-form' onSubmit={onSubmit}>
            <div>
                <div>
                    <div className='form-control'>
                        <label>Start Sum Low</label>
                        <input type='text' placeholder='' value={Startsum_Lowest} onChange={(e) => setStartsum_Lowest(e.target.value)} />
                    </div>
                    <div className='form-control'>
                        <label>Start Sum High</label>
                        <input type='text' placeholder='' value={Startsum_Highest} onChange={(e) => setStartSumHigh(e.target.value)}/>
                    </div>
                    <div className='form-control'>
                        <label>Minimum Age</label>
                        <input type='text' placeholder='' value={Age_Lowest} onChange={(e) => setAgeLow(e.target.value)} />
                    </div>
                    <div className='form-control'>
                        <label>Maximum Age</label>
                        <input type='text' placeholder='' value={Age_Highest} onChange={(e) => setAgeHigh(e.target.value)}/>
                    </div>
                </div>
                <div>
                <div className='form-control'>
                    <label>Distance</label>
                    <select name='Distance' placeholder='' value={Distance} onChange={(e) => setDistance(e.target.value)}>
                        <option value='1640'>1640m</option>
                        <option value='2140'>2140m</option>
                        <option value='2640'>2640m</option>
                        <option value='3140'>3140m</option>
                    </select>
                </div>
                    <div className='form-control'>
                        <label>Starting Type</label>
                        <select name='Starttype' placeholder='' value={Start_Type} onChange={(e) => setStartType(e.target.value)}>
                            <option value='0'>Unspecified</option>
                            <option value='1'>Voltstart</option>
                            <option value='2'>Autostart</option>
                        </select>
                    </div>
                    <div className='form-control'>
                        <label>First Price</label>
                        <input type='text' placeholder='' value={First_Price} onChange={(e) => setFirstPrice(e.target.value)} />
                    </div>
                    <div className='form-control form-control-check'>
                        <label>Mare Only</label>
                        <input 
                        type='checkbox'
                        checked={Mare}
                        value={Mare} 
                        onChange={(e) => setGenderHorse(e.currentTarget.checked)}/>
                    </div>
                    <div className='form-control form-control-check'>
                        <label>Addition</label>
                        <input 
                        type='checkbox'
                        checked={Addition}
                        value={Addition} 
                        onChange={(e) => setAddition(e.currentTarget.checked)}/>
                    </div>
                </div>
            </div>
            <input className ='btn btn-block' type='submit' value='Submit'></input>
        </form>
    )
}

export default AddTask
