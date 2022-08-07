import { useState } from "react"
import { Form, FormGroup, Label, Input, Button, Card, CardBody } from "reactstrap"

export const VenueForm = ({wedding, getAllVenues, updateFormActive, sites}) => {
    const [venue, update] = useState({
        name: "",
        siteId: 0,
        phoneNum: "",
        address: ""
    })


//once the save button is clicked we want to post the vendor, then get the id from that post and create a wedding vendors post 
//finally we want to run the getAllVendors fn in order to see our added vendor 
    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        console.log("You clicked the button")

        const venueToSend = {
            name: venue.name,
            siteId: parseFloat(venue.siteId),
            phoneNum: venue.phoneNum,
            address: venue.address
        }

        const weddingVenueToSend = {
            weddingId: wedding.id
        }

        return fetch (`http://localhost:8088/venues`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(venueToSend)
        })
            .then(response => response.json())
            .then((createdVenue) => {
                weddingVenueToSend.venueId = createdVenue.id;
                return fetch(`http://localhost:8088/weddingVenues`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(weddingVenueToSend)
                })
                
            })
            .then(() => {
                getAllVenues()
                updateFormActive(false)
            })
    }

    return <>
    <Form className="VenueForm">
        <FormGroup>
            <Label for="venueName">Venue Name</Label>
            <Input
                id="venueName"
                name="name"
                type="text"
                value={venue.name}
                onChange={
                    (evt) => {
                        const copy = {...venue}
                        copy.name = evt.target.value
                        update(copy)
                    }
                } />

        </FormGroup>

        <FormGroup>
            <Label for="venueAddress">Address</Label>
            <Input
                id="venueName"
                name="name"
                type="text"
                value={venue.address}
                onChange={
                    (evt) => {
                        const copy = {...venue}
                        copy.address = evt.target.value
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
                value={venue.phoneNum}
                onChange={
                    (evt) => {
                        const copy = {...venue}
                        copy.phoneNum = evt.target.value
                        update(copy)
                    }
                }/>
        </FormGroup>
        
        <FormGroup>
            <Label for="siteSelect"> Site</Label>
            <Input
                id="siteId"
                name="siteId"
                type="select"
                onChange={
                    (evt) => {
                        const copy = {...venue}
                        copy.siteId = evt.target.value
                        update(copy)
                    }
                }>
                    <option>select a site type</option>
                    {
                        sites.map(
                            (site) => {
                                return <option key={`site--${site.id}`} value={site.id}> {site.name}</option>
                            }
                        )
                    }
            </Input>
        </FormGroup>
    
    <Button onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}>
      Submit
    </Button>
  </Form>
  </>
}


    
