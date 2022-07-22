import { useEffect, useState } from "react"
import { Task } from "./Task"
import "./Tasks.css"

export const TaskList = () => {
    const [tasks, setTasks] = useState([])
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

    return <>
    <article className="tasks">
        <h2>Task List</h2>
        {
            tasks.map(
                (task) => <Task getAllTasks={getAllTasks}
                        currentUser= {youdoUserObject}
                        taskObject= {task} 
                        />
            )
            
           
        }
    </article>
    </>
}