import { useState } from "react"
import { Button, Table } from "reactstrap"
import { TaskEdit } from "./TaskEdit"

export const TaskAdmin = ({taskObject, getAllTasks}) => {
    const [isChecked, setIsChecked] = useState(false)
    const [task, setTasks] =useState([])
    const [formActive, updateFormActive] = useState(false)

    const handleClick = (evt) => {
        evt.preventDefault()
        setIsChecked(true)
    }

    const deleteButton = () => {
        return <Button size="sm" onClick={() => {
            return fetch (`http://localhost:8088/tasks/${taskObject.id}`, {
                    method: "DELETE"
                        })
                    .then(() => {
                    getAllTasks()
                })
            }} className="ticket_delete">Delete</Button>
    }

    

    const taskForm = () => {
        if (formActive) {
            return <> <h5>Edit Task</h5>
            <div><TaskEdit updateFormActive={updateFormActive} getAllTasks={getAllTasks} taskObject={taskObject} /></div>
            <Button onClick={() => updateFormActive(false) }>Nevermind</Button></>
        }
        else {
            return ""
        }
    }

    return <>
    
    
        <tr>
        
            
            <td>
            <input type="checkbox" onChange={
                    (evt) => handleClick(evt)}
            />
            <svg className={`checkbox ${isChecked ? "checkbox--active" : ""}`}
            aria-hidden="true"
            viewBox="0 0 15 11"
            fill="none">
                <path
                    d="M1 4.5L5 9L14 1"
                    strokeWidth="2"
                    stroke={isChecked ? "#fff" : "none"} />
            </svg>
            </td>
            <td>{taskObject.description}</td>
             <td>{deleteButton()}</td>
             <td><Button size="sm" onClick={() => updateFormActive(true) }>Edit</Button></td>
            
        </tr>
        {taskForm()}
    </>
}

