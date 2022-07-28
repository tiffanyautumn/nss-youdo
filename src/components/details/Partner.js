import { useEffect, useState } from "react"

export const Partner = ({wedding}) => {
    const [partner, setPartner] = useState({})
    const weddingId = wedding.id

    useEffect(
        () => {
            fetch (`http://localhost:8088/partners?weddingId=${weddingId}&_expand=title`)
                .then(response => response.json())
                .then((data) => {
                    const partner = data[0]
                    setPartner(partner)
                })
        },
        []
    )
    
        return <>
    
    <div className= "partnerName"> <h5> {partner?.title?.name}:</h5> <span className="partnerspan"><h6>{partner?.name}</h6></span></div>
 </>
}