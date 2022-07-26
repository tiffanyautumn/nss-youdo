import { useEffect, useState } from "react"
import { Button } from "reactstrap"
import { ItemForm } from "./ItemForm"

export const BudgetItems = ({budget, budgetItems, getAllBudgets }) => {
    const [formActive, updateFormActive] = useState(false)

    const itemForm = () => {
        if (formActive) {
            return <> <h5>Add a Vendor</h5>
            <div><ItemForm updateFormActive={updateFormActive} budget={budget} getAllBudgets={getAllBudgets} /></div>
            <Button onClick={() => updateFormActive(false) }>Nevermind</Button></>
        }
        else {
            return <Button onClick={() => updateFormActive(true) }>Add an Item</Button>
        }
    }
    return <>
        <h5>Items</h5>
        <div>
        {
            budgetItems.map(
                (budgetitem) => {
                    return <h5> ${budgetitem?.item?.amount} {budgetitem?.item?.description}</h5>
                }
            )
        }
        </div>
        {
            itemForm()
        }
    </>

}