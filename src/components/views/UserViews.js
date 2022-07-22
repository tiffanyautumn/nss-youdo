import { Outlet, Route, Routes } from "react-router-dom"
import { PlanningHub } from "../home/PlanningHub"
import { TaskList } from "../tasks/TaskList"



export const UserViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1> </h1>
                    {
                        
                    }
                    <div></div>

                    <Outlet />
                </>
            }>
                <Route path="planningHub" element={<PlanningHub /> } />
				<Route path="tasklist" element={<TaskList /> } />
                <Route path="weddingDetails" element={ <></> } />
               
				
            </Route>
        </Routes>
    )
}