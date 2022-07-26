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
                    console.log(venue)
                })
        },
        []
    )
    
        return <>
    
    <Row><div className="venueName"> <h4> Venue: </h4><span className="venueSpan"><p>{venue.name}</p> <p>{venue.address}</p></span> </div></Row>
  
 </>
}