import { useEffect, useState } from "react"

export const Partner = ({wedding, titles}) => {
    const weddingId = wedding.id
    const [partnerA, setPartnerA] = useState({})
    const [partnerB, setPartnerB] = useState({})
    
    useEffect(
        () => {
            fetch (`http://localhost:8088/couples?weddingId=${weddingId}&_expand=lover`)
                .then(response => response.json())
                .then((data) => {
                    const A = data[0]
                    const B = data[1]
                    setPartnerA(A)
                    setPartnerB(B)
                })
        },
        []
    )

    const Title = (partner) => {
        let html = ""
        titles
        .filter((title) => partner?.lover?.titleId === title.id)
        .map((title) => {
            html += title.name
        })
        return <><div className="usertitle"><h5>{html}:</h5> <span className="usertitlespan">{partner?.lover?.name}</span></div> </>
    }
    
        return <>
        {
            Title(partnerA)
        }
        {
            Title(partnerB)
        }
    
    
 </>
}