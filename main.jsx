import { createRoot } from 'react-dom/client'
import './style.css'
import TasksContainer from './tasksContainer.jsx'
createRoot(document.getElementById('root')).render(
    <TasksContainer />
)
