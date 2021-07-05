import { useState } from 'react'

const SetThreshold = ( onAdd) => {

    const [Applicant_Threshold, setApplicantThreshold] = useState('')
    
    const onSubmit = (e) => {
        e.preventDefault()


        if(!Applicant_Threshold) {
            alert('Var vänlig och fyll i önskad tröskel')
            return
        }

        onAdd ({ Applicant_Threshold })
    }

    return (
        <form id='add-form' className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Sätt tröskel för antal anmälda</label>
                <input type='text' placeholder='' value={Applicant_Threshold} onChange={(e) => setApplicantThreshold(e.target.value)}/>
            </div>
            <input className ='btn btn-block' type='submit' value='Submit'></input>

        </form>
    )
}

export default SetThreshold
