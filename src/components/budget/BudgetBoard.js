import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Card, CardBody, CardTitle, Container, Progress } from "reactstrap"
import { Budget, BudgetItems } from "./BudgetItems"
import "./Budget.css"

export const BudgetBoard = () => {
    
    const navigate = useNavigate()
    const [budget, setBudget] = useState({})
    const [budgetItems, setBudgetItems] = useState([])
    const [active, setActive] = useState(null)
    

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
                    setActive(true)
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

    //conditional render of page dependant upon active state
    const notActive = () => {
        return <Card className="my-2" style={{ width: '18rem' }}>
        <CardBody>
            <Button outline onClick={() => navigate("/budgetform")}>
                <CardTitle tag="h5"> You haven't entered any Budget information.
                <p>Click here to create a budget!</p> </CardTitle>
            </Button>
            
        </CardBody>
        </Card>
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
        <header><h3>{budget.user.name}'s Budget</h3></header>
        <div className="budgetcard">
        <Card>
        <CardBody>
            <h5>Total Budget: ${budget.amount}</h5>
            <h5>Total Spent: ${totalSpent()}</h5>
            <h5>Remaining: ${remaining()}</h5>
            
        </CardBody>
        </Card>
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
                : <section>
                    {
                        math()
                    }
                    <BudgetItems budget={budget} budgetItems={budgetItems} getAllBudgets={getAllBudgets} />
                </section>
        }
        
    </>
}