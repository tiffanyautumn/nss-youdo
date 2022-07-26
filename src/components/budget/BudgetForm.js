import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Col, Form, FormGroup, Input, Label } from "reactstrap"

export const BudgetForm = () => {
    const localYouDoUser = localStorage.getItem("youdo_user")
    const youdoUserObject = JSON.parse(localYouDoUser)
    const navigate = useNavigate()

    const [budget, update] = useState({
        amount: 0
    })

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        console.log("You clicked the button")

        const budgetToSend = {
            amount: parseFloat(budget.amount),
            userId: youdoUserObject.id
        }
    
        return fetch (`http://localhost:8088/budgets`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(budgetToSend)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/budget")
            })
    }

    return <>
    <Form>
    <FormGroup row>
        <h4>Budget</h4>
            <Label for="amount" sm={2}> Amount</Label>
            <Col sm={10}>
                <Input
                id="amount"
                name="amount"
                placeholder="0"
                type="number"
                value={budget.amount}
                onChange={
                    (evt) => {
                        const copy = {...budget}
                        copy.amount = evt.target.value
                        update(copy)
                    }
                }/>
            </Col>
    </FormGroup>
    <Button onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}> Create Budget</Button>
    </Form>
    </>

}