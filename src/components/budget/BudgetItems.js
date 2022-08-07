import { useEffect, useState } from "react"
import { Button, Table } from "reactstrap"
import { Item } from "./Item"
import { ItemForm } from "./ItemForm"

export const BudgetItems = ({budget, budgetItems, getAllBudgets }) => {
    const [formActive, updateFormActive] = useState(false)

    const itemForm = () => {
        if (formActive) {
            return <> <div className="itemFormHead"><h5>Add an Item</h5>
            <Button onClick={() => updateFormActive(false) }>Nevermind</Button></div>
            <div><ItemForm updateFormActive={updateFormActive} budget={budget} getAllBudgets={getAllBudgets} /></div>
            </>
        }
        else {
            return <Button onClick={() => updateFormActive(true) }>Add an Item</Button>
        }
    }
    return <>
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