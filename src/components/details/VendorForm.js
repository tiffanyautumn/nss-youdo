import { useState } from "react"
import { Form, FormGroup, Label, Input, Button, Card, CardBody } from "reactstrap"

export const VendorForm = ({jobs, wedding, getAllVendors, updateFormActive}) => {
    const [vendor, update] = useState({
        name: "",
        jobId: null,
        phoneNum: ""
    })


//once the save button is clicked we want to post the vendor, then get the id from that post and create a wedding vendors post 
//finally we want to run the getAllVendors fn in order to see our added vendor 
    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        console.log("You clicked the button")

        const vendorToSend = {
            name: vendor.name,
            jobId: parseFloat(vendor.jobId),
            phoneNum: vendor.phoneNum
        }
        const weddingVendorToSend = {
        }

        return fetch (`http://localhost:8088/vendors`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(vendorToSend)
        })
            .then(response => response.json())
            .then((createdVendor) => {
                weddingVendorToSend.vendorId = createdVendor.id;
                weddingVendorToSend.weddingId = wedding
                return fetch(`http://localhost:8088/weddingVendors`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(weddingVendorToSend)
                })
                
            })
            .then(() => {
                getAllVendors()
                updateFormActive(false)
            })
    }

    return <Card>
    <CardBody>
    <Form>
        <FormGroup>
            <Label for="vendorName">Vendor Name</Label>
            <Input
                id="vendorName"
                name="name"
                type="text"
                value={vendor.name}
                onChange={
                    (evt) => {
                        const copy = {...vendor}
                        copy.name = evt.target.value
                        update(copy)
                    }
                } />

        </FormGroup>
        
        <FormGroup>
            <Label for="phoneNum">Contact Number</Label>
            <Input
                id="phoneNum"
                name="phoneNum"
                type="tel"
                value={vendor.phoneNum}
                onChange={
                    (evt) => {
                        const copy = {...vendor}
                        copy.phoneNum = evt.target.value
                        update(copy)
                    }
                }/>
        </FormGroup>
        
        <FormGroup>
            <Label for="jobSelect"> Vendor's Job</Label>
            <Input
                id="jobId"
                name="jobId"
                type="select"
                onChange={
                    (evt) => {
                        const copy = {...vendor}
                        copy.jobId = evt.target.value
                        update(copy)
                    }
                }>
                    <option>select a job</option>
                    {
                        jobs.map(
                            (job) => {
                                return <option key={`job--${job.id}`} value={job.id}> {job.name}</option>
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

