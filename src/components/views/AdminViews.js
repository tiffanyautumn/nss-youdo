import { Outlet, Route, Routes } from "react-router-dom"



export const AdminViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>You do.</h1>
                    <div></div>

                    <Outlet />
                </>
            }>
				
                <Route path="weddingDetails" element={ <></> } />
               
				
            </Route>
        </Routes>
    )
}