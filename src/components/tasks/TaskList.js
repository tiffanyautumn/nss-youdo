import { useEffect, useState } from "react"
import { AccordionBody, AccordionHeader, AccordionItem, Button, Form, Input, Label, Table, UncontrolledAccordion } from "reactstrap"
import { Task } from "./Task"
import "./Tasks.css"
import { TasksbyCat } from "./TasksbyCat"
import { TasksbyTimeline } from "./TasksbyTimeline"

export const TaskList = () => {
    const [tasks, setTasks] = useState([])
    const localYouDoUser = localStorage.getItem("youdo_user")
    const youdoUserObject = JSON.parse(localYouDoUser)
    const [sort, update] = useState({
        by: ""
    })
    

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

    const sorted = () => {
        if(sort.by === "time") {
            return <TasksbyTimeline tasks={tasks} getAllTasks={getAllTasks} youdoUserObject={youdoUserObject}/>
        }
        else if (sort.by === "category") {
            return <TasksbyCat tasks={tasks} getAllTasks={getAllTasks} youdoUserObject={youdoUserObject}/>
        } 
        else {
            return <>
            <Table>
            <thead>
                <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
           {
            tasks.map(
                (task) => {
                    return <><Task key={`tasklist--${task.id}`} getAllTasks={getAllTasks}
                currentUser= {youdoUserObject}
                taskObject= {task} 
                /> </>
                }
            )

           }
            </tbody>
            </Table>
            </>
        }
    }

    
    return <>
    <article className="tasks">
        <section className="wholepage">
            <section className="header">
        
        <span className="select">
        <Form>
            <Label for="sort"></Label>
            <Input
                id="sort"
                type="select"
                onChange={
                    (evt) => {
                        const copy = {...sort}
                        copy.by = evt.target.value
                        update(copy)
                    }
                }>
                    <option value="none">Sort by</option>
                    <option value="time">Timeline</option>
                    <option value="category">Category</option>
                </Input>
        </Form>
        </span>
        <header className="TaskHeader"><h2>Task List</h2></header>
        <span> </span>
        </section>

        {
            sorted()
        }
        </section>
    </article>
    </>
}