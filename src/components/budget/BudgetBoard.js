import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AccordionBody, AccordionHeader, AccordionItem, Button, Card, CardBody, CardTitle, Col, Container, Form, FormGroup, Input, Label, Progress, UncontrolledAccordion } from "reactstrap"
import { Budget, BudgetItems } from "./BudgetItems"
import "./Budget.css"
import { Venues } from "../details/Venues"

export const BudgetBoard = () => {
    
    const navigate = useNavigate()
    const [budget, setBudget] = useState({})
    const [budgetItems, setBudgetItems] = useState([])
    const [active, setActive] = useState(true)
    const [editForm, updateEdit] = useState(false)
    const [form, update] = useState({
        amount: budget.amount
    })

    const localYouDoUser = localStorage.getItem("youdo_user")
    const youdoUserObject = JSON.parse(localYouDoUser)
   let budgetId = 0

    useEffect(
        () => {
            getAllBudgets()
            },
        []
    )

    //fn that gets the budget associated with the current user
    //fn is in this format in order to be passed as prop
    const getAllBudgets = () => {
        fetch (`http://localhost:8088/budgets?userId=${youdoUserObject.id}&_expand=user`)
            .then(response => response.json())
            .then((data) => {
                if(data.length > 0){
                    const budgetArray = data[0]
                    setBudget(budgetArray);
                    budgetId = budgetArray.id
                    
                }
                else {
                    console.log("no budget")
                    setActive(false)
                }
            })
            .then( 
                () => {
                    fetch (`http://localhost:8088/budgetItems?budgetId=${budgetId}&_expand=item`)
                    .then(response => response.json())
                    .then((data) => {
                        setBudgetItems(data)
                    })
                })
    }

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const budgetToSend = {
            amount: parseFloat(form.amount),
            userId: youdoUserObject.id
        }
            return fetch(`http://localhost:8088/budgets/${budget.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(budgetToSend)
                })
                    .then(response => response.json())
                    .then(() => {
                        getAllBudgets()
                        updateEdit(false)
                    })
                
    }
    //conditional render of page dependant upon active state
    const notActive = () => {
        return <div className="newuser"><Card className="my-2" style={{ width: '18rem' }}>
        <CardBody>
            <Button outline onClick={() => navigate("/budgetform")}>
                <CardTitle tag="h5"> You haven't entered any Budget information.
                <p>Click here to create a budget!</p> </CardTitle>
            </Button>
            
        </CardBody>
        </Card></div>
    }

    const createForm = () => {
        return <>
        <Form>
        <FormGroup row>
    <Label for="amount" sm={2}>Amount</Label>
    <Col sm={10}>
    
    <Input
      id="amount"
      name="amount"
      placeholder={form.amount}
      type="number"
      value={form.amount}
                onChange={
                    (evt) => {
                        const copy = {...form}
                        copy.amount = evt.target.value
                        update(copy)
                    }
                }
    />
    </Col>
   
    </FormGroup>
    <div className="BudgetFormButtons">
    <Button size="sm" onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}>Submit</Button>
    <Button size="sm" onClick={() => updateEdit(false) }>Nevermind</Button>
    </div>
    </Form>
    </>
    }

    //fn to calculate the budget stats
    const math = () => {
       
        const totalSpent = () =>{
            let spent = 0 
            budgetItems.map(
                (budgetitem) => {
                   spent += budgetitem.item.amount
                }
            )
            return spent
        }

        const spent = totalSpent()
        const remaining = () => {
            let remain = budget.amount - spent

            return remain
        }

        return <article>
        <header className="budgetHeader"><h3>Budget Board</h3></header>
        <div className="budgetcard">
        <Card>
        <CardBody>
            <h5>Total Budget: ${budget.amount}</h5>
            <h5>Total Spent: ${totalSpent()}</h5>
            <h5>Remaining: ${remaining()}</h5>
            <Button className="editButtonDate" size="sm" outline onClick={() => updateEdit(true) }>Edit</Button>
        </CardBody>
        </Card>
        {
            editForm
                ? createForm()
                :""
        }
        </div>
        <div className="text-center">
        ${totalSpent()} of ${budget.amount}
        </div>
        <Progress
        max={budget.amount}
        value={totalSpent()}/>
        </article>
    }
    

    
    return <>
        
        {
            !active
                ? notActive()
                : <><section>
                    {
                        math()
                    }
                    </section>
        
        
        <div className="BudgetItemsDropdown">
        <UncontrolledAccordion defaultOpen={['1','2' ]} stayOpen>
                    <AccordionItem>
                        <AccordionHeader targetId="1"> Items </AccordionHeader>
                        <AccordionBody accordionId="1">
                        <BudgetItems budget={budget} budgetItems={budgetItems} getAllBudgets={getAllBudgets} />
                
                        </AccordionBody>
                    </AccordionItem>
        </UncontrolledAccordion>
        </div>
        </> }
    </>
}