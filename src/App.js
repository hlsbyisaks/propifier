import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Stats from './components/showStats'
import SetThreshold from './components/SetThreshold'
import { useState, useEffect } from "react"

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [showStats, setShowStats] = useState(false)

  const [tasks, setTasks] = useState([])


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
    const res = await fetch(`/Tasks${id}`)
    const data = await res.json()

    return data
  }

  //Add Task
  const addTask = async (task) => {
    console.log(JSON.stringify(task))
    const res = await fetch('/Tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task)
    })

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

    const data = await res.json()

    const dataCheckProp = await resCheckProp.json()
    const dataApplicants = await resApplicants.json()
    data['predict'] = dataCheckProp.prediction[0]
    data['predictApplicants'] = dataApplicants.prediction[0]
    console.log(data)

    setTasks([...tasks, data])
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
    //Add Task
    const setApplicantThreshold = async (task) => {
      console.log(JSON.stringify(task))
  
      const res = await fetch('http://localhost:4000/setApplicantThreshold', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(res)
      })

      const data = await res.json()

    const dataCheckProp = await res.json()
    console.log(data)

    }

  return (
    <div className="container">
      <svg x="0px" y="0px" viewBox="0 0 910 210" preserveAspectRatio="none" className="background_svg">
        <path d ="M0,0c270.6,0,298.2,209.9,454,209.9s183.4-209.9,454-209.9z"></path>
      </svg>
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} 
              onStats={() => setShowStats(!showStats)} showStats={showStats}/>
      {showStats && <Stats/>}
      {showAddTask && <SetThreshold onAdd={setApplicantThreshold}/>}
      {showAddTask && <AddTask onAdd={addTask}/>}
      {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : 'No props to show'}
    </div>
  );
}



export default App;
