import { Button } from "reactstrap"

export const Bridesmaid = ({maid, getAllPartiers}) => {
    const maidId = maid.member.id

    const deleteButton = () => {
        return <Button size="sm" onClick={ () => {
        
                 return fetch (`http://localhost:8088/members/${maidId}`, {
                        method: "DELETE"
                        })
                .then(() => {
                    getAllPartiers()
                })
        }} className="ticket_delete">Delete</Button>
    }

    return <>
    <tr>
        <td>{maid.member.name}</td>
        <td>{deleteButton()}</td>
    </tr>
    </>
}