import Task from './Task'
import { AiOutlineInfoCircle } from 'react-icons/ai'

const Tasks = ({ tasks, onDelete, onToggle }) => {
    return (
        <>
          {/* <AiOutlineInfoCircle cursor='pointer'></AiOutlineInfoCircle> */}
          {tasks.map((task) => (
          <Task key={task.id} task={task} onDelete={onDelete} onToggle={onToggle} />
          ))}  
        </>
    )
}

export default Tasks