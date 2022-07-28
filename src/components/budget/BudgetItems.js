import { useEffect, useState } from "react"
import { Button, Table } from "reactstrap"
import { Item } from "./Item"
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
        <Table>
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Price </th>
                    <th> </th>
                </tr>
                
            </thead>
            <tbody>
              
            {
            budgetItems.map(
                (budgetitem) => <Item key={`item--${budgetitem.id}`} budgetItem={budgetitem} getAllBudgets={getAllBudgets}/>
                     
            )
            }
             
            </tbody>
        
        </Table>
        
        </div>
        {
            itemForm()
        }
    </>

}