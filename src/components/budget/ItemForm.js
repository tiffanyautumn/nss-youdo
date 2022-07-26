import { useState } from "react"
import { Button, Card, CardBody, Form, FormGroup, Input, Label } from "reactstrap"

export const ItemForm = ({updateFormActive, budget, getAllBudgets}) => {
    const budgetId = budget.id
    const [item, update] = useState({
        description:"",
        amount: 0
    })

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        console.log("You clicked the button")

        const itemToSend = {
            description: item.description,
            amount: parseFloat(item.amount),
           
        }
        const budgetItemToSend = {
            budgetId: budgetId
        }

        return fetch (`http://localhost:8088/items`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(itemToSend)
        })
            .then(response => response.json())
            .then((createdItem) => {
                budgetItemToSend.itemId = createdItem.id;

                return fetch(`http://localhost:8088/budgetItems`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(budgetItemToSend)
                })
                
            })
            .then(() => {
                getAllBudgets()
                updateFormActive(false)
            })
    }
    return <>
    <Card>
    <CardBody>
    <Form>
        <FormGroup>
            <Label for="description">Item description</Label>
            <Input
                id="description"
                name="description"
                type="text"
                value={item.description}
                onChange={
                    (evt) => {
                        const copy = {...item}
                        copy.description = evt.target.value
                        update(copy)
                    }
                } />

        </FormGroup>

        <FormGroup>
            <Label for="amount">Amount</Label>
            <Input
                id="amount"
                name="amount"
                type="number"
                value={item.amount}
                onChange={
                    (evt) => {
                        const copy = {...item}
                        copy.amount = evt.target.value
                        update(copy)
                    }
                } />

        </FormGroup>

        <Button onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}> Submit</Button>
    </Form>
    </CardBody>
    </Card>
    </>
}