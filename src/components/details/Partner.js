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
                    console.log(partner)
                })
        },
        []
    )
    
        return <>
    
    <div className= "partnerName"> <h4> {partner?.title?.name}:</h4> <span>{partner?.name}</span></div>
 </>
}