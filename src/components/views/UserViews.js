import { Route, Routes } from "react-router-dom"
import { BudgetBoard } from "../budget/BudgetBoard"
import { BudgetForm } from "../budget/BudgetForm"
import { Details } from "../details/Details"
import { DetailsForm } from "../details/DetailsForm"
import { PlanningHub } from "../home/PlanningHub"
import { TaskList } from "../tasks/TaskList"



export const UserViews = () => {
    return (
        <Routes>

            <Route path="/" element={<PlanningHub />} />
            <Route path="tasklist" element={<TaskList />} />
            <Route path="weddingdetails" element={<Details />} />
            <Route path="detailsform" element={<DetailsForm />} />
            <Route path="budget" element={<BudgetBoard />} />
            <Route path="budgetform" element={<BudgetForm />} />

        
        </Routes >
    )
}