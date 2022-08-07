import { useEffect, useState } from "react"
import { Button, Col, Form, FormGroup, Input, Label, Row, Table } from "reactstrap"

export const WeddingDate = ({wedding}) => {
    const [weddingDate, setWeddingDate] = useState([])
    const [formActive, updateFormActive] = useState(false)
    const [editForm, updateEdit] = useState(false)
    const [active, setActive] = useState(false)
    const [nothing, setNothing] = useState(false)
    const [form, update] = useState({
        date: ""
    })
    
    const getAllWeddingDates = () => {
        return fetch (`http://localhost:8088/weddingDates?weddingId=${wedding.id}`)
        .then(response => response.json())
        .then((data) => {
            if(data.length > 0){
            setActive(true)
            const weddingdate = data[0]
            setWeddingDate(weddingdate)
            setNothing(false)
            }
            else{
                setNothing(true)
            }
        })
    }
    useEffect(
        () => {
            getAllWeddingDates()
        },
        []
    )

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const dateToSend = {
            date: form.date,
            weddingId: wedding.id
        }
        
        if(active) {
        
            return fetch(`http://localhost:8088/weddingDates/${weddingDate.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(dateToSend)
                })
                    .then(response => response.json())
                    .then(() => {
                        getAllWeddingDates()
                        updateEdit(false)
                    })
                
            }
            else {
                return fetch (`http://localhost:8088/weddingDates`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dateToSend)
        })
            .then(() => {
                getAllWeddingDates()
                updateFormActive(false)
            })
        }
    }

    const createForm = () => {
        return <>
        <Form className="DateForm">
        <FormGroup row>
    <Label for="weddingDate" sm={2}>Date</Label>
    <Col sm={10}>
    
    <Input
      id="exampleDate"
      name="date"
      placeholder="date placeholder"
      type="date"
      value={form.date}
                onChange={
                    (evt) => {
                        const copy = {...form}
                        copy.date = evt.target.value
                        update(copy)
                    }
                }
    />
    </Col>
   
    </FormGroup>
    <Button size="sm" onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}>Submit</Button>
    </Form>
    </>
    }

    const dateForm = () => {
        if (formActive) {
            return <> 
            <div>{createForm()}</div>
            <Button onClick={() => updateFormActive(false) }>Nevermind</Button></>
        }
        else {
            return <Button onClick={() => updateFormActive(true) }>Add your wedding date</Button>
        }
    }

    const editingForm = () => {
        if(editForm) {
            return <>
            <div>{createForm()}</div>
            <Button size="sm" onClick={() => updateEdit(false) }>Nevermind</Button></>
        }
        else {
            return <><div className="weddingDate">
            <h5>Wedding Date:</h5><span className="weddingdatespan">{weddingDate.date}</span>
            <Button className="editButtonDate" size="sm" outline onClick={() => updateEdit(true) }>Edit</Button>
            </div></>
        }
    }

    
    return <>

    
    {
        nothing 
        ? dateForm()
        : editingForm()
    }
       
    
     
    
    </>
}