import { Button } from "reactstrap"

export const Groomsman = ({groomsman, getAllPartiers}) => {
    const manId = groomsman.member.id

    const deleteButton = () => {
        return <Button outline size="sm" onClick={ () => {
        
                 return fetch (`http://localhost:8088/members/${manId}`, {
                        method: "DELETE"
                        })
                .then(() => {
                    getAllPartiers()
                })
        }} className="ticket_delete">Delete</Button>
    }

    return <>
    <tr>
        <td>{groomsman.member.name}</td>
        <td className="deleteButton">{deleteButton()}</td>
    </tr>
    </>
}