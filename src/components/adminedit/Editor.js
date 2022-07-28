import { useEffect, useState } from "react"
import { Button, Table } from "reactstrap"
import { TaskAdmin, TaskEdit } from "./TaskAdmin"
import { TaskForm } from "./TaskForm"


export const Editor = () => {
    const [tasks, setTasks] = useState([])
    const [formActive, updateFormActive] = useState(false)

    const localYouDoUser = localStorage.getItem("youdo_user")
    const youdoUserObject = JSON.parse(localYouDoUser)

    const getAllTasks = () => {
        fetch(`http://localhost:8088/tasks`)
                .then(response => response.json())
                .then((taskArray) => {
                    setTasks(taskArray)
                })
    }

    
    useEffect(
        () => {
            getAllTasks()

        },
        [] 
    )

    const taskForm = () => {
        if (formActive) {
            return <> <h5>Add a Task</h5>
            <div><TaskForm updateFormActive={updateFormActive} getAllTasks={getAllTasks} /></div>
            <Button onClick={() => updateFormActive(false) }>Nevermind</Button></>
        }
        else {
            return <Button onClick={() => updateFormActive(true) }>Add a Task</Button>
        }
    }

    return <>
    <article className="tasks">
        <h2>Task List Admin</h2>
        <Table>
        <thead>
                <tr>
                    <th></th>
                    <th>task</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
            {
            tasks.map(
                (task) => <TaskAdmin getAllTasks={getAllTasks}
                        currentUser= {youdoUserObject}
                        taskObject= {task} 
                        />
            )
        }
            </tbody>

    </Table>
        
        {taskForm()}
    </article>
    </>
}
