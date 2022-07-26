import { findByPlaceholderText } from "@testing-library/react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, ButtonDropdown, Col, Form, FormGroup, FormText, Input, InputGroup, InputGroupText, Label, Row } from "reactstrap"

export const DetailsForm = () => {
    const [titles, setTitles] = useState([])
    const [form, update] = useState({
        partnerName: "",
        titleId: 0,
        weddingDate: "",
        venueName: "",
        venueAddress: "",
        venuePhoneNum: ""
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

        const partnerToSend = {
            name: form.partnerName,
            titleId: parseFloat(form.titleId)
        }
        const weddingToSend = {
            userId: youdoUserObject.id,
            weddingDate: form.weddingDate
        }
        const venueToSend = {
            name: form.venueName,
            address: form.venueAddress,
            phoneNum: form.venuePhoneNum
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
                partnerToSend.weddingId = createdWedding.id;
                venueToSend.weddingId = createdWedding.id;
                
                return fetch(`http://localhost:8088/partners`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(partnerToSend)
                })
                
            })
            .then(() => {
                return fetch(`http://localhost:8088/venues`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(venueToSend)
                })
            })
            .then(() => {
                navigate("/weddingdetails")
            })
    }
    return <Form>
        <FormGroup>
            <legend className="col-form-label col-sm-2">Partner</legend>
            <InputGroup size="">
                <InputGroupText>
                    <Input
                        name="title"
                        id="title"
                        type="select"
                        onChange={
                            (evt) => {
                            const copy = {...form}
                            copy.titleId = evt.target.value
                            update(copy)
                            }
                        }>
                        <option>title</option>
                    {
                        titles.map(
                            (title) => {
                                return <option value={title.id}>{title.name}</option>
                                        })
                    }
                    </Input>
                            
                </InputGroupText>

                <Input
                    id="partnerName"
                    name="pname"
                    placeholder="name"
                    type="text"
                    value={form.partnerName}
                    onChange={
                    (evt) => {
                        const copy = {...form}
                        copy.partnerName = evt.target.value
                        update(copy)
                        }
                    }/>
        
        
            </InputGroup>
        </FormGroup>

    <FormGroup>
            <h4>Venue</h4>
            <FormGroup row>
            <Label for="venueName" sm={2}>Name</Label>
            <Col sm={10}>
                <Input
                id="VenueName"
                name="name"
                placeholder="venue"
                type="text"
                value={form.venueName}
                onChange={
                    (evt) => {
                        const copy = {...form}
                        copy.venueName = evt.target.value
                        update(copy)
                    }
                }/>
            </Col>
        </FormGroup>
        <FormGroup row>
            <Label for="venueAddress" sm={2}>Address </Label>
            <Col sm={10}>
                <Input
                id="exampleText"
                name="text"
                type="textarea"
                value={form.venueAddress}
                onChange={
                    (evt) => {
                        const copy = {...form}
                        copy.venueAddress = evt.target.value
                        update(copy)
                    }
                }/>
            </Col>
        </FormGroup>
        <FormGroup row>
            <Label for="phoneNum" sm={2}>Number</Label>
            <Col sm={10}>
                <Input
                id="phoneNum"
                name="phoneNum"
                type="tel"
                value={form.venuePhoneNum}
                onChange={
                    (evt) => {
                        const copy = {...form}
                        copy.venuePhoneNum = evt.target.value
                        update(copy)
                    }
                }/>
            </Col>
        </FormGroup>
    </FormGroup>
        
    <FormGroup row>
        <h4>Wedding Date</h4>
    <Label for="weddingDate" sm={2}>Date</Label>
    <Col sm={10}>
    
    <Input
      id="exampleDate"
      name="date"
      placeholder="date placeholder"
      type="date"
      value={form.weddingDate}
                onChange={
                    (evt) => {
                        const copy = {...form}
                        copy.weddingDate = evt.target.value
                        update(copy)
                    }
                }
    />
    </Col>
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