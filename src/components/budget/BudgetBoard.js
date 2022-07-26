import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Card, CardBody, CardTitle, Progress } from "reactstrap"
import { Budget, BudgetItems } from "./BudgetItems"


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


    const notActive = () => {
        return <Card className="my-2" style={{ width: '18rem' }}>
        <CardBody>
            <Button onClick={() => navigate("/budgetform")}>
                <CardTitle tag="h5"> You haven't entered any Budget information.
                <p>Click here to create a budget!</p> </CardTitle>
            </Button>
            
        </CardBody>
        </Card>
    }
    const math = () => {
       
        const totalSpent = () =>{
            let spent = 0 
            budgetItems.map(
                (budgetitem) => {
                   spent += budgetitem.item.amount
                }
            )
            console.log(spent)
            return spent
        }

        const spent = totalSpent()
        const remaining = () => {
            let remain = budget.amount - spent

            return remain
        }

        return <article>
        <h3>{budget.user.name}'s Budget</h3>
        <div className="text-center">
        ${totalSpent()} of ${budget.amount}
        </div>
        <Progress
        max={budget.amount}
        value={totalSpent()}/>
        <Card className="my-2" style={{ width: '18rem' }}>
        <CardBody>
            <h4>Total Budget: ${budget.amount}</h4>
            <h4>Total Spent: ${totalSpent()}</h4>
            <h4>Remaining: ${remaining()}</h4>
            
        </CardBody>
        </Card>
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