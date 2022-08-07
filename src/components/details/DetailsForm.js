import { findByPlaceholderText } from "@testing-library/react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, ButtonDropdown, Col, Form, FormGroup, FormText, Input, InputGroup, InputGroupText, Label, Row } from "reactstrap"

export const DetailsForm = () => {
    const [titles, setTitles] = useState([])
    const [form, update] = useState({
        loverNameA: "",
        titleIdA: 0,
        loverNameB: "",
        titleIdB: 0
    })
    
   
    const localYouDoUser = localStorage.getItem("youdo_user")
    const youdoUserObject = JSON.parse(localYouDoUser)
    const navigate = useNavigate()

    useEffect(
        () => {
            fetch (`http://localhost:8088/titles`)
                .then(response => response.json())
                .then((data) => {
                    setTitles(data)
                })
        },
        []
    )

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        console.log("You clicked the button")

        const loverToSendA = {
            name: form.loverNameA,
            titleId: parseFloat(form.titleIdA)
        }

        const loverToSendB = {
            name: form.loverNameB,
            titleId: parseFloat(form.titleIdB)
        } 

        const coupleToSendA = {

        }

        const coupleToSendB = {

        }

        const weddingToSend = {
            userId: youdoUserObject.id,
        }

        // TODO: Perform the fetch() to POST the object to the API
        return fetch (`http://localhost:8088/weddings`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(weddingToSend)
        })
            .then(response => response.json())
            .then((createdWedding) => {
                coupleToSendA.weddingId = createdWedding.id;
                coupleToSendB.weddingId = createdWedding.id;
                
                return fetch(`http://localhost:8088/lovers`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(loverToSendA)
                })
            })
                .then(response => response.json())
                .then((createdlover) => {
                    coupleToSendA.loverId = createdlover.id 
                    return fetch(`http://localhost:8088/couples`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(coupleToSendA)
                })
            })
            .then(() => {
                return fetch(`http://localhost:8088/lovers`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(loverToSendB)
                })
                .then(response => response.json())
                .then((createdlover) => {
                    coupleToSendB.loverId = createdlover.id 
                    return fetch(`http://localhost:8088/couples`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(coupleToSendB)
                })
            })
            .then(() => {
                navigate("/weddingdetails")
            })
    })
}
    return <Form>
        <FormGroup>
            <legend className="col-form-label col-sm-2">The Lucky Couple</legend>
            <InputGroup size="">
                <InputGroupText>
                    <Input
                        name="title"
                        id="title"
                        type="select"
                        onChange={
                            (evt) => {
                            const copy = {...form}
                            copy.titleIdA = evt.target.value
                            update(copy)
                            }
                        }>
                        <option>title</option>
                    {
                        titles.map(
                            (title) => {
                                return <option key={`titleoptionA--${title.id}`} value={title.id}>{title.name}</option>
                                        })
                    }
                    </Input>
                            
                </InputGroupText>

                <Input
                    id="partnerName"
                    name="pname"
                    placeholder="name"
                    type="text"
                    value={form.loverNameA}
                    onChange={
                    (evt) => {
                        const copy = {...form}
                        copy.loverNameA = evt.target.value
                        update(copy)
                        }
                    }/>
        
        
            </InputGroup>

            <InputGroup size="">
                <InputGroupText>
                    <Input
                        name="title"
                        id="title"
                        type="select"
                        onChange={
                            (evt) => {
                            const copy = {...form}
                            copy.titleIdB = evt.target.value
                            update(copy)
                            }
                        }>
                        <option>title</option>
                    {
                        titles.map(
                            (title) => {
                                return <option key={`titleoptionB--${title.id}`} value={title.id}>{title.name}</option>
                                        })
                    }
                    </Input>
                            
                </InputGroupText>

                <Input
                    id="partnerName"
                    name="pname"
                    placeholder="name"
                    type="text"
                    value={form.loverNameB}
                    onChange={
                    (evt) => {
                        const copy = {...form}
                        copy.loverNameB = evt.target.value
                        update(copy)
                        }
                    }/>
        
        
            </InputGroup>
        </FormGroup>

    
  
      <FormText>
        This is some placeholder block-level help text for the above input. It's a bit lighter and easily wraps to a new line.
      </FormText>
    
        <FormGroup>
        <Button onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}>
        Submit
      </Button>
        </FormGroup>
      
</Form>
}