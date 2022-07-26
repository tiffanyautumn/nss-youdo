import { useState } from "react"
import { React } from 'react'
import { Card, CardBody, CardTitle, CardText, Button, Accordion, AccordionBody, AccordionHeader, AccordionItem, UncontrolledAccordion } from 'reactstrap'
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Partner } from "./Partner"
import { Venue } from "./Venue"
import { WeddingParty } from "./WeddingParty"
import { Vendors } from "./Vendors"
import "./Details.css"

export const Details = () => {
    const navigate = useNavigate()
    const [wedding, setWedding] = useState({})

    const [active, setActive] = useState(null)
    const [open, setOpen] = useState('');
    const [titles, setTitles] = useState([])
    const localYouDoUser = localStorage.getItem("youdo_user")
    const youdoUserObject = JSON.parse(localYouDoUser)

    useEffect(
        () => {
            fetch (`http://localhost:8088/weddings?userId=${youdoUserObject.id}&_expand=user`)
                .then(response => response.json())
                .then((data) => {
                    if(data.length > 0){
                        const weddingArray = data[0]
                        setWedding(weddingArray);
                        setActive(true)
                        
                        
                    }
                    else {
                        console.log("no wedding")
                        setActive(false)
                    }
                })
                
                },
        []
    )

    useEffect(
        () => {
            fetch (`http://localhost:8088/titles`)
                .then(response => response.json())
                .then((data) => {
                    setTitles(data)
                })
        },
        []
    )
    
    const usersTitle = () => {
        let html = ""
        titles
        .filter((title) => wedding.user.titleId === title.id)
        .map((title) => {
            html += title.name
        })
        return <h5>{html}: {wedding.user.name}</h5>
    }
    
    

    const notActive = () => {
        return <Card className="my-2" style={{ width: '18rem' }}>
        <CardBody>
            <Button onClick={() => navigate("/detailsform")}>
                <CardTitle tag="h5"> You haven't entered any wedding information.
                <p>Click here to tell us about your big day!</p> </CardTitle>
            </Button>
            <CardText> </CardText>
        </CardBody>
        </Card>
    }

   
    return<>
        {
            !active
                ? notActive()
                : <div>
                <h3>Wedding Details </h3>
                    {
                        usersTitle()
                    }
                    <Partner wedding={wedding} />
                    
                
                <Venue wedding={wedding} />
                <div className="weddingDate"><h4>Wedding Date:</h4><span>{wedding?.weddingDate}</span></div>
                <UncontrolledAccordion defaultOpen={['1','2' ]} stayOpen>
                <AccordionItem>
                    <AccordionHeader targetId="2"> Wedding Party </AccordionHeader>
                    <AccordionBody accordionId="2">
                        <WeddingParty wedding={wedding}/>
                    </AccordionBody>
                </AccordionItem>
                <AccordionItem>
                    <AccordionHeader targetId="3">Vendors</AccordionHeader>
                    <AccordionBody accordionId="3">
                        <Vendors wedding={wedding} user={youdoUserObject} />
                    </AccordionBody>
                
                </AccordionItem>
                </UncontrolledAccordion>
                </div>
                
            
        }

        
    </>


}
