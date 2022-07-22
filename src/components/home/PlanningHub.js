import 'bootstrap/dist/css/bootstrap.min.css'
import { React } from 'react'
import { Card, CardHeader, CardBody, CardTitle, CardText, Button, CardFooter, Row, Col } from 'reactstrap'
import { useNavigate } from 'react-router-dom'

export const PlanningHub = () => {
    const navigate = useNavigate()
    return <section className="planningHub">
        
        <Row>
            <Card className="my-2" style={{ width: '18rem' }}>
                <CardBody>
                    <Button >
                        <CardTitle tag="h5"> Details </CardTitle>
                    </Button>
                    <CardText> </CardText>
                </CardBody>
            </Card>
        </Row>

        <Row>
        <Col sm="6">
        <Card className="my-2" style={{ width: '18rem' }}>
            <CardBody>
                <Button onClick={() => navigate("/tasklist")}>
                    <CardTitle tag="h5"> Task List </CardTitle>
                </Button>
                <CardText> </CardText>
            </CardBody>
        </Card>
        </Col>

        <Col sm="6">
        <Card className="my-2" style={{ width: '18rem' }}>
            <CardBody>
                <Button>
                    <CardTitle tag="h5"> Budget Board</CardTitle>
                </Button>
                <CardText> </CardText>
            </CardBody>
        </Card>
        </Col>
        </Row>
    </section>

}