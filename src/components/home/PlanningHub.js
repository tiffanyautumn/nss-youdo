import 'bootstrap/dist/css/bootstrap.min.css'
import { React, useEffect, useState } from 'react'
import { Card, CardBody, CardTitle, CardText, Button, Row, Col, Container } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import "./PlanningHub.css"

export const PlanningHub = () => {
    const localYouDoUser = localStorage.getItem("youdo_user")
    const youdoUserObject = JSON.parse(localYouDoUser)
    const navigate = useNavigate()
    const [user, setUser] = useState([])

    useEffect(
        () => {
            fetch (`http://localhost:8088/users/${youdoUserObject.id}`)
                .then(response => response.json())
                .then((data) => {
                    const currentuser = data
                    setUser(currentuser)
                })
        },
        []
    )

    return <>
    <div className='page'>
        
        {
            user?.isAdmin
                ? <>
                <h1 className='planningHubHeader'> </h1>
                <section className="planningHub">
                <Row>
                
                    <Col>
                <Card className="my-2" style={{ width: "100%" }}>
                    <CardBody>
                        <Button onClick={() => navigate("/tasklistadmin")}>
                            <CardTitle tag="h5"> Task List Edit</CardTitle>
                        </Button>
                        <CardText> </CardText>
                    </CardBody>
                </Card>
                </Col>
                
            </Row>
            </section>
            </>
            : <>
            <header className='planningHubHeader'><h2>Planning Hub</h2> </header>
            <section className="planningHub">
            
            <Container className='wdContainer'>
            <Card className="weddingDetails" >
                <Container>
                <CardBody>
                    <Button outline onClick={() => navigate("/weddingdetails")}>
                        <CardTitle tag="h5"> Details </CardTitle>
                    </Button>
                    <CardText> </CardText>
                </CardBody>
                </Container>
            </Card>
            </Container>
            <Row>
               
            <Card className="my-2" style={{ width: '18rem' }}>
                <CardBody>
                    <Button outline onClick={() => navigate("/tasklist")}>
                        <CardTitle tag="h5"> Task List </CardTitle>
                    </Button>
                    <CardText> </CardText>
                </CardBody>
            </Card>
            

            
        <Card className="my-2" style={{ width: '18rem' }}>
            <CardBody>
                <Button outline onClick={() => navigate("/budget")}>
                    <CardTitle tag="h5"> Budget Board</CardTitle>
                </Button>
                <CardText> </CardText>
            </CardBody>
        </Card>
        
        </Row>
        </section>
        </>
        }
        
        
        </div>
    </>
}