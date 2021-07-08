import { useState } from 'react'

const SetThreshold = ({ onSetApplicantThreshold, threshold }) => {

    const [Applicant_Threshold, setApplicantThreshold] = useState('')
    
    const onSubmit = (e) => {
        e.preventDefault()

        onSetApplicantThreshold ({ Applicant_Threshold })
    }

    return (
        <form id='add-form' className='add-form' onSubmit={onSubmit}>
            <div className='form-control threshold'>           
                <div>
                    <label>Ändra gränsvärde</label>
                    <input type='number' placeholder='11' value={Applicant_Threshold} required onChange={(e) => setApplicantThreshold(e.target.value)}/>
                    <p>Nuvarande gränsvärde: {threshold}</p>
                </div>
            </div>
            <input id='btn' className ='btn btn-block' type='submit' value='Ändra'></input>
        </form>
    )
}

export default SetThreshold
