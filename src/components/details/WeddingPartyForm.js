import { useState } from "react"
import { Form, FormGroup, Label, Input, FormText, Button, Card, CardBody } from "reactstrap"


//this page is the form that allows a user to add a wedding party member
export const PartyForm = ({wedding, roles, updateFormActive, getAllPartiers}) => {
    const [party, update] = useState({
        name: "",
        roleId: null
    })

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const memberToSend = {
            name: party.name,
            roleId: parseFloat(party.roleId),
        }
        const weddingPartyToSend = {
        }


        // TODO: Perform the fetch() to POST the object to the API
        return fetch (`http://localhost:8088/members`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(memberToSend)
        })
            .then(response => response.json())
            .then((createdMember) => {
                weddingPartyToSend.memberId = createdMember.id;
                weddingPartyToSend.weddingId = wedding
                return fetch(`http://localhost:8088/weddingParty`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(weddingPartyToSend)
                })
                
            })
            .then(() => {
                getAllPartiers()
                updateFormActive(false)
            })
    }

    return <Card>
    <CardBody>
    <Form>
        <FormGroup>
            <Label for="memberName">Member Name</Label>
            <Input
                id="memberName"
                name="name"
                type="text"
                value={party.name}
                onChange={
                    (evt) => {
                        const copy = {...party}
                        copy.name = evt.target.value
                        update(copy)
                    }
                } />

        </FormGroup>
        
        
        <FormGroup>
            <Label for="roleSelect"> Member's Role</Label>
            <Input
                id="roleId"
                name="roleId"
                type="select"
                onChange={
                    (evt) => {
                        const copy = {...party}
                        copy.roleId = evt.target.value
                        update(copy)
                    }
                }>
                    <option>select a role</option>
                    {
                        roles.map(
                            (role) => {
                                return <option key= {`role--${role.id}`}value={role.id}> {role.name}</option>
                            }
                        )
                    }
            </Input>
        </FormGroup>
    
    <Button onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}>
      Submit
    </Button>
  </Form>
  </CardBody>
  </Card>
}

