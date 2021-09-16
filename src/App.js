import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import SetThreshold from './components/SetThreshold'
import Popup from './components/Popup'
import DataSet from './components/DataSet'
import { useState, useEffect } from "react"

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [threshold, displayThreshold] = useState('11')
  const [showDataSet, setShowDataSet] = useState(false)
  const [tasks, setTasks] = useState([])
  const [horses, setHorses] = useState([])
  const [successMsg, setSuccessMsg] = useState(false)
  const [onTrain, setOnTrain] = useState(false)
  


  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  // Fetch suitable horses
  const fetchHorses = async (id) => {

    const res1 = await fetchTask(id)

    const res = await fetch('https://aakermount.appspot.com/gethorsedata', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(res1)
    })
    const data = await res.json()
    var horseSplit = []
    data.horses.map((horse) => (
      horseSplit.push(horse.split(':'))
    ))
    setHorses([horseSplit])
  }

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
    setApplicantThreshold({Applicant_Threshold:'11'})
    sleep(200)
    retrainModel()
  }, [])

  // Fetch Tasks
  const fetchTasks = async () => {
    // const res = await fetch('/Tasks')
    // const data = await res.json()

    // return data
    return tasks;
  }

  // Fetch Task
  const fetchTask = async (id) => {
    //Möjligt fel
    return tasks[id]
  }

  //Add Task
  const addTask = async (task) => {
    
    console.log("This is the task object", task)
    let resArr = []
    resArr.push(task)

    const resCheckProp = await fetch('https://aakermount.appspot.com/predict', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(resArr)
    })

    const resApplicants = await fetch('https://aakermount.appspot.com/predictApplicants', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(resArr)
    })

    const resApplicantsFemale = await fetch('https://aakermount.appspot.com/predictApplicantsFemale', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(resArr)
    })

    let data = task
    const dataCheckProp = await resCheckProp.json()
    const dataApplicants = await resApplicants.json()
    const dataApplicantsFemale = await resApplicantsFemale.json()
    data['predict'] = dataCheckProp.prediction[0]
    data['predictApplicants'] = dataApplicants.prediction[0]
    data['predictApplicantsFemale'] = dataApplicantsFemale.prediction[0]

    console.log("tasks after add", [data, ...tasks])
    setTasks([data, ...tasks])
  }

  //Delete Task
  const deleteTask = async (id) => {
    const t = JSON.parse(JSON.stringify(tasks))
    t.splice(id, 1)
    
    setTasks(t)
  }

  //Toggle Reminder
    const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)

    setTasks(tasks.map((task) => task.id === id 
    ? { ...task, reminder: !task.reminder } : task))
  }

  
  //Update Applicant Threshold
  const setApplicantThreshold = async (input) => {
    //Get data from DB
    const resDB = await fetch('https://aakermount.appspot.com/getdbdata')
    const dataDB = await resDB
    
    //Update model with new applicant threshold
    console.log(JSON.stringify(input))

    const res = await fetch('https://aakermount.appspot.com/update', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(input)
    })

    const data = await res.json()
    displayThreshold(data.Antal)
  }

  //Add prop to DB
  const addDataSet = async (input) => {
    input['Mare'] = input['Mare'] ? '1' : '0'
    input['Addition'] = input['Addition'] ? '1' : '0'
    console.log(input)
    const res = await fetch('https://aakermount.appspot.com/updateDataSet', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(input)
    })

    const resDB = await fetch('https://aakermount.appspot.com/getdbdata')
    const dataDB = await resDB

    const data = await res.json()
    if (data) {
      setSuccessMsg(true)
      setTimeout(() => {
        setSuccessMsg(false)
      }, 3000)
    } 
  }

  const retrainModel = async () => {
    const res = await fetch('https://aakermount.appspot.com/retrainModel')
    const data = await res.json()
    console.log(data.response)
    if (data) {
      setOnTrain(true)
      setTimeout(() => {
        setOnTrain(false)
      }, 3000)
    }
  }

  return (
    <div className="container">
      <div className='ill_horse' alt='horse illustration'></div>
      <Header
        onAdd={() => setShowAddTask(!showAddTask) & setShowDataSet(false)} showAdd={showAddTask}
        onDataSet={() => setShowDataSet(!showDataSet) & setShowAddTask(false)} showDataSet={showDataSet}/>
      {showAddTask && <SetThreshold threshold={threshold} onSetApplicantThreshold={setApplicantThreshold} />}
      {showAddTask && <AddTask onAdd={addTask}/>}
      {showDataSet && <DataSet onAdd={addDataSet} onSuccess={successMsg} retrainModel={retrainModel} onTrain={onTrain}/>}
      {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} onShowHorses={fetchHorses}/> : 'Det finns inga propositioner att visa.'}
      {horses.length > 0 ? <Popup horses={horses} onSetHorses={setHorses} onShowHorses={fetchHorses}/> : ''}
    </div>
  );
}



export default App;
