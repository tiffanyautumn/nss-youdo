import { useState } from "react"
import { React } from 'react'
import { Card, CardBody, CardTitle, CardText, Button, Accordion, AccordionBody, AccordionHeader, AccordionItem, UncontrolledAccordion } from 'reactstrap'
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Partner } from "./Partner"
import { Venue, Venues } from "./Venues"
import { WeddingParty } from "./WeddingParty"
import { Vendors } from "./Vendors"
import "./Details.css"
import { WeddingDate } from "./WeddingDate"

export const Details = () => {
    const navigate = useNavigate()
    const [wedding, setWedding] = useState([])
    const [active, setActive] = useState(null)
    const [titles, setTitles] = useState([])
    const localYouDoUser = localStorage.getItem("youdo_user")
    const youdoUserObject = JSON.parse(localYouDoUser)

    //fetches wedding that matches the user id from local storage. 
    //if there is a matching wedding id the active state is set to true, and the value of wedding is set and the details appear
    //if there are none then then the page renders a message to create a wedding 
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
    //fetches titles and the value of titles is set 
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
    
    //fn to print the user's name and matching title
    
    
    
    //fn with card to create a wedding 
    const notActive = () => {
        return <div className="newuser"><Card className="my-2" style={{ width: '18rem' }}>
        <CardBody>
            <Button outline onClick={() => navigate("/detailsform")}>
                <CardTitle tag="h5"> You haven't entered any wedding information.
                <p>Click here to tell us about your big day!</p> </CardTitle>
            </Button>
            <CardText> </CardText>
        </CardBody>
        </Card></div>
    }

   
    return<>

        {
            !active
                ? notActive()
                : <div>
                <div style={{backgroundImage: `url("https://cdn.shopify.com/s/files/1/2667/4342/products/57_434cd14c-4f19-4fe3-9bcd-90624e9a1a54_1242x.jpg?v=1631407751")`}}><header className="DetailsHeader"><h3 className="weddingDetails">Wedding Details </h3></header></div>
                    <section className="detailspage">
                    <Card >
                        <CardBody>
                        <Partner wedding={wedding} titles={titles} />
                        <WeddingDate wedding={wedding} />
                        </CardBody>
                    </Card>
                        
                    </section>
                <div className="DetailsDropdown">
                <UncontrolledAccordion defaultOpen={['1','2' ]} stayOpen>
                    <AccordionItem>
                        <AccordionHeader targetId="1"> Venues </AccordionHeader>
                        <AccordionBody accordionId="1">
                            <Venues wedding={wedding} />
                        </AccordionBody>
                    </AccordionItem>

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
                </div>   
        }

        
    </>


}
