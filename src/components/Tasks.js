import Task from './Task'

// Container of multiple tasks
const Tasks = ({ tasks, onDelete, onToggle, onShowHorses }) => {
    return (
        <>
          {tasks.map((task, i) => (
            <Task key={i} id={i} task={task} onDelete={onDelete} onToggle={onToggle} onShowHorses={onShowHorses} />
          ))}  
        </>
    )
}

export default Tasks