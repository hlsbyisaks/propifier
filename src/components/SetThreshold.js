import { useState } from 'react'

const SetThreshold = ( onAdd ) => {

    const [Applicant_Threshold, setApplicantThreshold] = useState('')
    
    const onSubmit = (e) => {
        e.preventDefault()

        onAdd ({ Applicant_Threshold })
    }

    return (
        <form id='add-form' className='add-form' onSubmit={onSubmit}>
            <div className='form-control threshold'>           
                <div>
                    <label>Ändra gränsvärde</label>
                    <input type='number' placeholder='11' value={Applicant_Threshold} required onChange={(e) => setApplicantThreshold(e.target.value)}/>
                </div>
            </div>
            <input id='btn' className ='btn btn-block' type='submit' value='Ändra'></input>
        </form>
    )
}

export default SetThreshold
