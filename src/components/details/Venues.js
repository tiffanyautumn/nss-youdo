import { useEffect, useState } from "react"
import { Button, Row, Table } from "reactstrap"
import { Venue } from "./Venue"
import { VenueForm } from "./VenueForm"

export const Venues = ({wedding}) => {
    const [venues, setVenues] = useState([])
    const [formActive, updateFormActive] = useState(false)
    const [sites, setSites] = useState([])
    const weddingId = wedding.id

    useEffect(
        () => {
            getAllVenues()
            getAllSites()
        },
        []
    )

    const getAllSites = () => {
        return fetch (`http://localhost:8088/sites`)
        .then(response => response.json())
        .then((data) => {
            setSites(data)
        })
    }

    const getAllVenues = () => {
        return fetch (`http://localhost:8088/weddingVenues?_expand=venue&weddingId=${weddingId}`)
        .then(response => response.json())
        .then((data) => {
            const venue = data
            setVenues(venue)
        })
    }
    const venueForm = () => {
        if (formActive) {
            return <> <h5>Add a Venue</h5>
            <div className="VenueFormDiv"><VenueForm getAllVenues={getAllVenues} wedding={wedding} updateFormActive={updateFormActive} sites={sites} /></div>
            <Button onClick={() => updateFormActive(false) }>Nevermind</Button></>
        }
        else {
            return <Button className="VenueButton" onClick={() => updateFormActive(true) }>Add a Venue</Button>
        }
    }
    
        return <>
    
    <Table>
            <thead>
                <tr>
                    <th>Type</th>
                    <th>Name</th>
                    <th>Phone Number</th>
                    <th>Address</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                
                {
                    venues.map(
                        
                    (venue) =>
                    <Venue key={`venue--${venue.id}`} venue={venue} sites={sites} getAllVenues={getAllVenues}/>
                    )
                }
                
            </tbody>
            
        </Table>
        {
                    venueForm()
                }
  
 </>
}
