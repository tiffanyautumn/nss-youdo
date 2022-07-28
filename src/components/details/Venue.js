import { useEffect, useState } from "react"
import { Row } from "reactstrap"

export const Venue = ({wedding}) => {
    const [venue, setVenue] = useState({})
    const weddingId = wedding.id

    useEffect(
        () => {
            fetch (`http://localhost:8088/venues?weddingId=${weddingId}`)
                .then(response => response.json())
                .then((data) => {
                    const venue = data[0]
                    setVenue(venue)
                })
        },
        []
    )
    
        return <>
    
    <Row><div className="venueName"> <h5> Venue: </h5><span className="venueSpan"><h6>{venue.name}</h6> <h6>{venue.address}</h6></span> </div></Row>
  
 </>
}