import { useEffect, useState } from "react"
import { Button, Table } from "reactstrap"
import { PartyForm } from "./WeddingPartyForm"


export const WeddingParty = ({wedding}) => {
    const [weddingParty, setWeddingParty] = useState([])
    const [formActive, updateFormActive] = useState(false)
    const [roles, setRoles] = useState([])
    const weddingId = wedding.id

    const getAllPartiers = () => {
        fetch (`http://localhost:8088/weddingParty?_expand=member&weddingId=${weddingId}`)
        .then(response => response.json())
        .then((data) => {
            setWeddingParty(data)
        })
    }
    useEffect(
        () => {
           getAllPartiers()

           fetch (`http://localhost:8088/roles`)
                .then(response => response.json())
                .then((data) => {
                    setRoles(data)
                })
        },
        []
    )

    const Bridesmaids =  weddingParty.filter(party => party.member.roleId === 1)
    
    const Groomsmen = weddingParty.filter(party => party.member.roleId === 2)

    
    const partyForm = () => {
        if (formActive) {
            return <> <h1>Active</h1>
            <div><PartyForm  wedding={weddingId} roles={roles} weddingParty={weddingParty} updateFormActive={updateFormActive} getAllPartiers={getAllPartiers}/></div>
            <Button onClick={() => updateFormActive(false) }>Nevermind</Button></>
        }
        else {
            return <Button onClick={() => updateFormActive(true) }>Add a Party Member</Button>
        }
    }
        return <>
        
    
        <Table>
            <thead>
                <tr>
                    <th>Bridesmaids</th>
                    
                </tr>
            </thead>
            <tbody>
                
            {
            Bridesmaids.map(
                (maid) => {
                    return <tr><td>{maid.member.name}</td></tr>
                })
            }
            
            </tbody>
        
        </Table>
        
        <Table>
            <thead>
                <tr>
                    <th>Groomsmen</th>
                    
                </tr>
            </thead>
            <tbody>
                
            {
            Groomsmen.map(
                (man) => {
                    return <tr><td>{man.member.name}</td></tr>
                }
            )
            }
            
            </tbody>
        
        </Table>
        
 </>
}