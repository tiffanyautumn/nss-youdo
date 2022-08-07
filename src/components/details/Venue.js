import { Button } from "reactstrap"

export const Venue = ({venue, sites, getAllVenues}) => {
    const venueId = venue.venue.id
    const deleteButton = () => {
        return <Button outline size="sm" onClick={() => {
        
                 return fetch (`http://localhost:8088/venues/${venueId}`, {
                        method: "DELETE"
                        })
                .then(() => {
                    getAllVenues()
                })
        }} >Delete</Button>
    }

    const SiteType = () => {
       return sites.map(
            (site) => {
                if(site.id === venue.venue.siteId) {
                    return site.name
                    
                }
            }
        )
    }
    return <>
    <tr>
        <td>{SiteType()}</td>
        <td>{venue?.venue?.name}</td>
        <td>{venue?.venue?.phoneNum}</td>
        <td>{venue?.venue?.address}</td>
        <td className="deleteButton">{deleteButton()}</td>
    </tr>
    </>
}