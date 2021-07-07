import Task from './Task'
import { AiOutlineInfoCircle } from 'react-icons/ai'

/* const info = () => {

} */

const Tasks = ({ tasks, onDelete, onToggle }) => {
    return (
        <>
          <AiOutlineInfoCircle /* onClick={() => info()} */ cursor='pointer'></AiOutlineInfoCircle>
          {tasks.map((task) => (
          <Task key={task.id} task={task} onDelete={onDelete} onToggle={onToggle} />
          ))}  
        </>
    )
}

export default Tasks