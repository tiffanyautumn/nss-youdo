import { Button } from "reactstrap"

export const Item = ({budgetItem, getAllBudgets}) => {
    const itemId = budgetItem?.item?.id

    const deleteButton = () => {
        return <Button size="sm" onClick={ () => {
        
                 return fetch (`http://localhost:8088/items/${itemId}`, {
                        method: "DELETE"
                        })
                .then(() => {
                    getAllBudgets()
                })
        }} className="ticket_delete">Delete</Button>
    }

    return <>
    <tr>
        <td>{budgetItem?.item?.description}</td>
        <td>${budgetItem?.item?.amount}</td>
        <td>{deleteButton()}</td>
    </tr>
    
    </>
}