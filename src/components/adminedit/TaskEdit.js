import { useEffect, useState } from "react"
import { Button, Card, CardBody, Form, FormGroup, Input, Label } from "reactstrap"

export const TaskEdit = ({taskObject, getAllTasks, updateFormActive, categories}) => {
    
    const [task, update] = useState({
        description: taskObject.description,
        timeFrame: taskObject.timeFrame,
        categoryId: taskObject.category.id
    })

   
    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        console.log("You clicked the button")

        const taskToSend = {
            description: task.description,
            timeFrame: parseFloat(task.timeFrame),
            categoryId: parseFloat(task.categoryId)
        }

        return fetch(`http://localhost:8088/tasks/${taskObject.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(taskToSend)
        })
            .then(response => response.json())
            .then(() => {
                getAllTasks()
                updateFormActive(false)
            })
        
    }
    return <>
    
    <Form>
        <FormGroup>
            <Label for="description">Task</Label>
            <Input
                id="decription"
                name="description"
                type="text"
                value={task?.description}
                onChange={
                    (evt) => {
                        const copy = {...task}
                        copy.description = evt.target.value
                        update(copy)
                    }
                } />
                <Label for="timeFrame">Time Frame</Label>
            <Input
                id="timeFrame"
                name="timeFrame"
                type="number"
                value={task?.timeFrame}
                onChange={
                    (evt) => {
                        const copy = {...task}
                        copy.timeFrame= evt.target.value
                        update(copy)
                    }
                } />
                <Label for="category">Category</Label>
            <Input
                id="category"
                name="category"
                type="select"
                value={task?.categoryId}
                onChange={
                    (evt) => {
                        const copy = {...task}
                        copy.categoryId= evt.target.value
                        update(copy)
                    }
                }>
                    {
                        categories?.map(
                            (category) => {
                                return <option key={category.id} value={category.id}>{category.description}</option>
                            }
                        )
                    }
            </Input>

        </FormGroup>
        <Button onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}>
      Submit
    </Button>
        </Form>
        
    </>
}