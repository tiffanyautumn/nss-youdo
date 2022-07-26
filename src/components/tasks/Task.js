import { Button } from "reactstrap"
import { useEffect, useState } from "react";


export const Task = ({getAllTasks, currentUser, taskObject}) => {

    const [isChecked, setIsChecked] = useState(false);
    const [userTask, setUserTask] = useState([])
    const [hide, setHide] = useState(false)
    const [hiddenTask, setHiddenTask] = useState([])
    //this fn checks if any userTasks in the database match this users id and matches this task
    //if there is a matching task it sets setisChecked to true
    const checkUserTasks = () => {
        fetch(`http://localhost:8088/userTasks?_expand=task&taskId=${taskObject.id}&userId=${currentUser.id}`)
                .then(response => response.json())
                .then((data) => {
                    if(data.length > 0){
                    setIsChecked(true)
                    const usertask = data[0]
                    setUserTask(usertask)
                    } 
                    else{
                        setIsChecked(false)
                        
                    }
                })
    }

    const checkHiddenTasks = () => {
        fetch(`http://localhost:8088/hiddenTasks?_expand=task&taskId=${taskObject.id}&userId=${currentUser.id}`)
                .then(response => response.json())
                .then((data) => {
                    if(data.length > 0){
                    setHide(true)
                    const hiddentask =data[0]
                    setHiddenTask(hiddentask)
                    } 
                    else{
                        setHide(false)
                        
                    }
                })
    }

    useEffect(
        () => {
            checkUserTasks()
        
            checkHiddenTasks()
            
        },
        []
    )
  
    //if the checkmark on this task is checked then it posts it to userTasks
    //the fn then runs getAllTasks and checkUserTasks in order to show updated state
    const handleHideClick = (evt) => {
        evt.preventDefault()

    const hiddenTask = {
            userId: currentUser.id,
            taskId: taskObject.id,
        }
        return fetch (`http://localhost:8088/hiddenTasks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(hiddenTask)
        })
            .then(response => response.json())
            .then(()=> {getAllTasks()
                checkHiddenTasks()})
            }
    
    const handleUnhideClick = (evt) => {
        return fetch (`http://localhost:8088/hiddenTasks/${hiddenTask.id}`, {
                            method: "DELETE"
                                })
                            .then(() => {
                            setHiddenTask([])
                            checkHiddenTasks()
                        })
    }

    const handleClick = (evt) => {
        evt.preventDefault()
        console.log("you clicked the button ")
        if(isChecked === true) {
            console.log("is Checked")
            return fetch (`http://localhost:8088/userTasks/${userTask.id}`, {
                            method: "DELETE"
                                })
                            .then(() => {
                            setUserTask([])
                            checkUserTasks()
                        })
                    
            }
        else{
            console.log("check")
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
    }
    
  
    return <>
    
    {
        hide === true
        ? <tr ><td></td><td></td><td className="hideButton" ><Button size="sm" outline onClick={(evt) => handleUnhideClick(evt)}>unhide</Button></td></tr>
        : <tr>
            <td>
                <label className="taskdescription">
                <input type="checkbox" onChange={(evt) => handleClick(evt)}/>
                <svg className={`checkbox ${isChecked ? "checkbox--active" : ""}`}
                    aria-hidden="true"
                    viewBox="0 0 15 11"
                    fill="none">
                <path
                    d="M1 4.5L5 9L14 1"
                    strokeWidth="2"
                    stroke={isChecked ? "#fff" : "none"} />
                </svg>
                </label>
            </td>

            <td>{taskObject.description}</td>
        
            <td className="hideButton"> <Button size="sm" outline onClick={(evt) => handleHideClick(evt)}>hide</Button></td>
        </tr>
    }
    
    </>
}