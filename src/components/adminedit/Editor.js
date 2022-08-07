import { useEffect, useState } from "react"
import { Button, Table } from "reactstrap"
import { TaskAdmin, TaskEdit } from "./TaskAdmin"
import { TaskForm } from "./TaskForm"
import "./AdminEdit.css"

//this page is for the admin to be able to view, edit, and delete tasks 
export const Editor = () => {
    const [tasks, setTasks] = useState([])
    const [formActive, updateFormActive] = useState(false)
    const [categories, setCategories] = useState ([])

    const localYouDoUser = localStorage.getItem("youdo_user")
    const youdoUserObject = JSON.parse(localYouDoUser)

    useEffect(
        () => {
           fetch (`http://localhost:8088/categories`)
                .then(response => response.json())
                .then((data) => {
                    setCategories(data)
                })
        },
        []
    )

    const getAllTasks = () => {
        fetch(`http://localhost:8088/tasks?_expand=category`)
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
            <div><TaskForm updateFormActive={updateFormActive} getAllTasks={getAllTasks} categories={categories}/></div>
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
                    <th>Task</th>
                    <th>Time Frame</th>
                    <th>Category</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
            {
            tasks.map(
                (task) => <TaskAdmin key={`task--${task.id}`} getAllTasks={getAllTasks}
                        currentUser= {youdoUserObject} categories={categories}
                        taskObject= {task} 
                        />
            )
        }</tbody>
    </Table>
        
        {taskForm()}
    </article>
    </>
}
