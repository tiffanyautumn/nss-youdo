import { useState } from "react"
import { Button, Card, CardBody, Form, FormGroup, Input, Label } from "reactstrap"

export const TaskForm = ({updateFormActive, getAllTasks}) => {
    const [task, update] = useState({
        description: "",
        timeFrame: 0
        
    })

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        console.log("You clicked the button")

        const taskToSend = {
            description: task.description,
            timeFrame: parseFloat(task.timeFrame)
            
        }
    
        return fetch (`http://localhost:8088/tasks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(taskToSend)
        })
            .then(() => {
                getAllTasks()
                updateFormActive(false)
            })
    }
    return <>
    <Card>
    <CardBody>
    <Form>
        <FormGroup>
            <Label for="description">Task</Label>
            <Input
                id="decription"
                name="description"
                type="text"
                value={task.description}
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
                value={task.timeFrame}
                onChange={
                    (evt) => {
                        const copy = {...task}
                        copy.timeFrame= evt.target.value
                        update(copy)
                    }
                } />

        </FormGroup>
        <Button onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}>
      Submit
    </Button>
        </Form>
        </CardBody>
        </Card>
        </>
}