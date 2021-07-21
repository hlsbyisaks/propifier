import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import SetThreshold from './components/SetThreshold'
import Popup from './components/Popup'
import { useState, useEffect } from "react"

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [threshold, displayThreshold] = useState('11')
  const [horseList, setHorseList] = useState(true)
  const [tasks, setTasks] = useState([])
  const [horses, setHorses] = useState([])


  // Fetch suitable horses
  const fetchHorses = async (id) => {

    const res1 = await fetchTask(id)

    const res = await fetch('http://localhost:4000/gethorsedata', {
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
    console.log(horseSplit)

    //console.log(JSON.stringify(task))
    //setHorses([data.horses])
    setHorses([horseSplit])
  }

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('/Tasks')
    const data = await res.json()

    return data
  }

  // Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`/Tasks/${id}`)
    const data = await res.json()
    console.log(data)
    return data
  }

  //Add Task
  const addTask = async (task) => {
    

    let resArr = []
    resArr.push(task)

    const resCheckProp = await fetch('http://localhost:4000/predict', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(resArr)
    })

    const resApplicants = await fetch('http://localhost:4000/predictApplicants', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(resArr)
    })

    const resApplicantsFemale = await fetch('http://localhost:4000/predictApplicantsFemale', {
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

    const res = await fetch('/Tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data)
    })

    data = await res.json()

    setTasks([data, ...tasks])
  }

  //Delete Task
  const deleteTask = async (id) => {
    await fetch(`/Tasks/${id}`, {
      method: 'DELETE'
    })

    setTasks(tasks.filter((task) => task.id !== id))
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
    const resDB = await fetch('http://localhost:4000/getdbdata')
    const dataDB = await resDB
    console.log(dataDB)
    
    //Update model with new applicant threshold
    console.log(JSON.stringify(input))

    const res = await fetch('http://localhost:4000/update', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(input)
    })

    const data = await res.json()
    displayThreshold(data.Antal)
    console.log(data)

  }

  return (
    <div className="container">
      <div className='ill_horse' alt='horse illustration'></div>
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
      {horses.length > 0 ? <Popup horses={horses} onSetHorses={setHorses} onShowHorses={fetchHorses}/> : ''}
      {showAddTask && <SetThreshold threshold={threshold} onSetApplicantThreshold={setApplicantThreshold} />}
      {showAddTask && <AddTask onAdd={addTask}/>}
      {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} onShowHorses={fetchHorses}/> : 'Det finns inga propositioner att visa.'}
    </div>
  );
}



export default App;
