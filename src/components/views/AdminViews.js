import { Outlet, Route, Routes } from "react-router-dom"
import { Editor} from "../adminedit/Editor"
import { BudgetBoard } from "../budget/BudgetBoard"
import { PlanningHub } from "../home/PlanningHub"
import { TaskList } from "../tasks/TaskList"



export const AdminViews = () => {
	return (
        <Routes>
            <Route path="/" element={ <PlanningHub /> } />
            <Route path="tasklistadmin" element={ <Editor/> } />
            <Route path="tasklist" element={<TaskList /> } />
			<Route path="budget" element= {<BudgetBoard />} />
            
        </Routes>
    )
}