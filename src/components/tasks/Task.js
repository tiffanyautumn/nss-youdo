import { Button } from "bootstrap"
import { useEffect, useState } from "react";


export const Task = ({getAllTasks, currentUser, taskObject}) => {

    const [isChecked, setIsChecked] = useState(false);
    const [userTasks, updateUserTasks] = useState([])


    const checkUserTasks = () => {
        fetch(`http://localhost:8088/userTasks?_expand=task&taskId=${taskObject.id}&userId=${currentUser.id}`)
                .then(response => response.json())
                .then((data) => {
                    
                    if(data.length > 0){
                    setIsChecked(true)
                    }
                })
    }
    useEffect(
        () => {
            checkUserTasks()
        },
        []
    )
  
    const handleClick = (evt) => {
        evt.preventDefault()

        const completedtask = {
            userId: currentUser.id,
            taskId: taskObject.id,
        }

        return fetch (`http://localhost:8088/userTasks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(completedtask)
        })
            .then(response => response.json())
            .then(()=> {getAllTasks()
                checkUserTasks()})
    }
    
  
    return <>
    
    
    <section className="task" key={`task--${taskObject.id}`}>
        <div className="taskandcheckbox">
            <div>
                <header className="taskdescription"></header>
            </div>
            <div>
            <label className="completedbutton">
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
            {taskObject.description}</label>
            </div>
        </div>
    </section>
    </>
}