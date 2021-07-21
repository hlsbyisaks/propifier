import Task from './Task'

// Container of multiple tasks
const Tasks = ({ tasks, onDelete, onToggle, onShowHorses }) => {
    return (
        <>
          {tasks.map((task) => (
            <Task key={task.id} task={task} onDelete={onDelete} onToggle={onToggle} onShowHorses={onShowHorses} />
          ))}  
        </>
    )
}

export default Tasks